import { Link } from "react-router-dom";
import {
  GlobeIcon,
  ServerIcon,
  ShieldIcon,
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlusIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "../../components/icons/Icon";
import type { iconProps } from "../../components/icons/Icon";
import { getCountDomainName } from "../../api/domainName/domainNameApi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/context/Toast";
import { useState, useEffect } from "react";
import { useAppState } from "../../components/context/AppContext";
import { getAllNotification } from "../../api/notification/notificationApi";
import type { notificationDto } from "../../api/notification/notificationRes";
import { statusNotification } from "../../utils/StatusUtil";
import { formatDateTime } from "../../utils/Format";

interface reportItemProps {
  Icon: React.FC<iconProps>;
  value: number;
  name: string;
}

const ReportItem: React.FC<reportItemProps> = ({ Icon, value, name }) => {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/10 p-4">
      <Icon className="size-9"></Icon>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm">{name}</p>
      </div>
    </div>
  );
};

type notificationItemProps = {
  type: "info" | "success" | "warning" | "error";
  title: string;
  date: string;
};

const NotificationItem: React.FC<notificationItemProps> = ({
  type,
  title,
  date,
}) => {
  return (
    <div
      className={
        "flex gap-3 rounded-xl border p-4 " +
        (type === "info"
          ? "bg-tint-primary border-light-primary"
          : type === "success"
            ? "bg-tint-success border-light-success2"
            : type === "warning"
              ? "border-light-warning bg-tint-warning"
              : "bg-tint-fail border-light-fail2")
      }
    >
      <div className="pt-1">
        {type === "info" && (
          <BellIcon className="text-primary-hover size-5"></BellIcon>
        )}
        {type === "success" && (
          <CheckCircleIcon className="text-success-hover size-5"></CheckCircleIcon>
        )}
        {type === "warning" && (
          <ExclamationTriangleIcon className="text-warning size-5"></ExclamationTriangleIcon>
        )}
        {type === "error" && (
          <XCircleIcon className="text-fail size-5"></XCircleIcon>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};

interface quickActionItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
}

const QuickActionItem: React.FC<quickActionItemProps> = ({
  icon,
  title,
  to,
}) => {
  return (
    <Link to={to}>
      <div className="hover:border-primary-hover hover:bg-tint-primary space-y-3 rounded-xl border-2 border-gray-200 p-6 text-center transition-colors duration-300">
        <div className="flex items-center justify-center">{icon}</div>

        <p className="font-medium">{title}</p>
      </div>
    </Link>
  );
};

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { account } = useAppState();

  const [totalDomainName, setTotalDomainName] = useState(0);
  const [year, setYear] = useState(0);
  const [notifications, setNotifications] = useState<notificationDto[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    async function fetch() {
      const response = await getCountDomainName();
      if (canceled) {
        return;
      }
      if (response.error?.status === 401) {
        toast("warning", response.error.message);
        navigate("/login");
      } else if (response.error) {
        toast("error", response.error.message);
      } else {
        setTotalDomainName(
          (response.data?.totalDomainNameActive || 0) +
            (response.data?.totalDomainNameExpiring || 0) +
            (response.data?.totalDomainNameExpired || 0),
        );
      }

      const responseNotification = await getAllNotification({
        size: 6,
        page: 0,
      });
      if (canceled) {
        return;
      }
      if (responseNotification.error?.status === 401) {
        toast("warning", responseNotification.error.message);
        navigate("/login");
      } else if (responseNotification.error) {
        toast("error", responseNotification.error.message);
      } else {
        setNotifications(responseNotification.data?.content || []);
      }
    }

    fetch();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (account) {
      const date = new Date(account?.createdAt || "");
      setYear(date.getFullYear());
    }
  }, [account]);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="from-primary-hover to-primary-hover2 space-y-6 rounded-xl bg-gradient-to-br p-8 text-white">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Welcome back, {account?.fullname}!
          </h2>
          <p>You have been a member since {year}</p>
        </div>
        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
          <ReportItem
            Icon={GlobeIcon}
            value={totalDomainName}
            name="Domains"
          ></ReportItem>
          <ReportItem Icon={ServerIcon} value={0} name="Hosting"></ReportItem>
          <ReportItem Icon={ShieldIcon} value={0} name="SSL"></ReportItem>
        </div>
      </div>

      {/* Important notification */}
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2">
          <BellIcon className="text-primary-hover size-6"></BellIcon>
          <h2 className="text-xl font-bold">Important notifications</h2>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.notificationId}
              type={statusNotification(notification.type)}
              title={notification.title}
              date={formatDateTime(notification.createdAt)}
            ></NotificationItem>
          ))}
        </div>
      </div>

      {/* Quick action */}
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold">Quick actions</h2>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4">
          <QuickActionItem
            icon={<PlusIcon className="text-primary-hover size-8 stroke-2" />}
            title="Register a domain"
            to="/search?domain=yourdomain.com"
          />
          <QuickActionItem
            icon={
              <ArrowPathIcon className="text-success-hover2 size-8 stroke-2" />
            }
            title="Renew domain"
            to="/coming-soon"
          />
          <QuickActionItem
            icon={
              <QuestionMarkCircleIcon className="text-warning size-8 stroke-2" />
            }
            title="Support"
            to="/coming-soon"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
