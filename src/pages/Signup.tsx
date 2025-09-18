import DomainProIcon from "../assets/icons/icons8-domain-50.png";
import { Input } from "../components/ui/Input";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "../components/icons/Icon";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import GoogleIcon from "../assets/icons/icons8-google.svg";
import { supportData } from "./data";
import type { supportType } from "./data";
import { useNavigate } from "react-router-dom";

interface checkPasswordType {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
  valid: boolean;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState<checkPasswordType>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    valid: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accept, setAccept] = useState(false);
  const [isValidAccept, setIsValidAccept] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    {
      /* Check length */
    }
    if (password.length >= 8) {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        length: true,
      }));
    } else {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        length: false,
      }));
    }
    {
      /* Check uppercase */
    }
    if (password.match(/[A-Z]/)) {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        uppercase: true,
      }));
    } else {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        uppercase: false,
      }));
    }
    {
      /* Check lowercase */
    }
    if (password.match(/[a-z]/)) {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        lowercase: true,
      }));
    } else {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        lowercase: false,
      }));
    }
    {
      /* Check number */
    }
    if (password.match(/[0-9]/)) {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        number: true,
      }));
    } else {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        number: false,
      }));
    }
    {
      /* Check special */
    }
    if (password.match(/[^a-zA-Z0-9]/)) {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        special: true,
      }));
    } else {
      setCheckPassword((prevCheckPassword) => ({
        ...prevCheckPassword,
        special: false,
      }));
    }
  }, [password]);

  const onHandleRegister = () => {
    {
      /* Check email */
    }
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmailTemp = validEmail.test(email);
    setIsValidEmail(isValidEmailTemp);
    {
      /* Check password */
    }
    let isValidPasswordTemp = false;
    if (
      checkPassword.length &&
      checkPassword.uppercase &&
      checkPassword.lowercase &&
      checkPassword.number &&
      checkPassword.special
    ) {
      isValidPasswordTemp = true;
    }
    setCheckPassword((prevCheckPassword) => ({
      ...prevCheckPassword,
      valid: isValidPasswordTemp,
    }));
    {
      /* Check confirm password */
    }
    const isValidConfirmPasswordTemp = password === confirmPassword;
    setIsValidConfirmPassword(isValidConfirmPasswordTemp);
    {
      /* Check accept */
    }
    setIsValidAccept(accept);

    if (
      isValidEmailTemp &&
      isValidPasswordTemp &&
      isValidConfirmPasswordTemp &&
      accept
    ) {
      navigate("/login");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <p className="text-3xl font-bold">Tạo tài khoản mới</p>
          <p className="text-gray-600">
            Đăng ký để bắt đầu quản lý tên miền của bạn
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
            {!isValidEmail && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Địa chỉ email không hợp lệ</p>
              </div>
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
            {/* Password requirements */}
            {password.length === 0 && !checkPassword.valid && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Vui lòng nhập mật khẩu</p>
              </div>
            )}
            {/* Password requirements */}
            {password.length > 0 && (
              <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-sm">
                <p className="font-medium">Yêu cầu mật khẩu:</p>
                <div className="space-y-1">
                  <div
                    className={
                      "flex items-center gap-2 " +
                      (checkPassword.length
                        ? "text-success-hover"
                        : "text-fail")
                    }
                  >
                    {checkPassword.length ? (
                      <CheckIcon className="size-4"></CheckIcon>
                    ) : (
                      <XMarkIcon className="size-4"></XMarkIcon>
                    )}
                    <p>Tối thiểu 8 ký tự</p>
                  </div>
                  <div
                    className={
                      "flex items-center gap-2 " +
                      (checkPassword.uppercase
                        ? "text-success-hover"
                        : "text-fail")
                    }
                  >
                    {checkPassword.uppercase ? (
                      <CheckIcon className="size-4"></CheckIcon>
                    ) : (
                      <XMarkIcon className="size-4"></XMarkIcon>
                    )}
                    <p>Có chữ hoa</p>
                  </div>
                  <div
                    className={
                      "flex items-center gap-2 " +
                      (checkPassword.lowercase
                        ? "text-success-hover"
                        : "text-fail")
                    }
                  >
                    {checkPassword.lowercase ? (
                      <CheckIcon className="size-4"></CheckIcon>
                    ) : (
                      <XMarkIcon className="size-4"></XMarkIcon>
                    )}
                    <p>Có chữ thường</p>
                  </div>
                  <div
                    className={
                      "flex items-center gap-2 " +
                      (checkPassword.number
                        ? "text-success-hover"
                        : "text-fail")
                    }
                  >
                    {checkPassword.number ? (
                      <CheckIcon className="size-4"></CheckIcon>
                    ) : (
                      <XMarkIcon className="size-4"></XMarkIcon>
                    )}
                    <p>Có số</p>
                  </div>
                  <div
                    className={
                      "flex items-center gap-2 " +
                      (checkPassword.special
                        ? "text-success-hover"
                        : "text-fail")
                    }
                  >
                    {checkPassword.special ? (
                      <CheckIcon className="size-4"></CheckIcon>
                    ) : (
                      <XMarkIcon className="size-4"></XMarkIcon>
                    )}
                    <p>Có ký tự đặc biệt</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="font-medium">Nhập lại mật khẩu</p>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={
                <LockClosedIcon className="size-6 text-gray-400"></LockClosedIcon>
              }
              placeholder="Nhập lại mật khẩu"
              type={showConfirmPassword ? "text" : "password"}
              className={inputClassName}
              actionIcon={
                showConfirmPassword ? (
                  <EyeIcon className="size-6 cursor-pointer text-gray-400"></EyeIcon>
                ) : (
                  <EyeSlashIcon className="size-6 cursor-pointer text-gray-400"></EyeSlashIcon>
                )
              }
              onActionIconClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            ></Input>
            {/* Confirm Password requirements */}
            {!isValidConfirmPassword && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Mật khẩu không khớp</p>
              </div>
            )}
          </div>

          {/* Checkbox */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <input
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                type="checkbox"
                className="mt-0.5 h-4 w-4 border border-gray-300"
              ></input>
              <p className="text-sm text-gray-600">
                Tôi đồng ý với{" "}
                <a href="" className="text-primary-hover font-medium">
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="" className="text-primary-hover font-medium">
                  Chính sách bảo mật
                </a>
              </p>
            </div>
            {/* Accept requirements */}
            {!isValidAccept && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Vui lòng đồng ý với điều khoản dịch vụ</p>
              </div>
            )}
          </div>

          <Button
            label="Tạo tài khoản"
            rightIcon={<ArrowRightIcon className="size-4"></ArrowRightIcon>}
            className="bg-primary hover:bg-primary-hover w-full text-white"
            onClick={() => onHandleRegister()}
          ></Button>
          <div className="relative flex items-center justify-center">
            <p className="relative z-10 w-fit bg-white px-2 text-center text-sm text-gray-500">
              Hoặc đăng ký bằng
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
              Đã có tài khoản?{" "}
              <a href="/login" className="text-primary-hover font-medium">
                Đăng nhập ngay
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

export default Signup;
