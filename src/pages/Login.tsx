import DomainProIcon from "../assets/icons/icons8-domain-50.png";
import { Input } from "../components/ui/Input";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "../components/icons/Icon";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/icons8-google.svg";
import { supportData } from "./data";
import type { supportType } from "./data";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onHandleLogin = () => {
    // Check email
    const isEmptyEmailTemp = email === "";
    setIsEmptyEmail(isEmptyEmailTemp);
    const isValidEmailTemp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidEmail(isValidEmailTemp);
    // Check password
    const isEmptyPasswordTemp = password === "";
    setIsEmptyPassword(isEmptyPasswordTemp);

    if (!isEmptyEmailTemp && !isEmptyPasswordTemp && isValidEmailTemp) {
      navigate("/");
    }
  };

  const inputClassName =
    "focus-within:ring-primary border border-gray-300 shadow-sm transition-discrete duration-300 focus-within:ring-2";

  return (
    <div className="from-tint-primary to-tint-primary2 flex flex-col items-center justify-center bg-gradient-to-br px-8 py-12">
      <div className="flex w-fit flex-col items-center justify-center gap-6">
        {/* Title */}
        <a href="/">
          <img src={DomainProIcon} className="h-16 w-16"></img>
        </a>
        <div className="space-y-2 text-center">
          <p className="text-3xl font-bold">Chào mừng trở lại</p>
          <p className="text-gray-600">
            Đăng nhập để quản lý tên miền và dịch vụ của bạn
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-8 shadow-lg"
        >
          <div className="space-y-2">
            <p className="font-medium">Địa chỉ email</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <EnvelopeIcon className="size-6 text-gray-400"></EnvelopeIcon>
              }
              placeholder="Nhập địa chỉ email"
              type="email"
              className={inputClassName}
            ></Input>
            {/* Email requirements */}
            {isEmptyEmail ? (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Vui lòng nhập email</p>
              </div>
            ) : (
              !isValidEmail && (
                <div className="text-fail flex items-center gap-1 text-sm">
                  <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                  <p>Email không hợp lệ</p>
                </div>
              )
            )}
          </div>

          <div className="space-y-2">
            <p className="font-medium">Mật khẩu</p>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <LockClosedIcon className="size-6 text-gray-400"></LockClosedIcon>
              }
              placeholder="Nhập mật khẩu"
              type={showPassword ? "text" : "password"}
              className={inputClassName}
              actionIcon={
                showPassword ? (
                  <EyeIcon className="size-6 cursor-pointer text-gray-400"></EyeIcon>
                ) : (
                  <EyeSlashIcon className="size-6 cursor-pointer text-gray-400"></EyeSlashIcon>
                )
              }
              onActionIconClick={() => setShowPassword(!showPassword)}
            ></Input>
            {/* Email requirements */}
            {isEmptyPassword && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Vui lòng nhập mật khẩu</p>
              </div>
            )}
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-primary hover:text-primary-hover text-sm font-medium"
            >
              Quên mật khẩu?
            </a>
          </div>

          <Button
            label="Đăng nhập"
            rightIcon={<ArrowRightIcon className="size-4"></ArrowRightIcon>}
            className="bg-primary hover:bg-primary-hover w-full text-white"
            onClick={() => onHandleLogin()}
          ></Button>

          <div className="relative flex items-center justify-center">
            <p className="relative z-10 w-fit bg-white px-2 text-center text-sm text-gray-500">
              Hoặc đăng nhập bằng
            </p>
            <div className="absolute top-1/2 w-full border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-1">
            <Button
              label="Google"
              leftIcon={<img src={GoogleIcon} className="size-5"></img>}
              className="border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
            ></Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <a href="/register" className="text-primary-hover font-medium">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </form>

        {/* Support */}
        <div className="w-full space-y-4 rounded-xl bg-white p-8 shadow-lg">
          <p className="text-center text-lg font-bold">
            Tại sao chọn DomainPro?
          </p>
          <div className="space-y-2">
            {supportData.map((supportItem: supportType, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <supportItem.icon className="text-primary-hover size-6"></supportItem.icon>
                <p className="text-sm text-gray-700">{supportItem.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
