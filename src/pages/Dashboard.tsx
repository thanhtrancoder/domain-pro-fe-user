import {
  CheckCircleIcon,
  BuildingOfficeIcon,
  ServerIcon,
  FileLinesIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
} from "../components/icons/Icon";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState } from "react";

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
            "flex items-center gap-2 rounded-xl px-4 py-3 " +
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
  const [activeTab, setActiveTab] = useState("");

  const handleActiveTab = (activeTab: string) => {
    setActiveTab(activeTab);
  };

  return (
    <div className="space-y-8 bg-gray-50 px-3 py-8 md:px-10">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
        <p className="text-gray-600">Quản lý tên miền và dịch vụ của bạn</p>
      </div>

      {/* Main */}
      <div className="space-y-8 lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="space-y-6 lg:col-span-1">
          {/* Nav bar */}
          <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
            {/* User info */}
            <div className="flex items-center gap-4">
              <img
                alt="avatar"
                src="https://static1.srcdn.com/wordpress/wp-content/uploads/2025/04/hulk-from-the-mcu-franchise.jpg"
                className="h-16 w-16 rounded-full object-cover"
              ></img>
              <div className="space-y-1">
                <div>
                  <h3 className="font-bold text-gray-900">Trần Tuấn Thành</h3>
                  <p className="text-sm break-all text-gray-600">
                    thanhtrancoder@gmail.com
                  </p>
                </div>
                <div className="text-success-hover2 bg-light-success flex w-fit items-center gap-1 rounded-xl px-2 py-1">
                  <CheckCircleIcon className="size-4"></CheckCircleIcon>
                  <span className="text-xs font-medium">Verified</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* User actions */}
            <ul className="space-y-2">
              <ActionItem
                icon={<BuildingOfficeIcon></BuildingOfficeIcon>}
                name="Tổng quan"
                to=""
                activeTab={activeTab}
                handleActive={handleActiveTab}
              ></ActionItem>
              <ActionItem
                icon={<ServerIcon></ServerIcon>}
                name="Tên miền của tôi"
                to="domains"
                activeTab={activeTab}
                handleActive={handleActiveTab}
              ></ActionItem>
              <ActionItem
                icon={<FileLinesIcon></FileLinesIcon>}
                name="Hóa đơn"
                to="billing"
                activeTab={activeTab}
                handleActive={handleActiveTab}
              ></ActionItem>
              <ActionItem
                icon={<QuestionMarkCircleIcon></QuestionMarkCircleIcon>}
                name="Hỗ trợ"
                to="support"
                activeTab={activeTab}
                handleActive={handleActiveTab}
              ></ActionItem>
              <ActionItem
                icon={<Cog6ToothIcon></Cog6ToothIcon>}
                name="Cài đặt"
                to="settings"
                activeTab={activeTab}
                handleActive={handleActiveTab}
              ></ActionItem>
            </ul>
          </div>

          {/* Quick report */}
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="font-bold">Thống kê nhanh</h2>
            <div className="space-y-2">
              <QuickReportItem
                name="Tên miền hoạt động"
                total={2}
                totalColor="success-hover2"
              ></QuickReportItem>
              <QuickReportItem
                name="Sắp hết hạn"
                total={1}
                totalColor="fail"
              ></QuickReportItem>
              <QuickReportItem
                name="Đã hết hạn"
                total={1}
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
  );
};

export default Dashboard;
