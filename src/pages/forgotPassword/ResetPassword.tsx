import { useState, useEffect, useRef } from "react";
import {
  LockClosedIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ShieldIcon,
  ExclamationCircleIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
} from "../../components/icons/Icon";
import DomainProIcon from "../../assets/icons/icons8-domain-50.png";
import { supportData } from "../data";
import type { supportType } from "../data";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { resetPassword, forgotPassword } from "../../api/auth/authApi";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../../components/layout/Loading";
import { useToast } from "../../components/context/Toast";

interface checkPasswordType {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
  valid: boolean;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [checkPassword, setCheckPassword] = useState<checkPasswordType>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    valid: true,
  });
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

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

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDownOtp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0) {
      e.preventDefault();

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Focus previous input
      (e.currentTarget.previousSibling as HTMLInputElement).focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();

      // Focus previous input
      (e.currentTarget.previousSibling as HTMLInputElement).focus();
    }
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      e.preventDefault();

      // Focus next input
      (e.currentTarget.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleResetPassword();
    }
  };

  const handlePasteOtp = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    const chars = paste.split("");
    const newOtp = [...otp];
    for (let i = index; i < otp.length && chars.length > 0; i++) {
      newOtp[i] = chars.shift()!;
    }
    setOtp(newOtp);
    // focus to the last filled box or the next one
    const nextIndex = Math.min(index + paste.length, otp.length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResetPassword = async () => {
    if (email === null || email === undefined) {
      toast("error", "Invalid email");
      return;
    }
    if (otp.join("") === "") {
      toast("error", "Invalid OTP code");
      return;
    }
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

    if (isValidPasswordTemp && isValidConfirmPasswordTemp) {
      setIsConfirmLoading(true);
      const res = await resetPassword({
        email: email,
        otp: otp.join(""),
        password: password,
        confirmPassword: confirmPassword,
      });
      if (res.error?.status === 401) {
        toast("warning", res.error.message);
        navigate("/login");
      } else if (res.error) {
        setIsConfirmLoading(false);
        toast("error", res.error.message);
        return;
      }
      setIsConfirmLoading(false);
      toast("success", res.message);
      navigate("/reset-password-success", {
        state: { isResetPasswordSuccess: true },
      });
    }
  };

  const handleResendOtp = async () => {
    if (email === null || email === undefined) {
      toast("error", "Invalid email");
      return;
    }
    setOtp(["", "", "", "", "", ""]);
    setIsResendLoading(true);
    const res = await forgotPassword({
      email: email,
    });
    if (res.error?.status === 401) {
      toast("warning", res.error.message);
      navigate("/login");
    } else if (res.error) {
      setIsResendLoading(false);
      toast("error", res.error.message);
      return;
    }
    setIsResendLoading(false);
    toast("success", res.message);
  };

  const inputClassName =
    "focus-within:ring-primary border border-gray-300 shadow-sm transition-discrete duration-300 focus-within:ring-2";

  return (
    <div className="from-tint-primary to-tint-primary2 flex flex-col items-center justify-center bg-gradient-to-br px-8 py-12">
      <div className="flex max-w-md flex-col items-center justify-center gap-6">
        {/* Title */}
        <a href="/">
          <img src={DomainProIcon} className="h-16 w-16"></img>
        </a>
        <div className="space-y-2 text-center">
          <p className="text-3xl font-bold">Reset password</p>
          <p className="text-gray-600">
            Enter the OTP sent to <strong>{email}</strong> and create a new
            password
          </p>
        </div>

        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="p-8">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Verification code (OTP)
                </label>
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="h-12 w-12 rounded-lg border border-gray-300 text-center text-lg font-semibold transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={(e) => handleKeyDownOtp(e, index)}
                      onPaste={(e) => handlePasteOtp(e, index)}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-gray-700">New password</p>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={
                    <LockClosedIcon className="size-6 text-gray-400"></LockClosedIcon>
                  }
                  placeholder="Enter new password"
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
                  onKeyDown={handleKeyDown}
                ></Input>
                {/* Password requirements */}
                {password.length === 0 && !checkPassword.valid && (
                  <div className="text-fail flex items-center gap-1 text-sm">
                    <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                    <p>Please enter a password</p>
                  </div>
                )}
                {/* Password requirements */}
                {password.length > 0 && (
                  <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-sm">
                    <p className="font-medium">Password requirements:</p>
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
                        <p>At least 8 characters</p>
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
                        <p>Contains uppercase letter</p>
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
                        <p>Contains lowercase letter</p>
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
                        <p>Contains number</p>
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
                        <p>Contains special character</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-700">Re-enter new password</p>
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={
                    <LockClosedIcon className="size-6 text-gray-400"></LockClosedIcon>
                  }
                  placeholder="Re-enter new password"
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
                  onKeyDown={handleKeyDown}
                ></Input>
                {/* Confirm Password requirements */}
                {!isValidConfirmPassword && (
                  <div className="text-fail flex items-center gap-1 text-sm">
                    <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                    <p>Passwords do not match</p>
                  </div>
                )}
              </div>

              <Loading loading={isConfirmLoading}>
                <Button
                  label="Confirm"
                  rightIcon={
                    <CheckCircleIcon className="size-4"></CheckCircleIcon>
                  }
                  className="bg-primary hover:bg-primary-hover w-full text-white"
                  onClick={() => handleResetPassword()}
                ></Button>
              </Loading>
            </form>
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-8 py-4">
            <Loading loading={isResendLoading}>
              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?{" "}
                <a
                  className="text-primary hover:text-primary-hover cursor-pointer font-medium transition-colors duration-300"
                  onClick={() => handleResendOtp()}
                >
                  Resend
                </a>
              </p>
            </Loading>
          </div>
        </div>

        {/* Support */}
        <div className="w-full space-y-4 rounded-xl bg-white p-8 shadow-lg">
          <p className="text-center text-lg font-bold">Why choose DomainPro?</p>
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

export default ResetPassword;
