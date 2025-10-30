import { useEffect, useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { LockClosedIcon } from "../../components/icons/Icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/context/Toast";
import { getProfile } from "../../api/account/accountApi";
import { updateAccount } from "../../api/auth/authApi";
import { useAccount } from "../../components/context/Account";
import { mapping } from "../../utils/MapUtil";
import type { accountProfileRes } from "../../api/account/accountRes";
import type { account } from "../../components/context/AppContext";
import { EyeIcon, EyeSlashIcon } from "../../components/icons/Icon";

interface inputItemProps {
  label: string;
  placeholder: string;
  value: string;
  handleValueChange: (value: string) => void;
  inputClassName?: string;
}

const InputItem: React.FC<inputItemProps> = ({
  label,
  placeholder,
  value,
  handleValueChange,
  inputClassName,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Input
        placeholder={placeholder}
        value={value}
        className={
          "focus-within:ring-primary-hover border border-gray-300 focus-within:border-transparent focus-within:ring-2 " +
          inputClassName
        }
        onChange={(event) => handleValueChange(event.target.value)}
      ></Input>
    </div>
  );
};

interface inputItemPasswordProps extends inputItemProps {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const InputItemPassword: React.FC<inputItemPasswordProps> = ({
  label,
  placeholder,
  value,
  handleValueChange,
  inputClassName,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        className={
          "focus-within:ring-primary-hover border border-gray-300 focus-within:border-transparent focus-within:ring-2 " +
          inputClassName
        }
        onChange={(event) => handleValueChange(event.target.value)}
        actionIcon={
          showPassword ? (
            <EyeIcon className="size-6 cursor-pointer text-gray-400"></EyeIcon>
          ) : (
            <EyeSlashIcon className="size-6 cursor-pointer text-gray-400"></EyeSlashIcon>
          )
        }
        onActionIconClick={() => setShowPassword(!showPassword)}
      ></Input>
    </div>
  );
};

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const accountContext = useAccount();

  const [fullname, setFullname] = useState<string>("");
  const [fullnameOld, setFullnameOld] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    if (!showChangePassword) {
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmNewPassword(false);
    }
  }, [showChangePassword]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    async function fetch() {
      const response = await getProfile();
      if (canceled) {
        return;
      }
      if (response.error?.status === 401) {
        toast("warning", response.error.message);
        navigate("/login");
      } else if (response.error) {
        toast("error", response.error.message);
      } else {
        setFullname(response.data?.fullname || "");
        setFullnameOld(response.data?.fullname || "");
        setEmail(response.data?.email || "");
      }
    }

    fetch();

    return () => {
      canceled = true;
    };
  }, []);

  const handleUpdateAccount = async () => {
    if (
      fullname === fullnameOld &&
      oldPassword === "" &&
      newPassword === "" &&
      confirmNewPassword === ""
    ) {
      toast("info", "Không có thông tin nào được thay đổi.");
      return;
    }

    const response = await updateAccount({
      fullname: fullname,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    });
    if (response.error?.status === 401) {
      toast("warning", response.error.message);
      navigate("/login");
    } else if (response.error) {
      toast("error", response.error.message);
    } else {
      if (response.data) {
        const mappedData = mapping<accountProfileRes, account>(response.data);
        accountContext(mappedData);
      }
      setShowChangePassword(false);
      toast("success", response.message);
    }
  };

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
            <div className="pointer-events-none">
              <InputItem
                label="Email"
                placeholder="Nhập email"
                value={email}
                handleValueChange={(value) => setEmail(value)}
                inputClassName="text-gray-500"
              ></InputItem>
            </div>
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
                  <InputItemPassword
                    label="Mật khẩu cũ"
                    placeholder="Nhập mật khẩu cũ"
                    value={oldPassword}
                    handleValueChange={(value) => setOldPassword(value)}
                    showPassword={showOldPassword}
                    setShowPassword={setShowOldPassword}
                  ></InputItemPassword>
                  <InputItemPassword
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    handleValueChange={(value) => setNewPassword(value)}
                    showPassword={showNewPassword}
                    setShowPassword={setShowNewPassword}
                  ></InputItemPassword>
                  <InputItemPassword
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmNewPassword}
                    handleValueChange={(value) => setConfirmNewPassword(value)}
                    showPassword={showConfirmNewPassword}
                    setShowPassword={setShowConfirmNewPassword}
                  ></InputItemPassword>
                </div>
              </div>

              {/* {showChangePassword && (
                
              )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button label="Lưu thay đổi" onClick={handleUpdateAccount}></Button>
      </div>
    </div>
  );
};

export default Settings;
