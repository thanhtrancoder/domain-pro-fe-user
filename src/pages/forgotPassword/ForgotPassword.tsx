import { useState } from "react";
import {
  LockClosedIcon,
  EnvelopeIcon,
  AngleRightIcon,
  ShieldIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from "../../components/icons/Icon";
import DomainProIcon from "../../assets/icons/icons8-domain-50.png";
import { supportData } from "../data";
import type { supportType } from "../data";
import { Input } from "../../components/ui/Input";
import { useToast } from "../../components/context/Toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { forgotPassword } from "../../api/auth/authApi";
import Loading from "../../components/layout/Loading";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onHandleForgotPassword = async () => {
    // Check email
    const isEmptyEmailTemp = email === "";
    setIsEmptyEmail(isEmptyEmailTemp);
    const isValidEmailTemp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidEmail(isValidEmailTemp);

    if (!isEmptyEmailTemp && isValidEmailTemp) {
      setIsLoading(true);
      const res = await forgotPassword({
        email: email,
      });
      if (res.error?.status === 401) {
        toast("warning", res.error.message);
        navigate("/login");
      } else if (res.error) {
        setIsLoading(false);
        toast("error", res.error.message);
        return;
      }
      setIsLoading(false);
      toast("success", res.message);
      navigate("/reset-password?email=" + email);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onHandleForgotPassword();
    }
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
          <p className="text-3xl font-bold">Forgot password?</p>
          <p className="text-gray-600">
            Enter your email and we'll send reset instructions
          </p>
        </div>

        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <p className="font-medium text-gray-700">Email address</p>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={
                    <EnvelopeIcon className="size-6 text-gray-400"></EnvelopeIcon>
                  }
                  placeholder="Enter your email address"
                  type="email"
                  className={inputClassName}
                  onKeyDown={handleKeyDown}
                ></Input>
                {/* Email requirements */}
                {isEmptyEmail ? (
                  <div className="text-fail flex items-center gap-1 text-sm">
                    <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                    <p>Please enter your email</p>
                  </div>
                ) : (
                  !isValidEmail && (
                    <div className="text-fail flex items-center gap-1 text-sm">
                      <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                      <p>Invalid email</p>
                    </div>
                  )
                )}
              </div>

              <Loading loading={isLoading}>
                <Button
                  label="Continue"
                  rightIcon={
                    <ArrowRightIcon className="size-4"></ArrowRightIcon>
                  }
                  className="bg-primary hover:bg-primary-hover w-full text-white"
                  onClick={() => onHandleForgotPassword()}
                ></Button>
              </Loading>
            </form>
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-8 py-4">
            <p className="text-center text-sm text-gray-600">
              Back to Login?{" "}
              <a
                href="/login"
                className="text-primary hover:text-primary-hover font-medium transition-colors duration-300"
              >
                Login
              </a>
            </p>
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

export default ForgotPassword;
