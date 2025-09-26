import { useEffect, useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { LockClosedIcon } from "../../components/icons/Icon";

interface inputItemProps {
  label: string;
  placeholder: string;
  value: string;
  handleValueChange: (value: string) => void;
}

const InputItem: React.FC<inputItemProps> = ({
  label,
  placeholder,
  value,
  handleValueChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Input
        placeholder={placeholder}
        value={value}
        className="focus-within:ring-primary-hover border border-gray-300 focus-within:border-transparent focus-within:ring-2"
        onChange={(event) => handleValueChange(event.target.value)}
      ></Input>
    </div>
  );
};

const Settings: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    setFullname("Trần Tuấn Thành");
    setEmail("thanhtrancoder@gmail.com");
  }, []);

  return (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
      {/* Title */}
      <div>
        <h3 className="text-xl font-bold">Cài đặt tài khoản</h3>
      </div>

      {/* Conntent */}
      <div className="space-y-6">
        {/* Profile */}
        <div className="space-y-4 rounded-xl border border-gray-300 p-6">
          <h4 className="font-medium">Thông tin cá nhân</h4>
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            <InputItem
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              value={fullname}
              handleValueChange={(value) => setFullname(value)}
            ></InputItem>
            <InputItem
              label="Email"
              placeholder="Nhập email"
              value={email}
              handleValueChange={(value) => setEmail(value)}
            ></InputItem>
          </div>
        </div>

        {/* Security */}
        <div className="space-y-4 rounded-xl border border-gray-300 p-6">
          <h4 className="font-medium">Bảo mật</h4>
          <div className="space-y-4">
            <div className="space-y-4">
              <Button
                label="Đổi mật khẩu"
                leftIcon={<LockClosedIcon className="size-5"></LockClosedIcon>}
                className="border border-gray-300 hover:bg-gray-100"
                onClick={() => setShowChangePassword(!showChangePassword)}
              ></Button>
              <div
                className={
                  "origin-top transform duration-300 ease-in-out" +
                  (showChangePassword
                    ? "max-h-screen scale-100 opacity-100"
                    : "hidden max-h-0 scale-95 overflow-hidden opacity-0")
                }
              >
                <div className="border-light-primary space-y-4 rounded-xl border p-6">
                  <InputItem
                    label="Mật khẩu cũ"
                    placeholder="Nhập mật khẩu cũ"
                    value={oldPassword}
                    handleValueChange={(value) => setOldPassword(value)}
                  ></InputItem>
                  <InputItem
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    handleValueChange={(value) => setNewPassword(value)}
                  ></InputItem>
                  <InputItem
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmNewPassword}
                    handleValueChange={(value) => setConfirmNewPassword(value)}
                  ></InputItem>
                </div>
              </div>

              {/* {showChangePassword && (
                
              )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button label="Lưu thay đổi"></Button>
      </div>
    </div>
  );
};

export default Settings;
