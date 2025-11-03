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
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/icons8-google.svg";
import { supportData } from "./data";
import type { supportType } from "./data";
import { login } from "../api/auth/authApi";
import { useToast } from "../components/context/Toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }

    return () => {
      canceled = true;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onHandleLogin = async () => {
    // Check email
    const isEmptyEmailTemp = email === "";
    setIsEmptyEmail(isEmptyEmailTemp);
    const isValidEmailTemp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidEmail(isValidEmailTemp);
    // Check password
    const isEmptyPasswordTemp = password === "";
    setIsEmptyPassword(isEmptyPasswordTemp);

    if (!isEmptyEmailTemp && !isEmptyPasswordTemp && isValidEmailTemp) {
      const res = await login({ email, password });
      if (res.error) {
        toast("error", res.error.message);
        return;
      }
      if (res.data) {
        localStorage.setItem("token", res.data?.token || "");
        toast("success", res.message);
        navigate("/");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      process.env.REACT_APP_BACKEND_DOMAIN + "/oauth2/authorization/google";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onHandleLogin();
    }
  };

  const inputClassName =
    "focus-within:ring-primary border border-gray-300 shadow-sm transition-discrete duration-300 focus-within:ring-2";

  return (
    <div className="from-tint-primary to-tint-primary2 flex flex-col items-center justify-center bg-gradient-to-br px-8 py-12">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-6">
        {/* Title */}
        <a href="/">
          <img src={DomainProIcon} className="h-16 w-16"></img>
        </a>
        <div className="space-y-2 text-center">
          <p className="text-3xl font-bold">Welcome back</p>
          <p className="text-gray-600">Sign in to manage your domains and services</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-6 rounded-xl bg-white p-8 shadow-lg"
        >
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Email address</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <EnvelopeIcon className="size-6 text-gray-400"></EnvelopeIcon>
              }
              placeholder="Enter email address"
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

          <div className="space-y-2">
            <p className="font-medium text-gray-700">Password</p>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <LockClosedIcon className="size-6 text-gray-400"></LockClosedIcon>
              }
              placeholder="Enter password"
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
            {/* Email requirements */}
            {isEmptyPassword && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Please enter your password</p>
              </div>
            )}
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-primary hover:text-primary-hover text-sm font-medium transition-colors duration-300"
            >
              Forgot password?
            </a>
          </div>

          <Button
            label="Sign in"
            rightIcon={<ArrowRightIcon className="size-4"></ArrowRightIcon>}
            className="bg-primary hover:bg-primary-hover w-full text-white"
            onClick={() => onHandleLogin()}
          ></Button>

          <div className="relative flex items-center justify-center">
            <p className="relative z-10 w-fit bg-white px-2 text-center text-sm text-gray-500">
              Or sign in with
            </p>
            <div className="absolute top-1/2 w-full border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-1">
            <Button
              label="Google"
              leftIcon={<img src={GoogleIcon} className="size-5"></img>}
              className="border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
              onClick={() => handleGoogleLogin()}
            ></Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-primary hover:text-primary-hover font-medium transition-colors duration-300"
              >
                Sign up now
              </a>
            </p>
          </div>
        </form>

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

export default Login;
