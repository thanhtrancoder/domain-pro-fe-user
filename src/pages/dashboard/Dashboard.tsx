import {
  CheckCircleIcon,
  BuildingOfficeIcon,
  ServerIcon,
  FileLinesIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
} from "../../components/icons/Icon";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../components/context/Toast";
import { getCountDomainName } from "../../api/domainName/domainNameApi";
import { useAppState } from "../../components/context/AppContext";

interface actionItemProps {
  icon: React.ReactNode;
  name: string;
  to: string;
  activeTab: string;
  handleActive: (active: string) => void;
}

const ActionItem: React.FC<actionItemProps> = ({
  icon,
  name,
  to,
  activeTab,
  handleActive,
}) => {
  const handleActiveTab = () => {
    handleActive(to);
  };

  return (
    <li>
      <Link to={to} onClick={() => handleActiveTab()}>
        <div
          className={
            "flex items-center gap-2 rounded-xl px-4 py-3 transition-colors duration-300 " +
            (activeTab === to
              ? "bg-primary-hover text-white"
              : "hover:bg-gray-100")
          }
        >
          {icon}
          <span>{name}</span>
        </div>
      </Link>
    </li>
  );
};

interface quickReportItemProps {
  name: string;
  total: number;
  totalColor: string;
}

const QuickReportItem: React.FC<quickReportItemProps> = ({
  name,
  total,
  totalColor,
}) => {
  return (
    <div className="flex items-center">
      <p className="text-gray-600">{name}</p>
      <p className={"ml-auto font-bold " + "text-" + totalColor}>{total}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { account, isShowPopup } = useAppState();
  const { pathname } = useLocation();

  const [activeTab, setActiveTab] = useState("");
  const [domainNameActive, setDomainNameActive] = useState(0);
  const [domainNameExpiring, setDomainNameExpiring] = useState(0);
  const [domainNameExpired, setDomainNameExpired] = useState(0);

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
        setDomainNameActive(response.data?.totalDomainNameActive || 0);
        setDomainNameExpiring(response.data?.totalDomainNameExpiring || 0);
        setDomainNameExpired(response.data?.totalDomainNameExpired || 0);
      }
    }

    fetch();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    let canceled = false;

    const pathnameSplit = pathname.split("/");
    if (pathnameSplit.length == 2) {
      setActiveTab("");
    }
    if (pathnameSplit.length > 2) {
      setActiveTab(pathnameSplit[2]);
    }

    return () => {
      canceled = true;
    };
  }, [pathname]);

  const handleActiveTab = (activeTab: string) => {
    setActiveTab(activeTab);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      {isShowPopup && (
        <div className="fixed z-30 h-screen w-full bg-black/50"></div>
      )}
      <div
        className={
          "space-y-8 bg-gray-50 px-3 py-8 md:px-10" +
          (isShowPopup ? " pointer-events-none" : "")
        }
      >
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Manage your domains and services</p>
        </div>

        {/* Main */}
        <div className="space-y-8 lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="space-y-6 lg:col-span-1">
            {/* Nav bar */}
            <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
              {/* User info */}
              <div className="flex items-center gap-4">
                {account?.avatar !== null && account?.avatar !== "" ? (
                  <img
                    alt="avatar"
                    src={account?.avatar}
                    className="h-16 w-16 rounded-full object-cover"
                  ></img>
                ) : (
                  <UserCircleIcon className="size-16"></UserCircleIcon>
                )}

                <div className="space-y-1">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {account?.fullname}
                    </h3>
                    <p className="text-sm break-all text-gray-600">
                      {account?.email}
                    </p>
                  </div>
                  {account?.isVerify && (
                    <div className="text-success-hover2 bg-light-success flex w-fit items-center gap-1 rounded-xl px-2 py-1">
                      <CheckCircleIcon className="size-4"></CheckCircleIcon>
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200"></div>

              {/* User actions */}
              <ul className="space-y-2">
                <ActionItem
                  icon={<BuildingOfficeIcon></BuildingOfficeIcon>}
                  name="Overview"
                  to=""
                  activeTab={activeTab}
                  handleActive={handleActiveTab}
                ></ActionItem>
                <ActionItem
                  icon={<ServerIcon></ServerIcon>}
                  name="My domains"
                  to="domains"
                  activeTab={activeTab}
                  handleActive={handleActiveTab}
                ></ActionItem>
                {/* <ActionItem
              icon={<FileLinesIcon></FileLinesIcon>}
              name="Billing"
              to="billing"
              activeTab={activeTab}
              handleActive={handleActiveTab}
            ></ActionItem> */}
                <ActionItem
                  icon={<QuestionMarkCircleIcon></QuestionMarkCircleIcon>}
                  name="Support"
                  to="support"
                  activeTab={activeTab}
                  handleActive={handleActiveTab}
                ></ActionItem>
                <ActionItem
                  icon={<Cog6ToothIcon></Cog6ToothIcon>}
                  name="Settings"
                  to="settings"
                  activeTab={activeTab}
                  handleActive={handleActiveTab}
                ></ActionItem>
                {/* <ActionItem
              icon={
                <ArrowRightStartOnRectangleIcon></ArrowRightStartOnRectangleIcon>
              }
              name="Logout"
              to="settings"
              activeTab={activeTab}
              handleActive={handleActiveTab}
            ></ActionItem> */}
                <button
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-4 py-3 transition-colors duration-300 hover:bg-gray-100"
                  onClick={() => handleLogout()}
                >
                  <ArrowRightStartOnRectangleIcon></ArrowRightStartOnRectangleIcon>
                  <span>Logout</span>
                </button>
              </ul>
            </div>

            {/* Quick report */}
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
              <h2 className="font-bold">Quick stats</h2>
              <div className="space-y-2">
                <QuickReportItem
                  name="Active domains"
                  total={domainNameActive}
                  totalColor="success-hover2"
                ></QuickReportItem>
                <QuickReportItem
                  name="Expiring soon"
                  total={domainNameExpiring}
                  totalColor="fail"
                ></QuickReportItem>
                <QuickReportItem
                  name="Expired"
                  total={domainNameExpired}
                  totalColor="fail"
                ></QuickReportItem>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
