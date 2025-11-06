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
import { useToast } from "../components/context/Toast";
import { register } from "../api/auth/authApi";
import type { registerReq } from "../api/auth/authReq";

interface checkPasswordType {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
  valid: boolean;
}

const Signup: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

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

  const onHandleRegister = async () => {
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
      const req: registerReq = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      const registerData = await register(req);
      if (registerData.error) {
        toast("error", registerData.error.message);
        return;
      }
      localStorage.setItem("token", registerData.data?.token || "");
      toast("success", registerData.message);
      navigate("/");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const inputClassName =
    "focus-within:ring-primary border border-gray-300 shadow-sm transition-discrete duration-300 focus-within:ring-2";

  const handleGoogleLogin = () => {
    window.location.href =
      process.env.REACT_APP_BACKEND_DOMAIN + "/oauth2/authorization/google";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onHandleRegister();
    }
  };

  return (
    <div className="from-tint-primary to-tint-primary2 flex flex-col items-center justify-center bg-gradient-to-br px-8 py-12">
      <div className="flex max-w-md flex-col items-center justify-center gap-6">
        {/* Title */}
        <a href="/">
          <img src={DomainProIcon} className="h-16 w-16"></img>
        </a>
        <div className="space-y-2 text-center">
          <p className="text-3xl font-bold">Create a new account</p>
          <p className="text-gray-600">
            Sign up to start managing your domains
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-8 shadow-lg"
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
            {!isValidEmail && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Invalid email address</p>
              </div>
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
                    <p>Contains a number</p>
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
                    <p>Contains a special character</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Confirm password</p>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={
                <LockClosedIcon className="size-6 text-gray-400"></LockClosedIcon>
              }
              placeholder="Re-enter password"
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
                I agree to the{" "}
                <a
                  href="/terms-service"
                  className="text-primary hover:text-primary-hover font-medium transition-colors duration-300"
                >
                  {" "}
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary hover:text-primary-hover font-medium transition-colors duration-300"
                >
                  {" "}
                  Privacy Policy
                </a>
              </p>
            </div>
            {/* Accept requirements */}
            {!isValidAccept && (
              <div className="text-fail flex items-center gap-1 text-sm">
                <ExclamationCircleIcon className="size-4"></ExclamationCircleIcon>
                <p>Please agree to the Terms of Service</p>
              </div>
            )}
          </div>

          <Button
            label="Create account"
            rightIcon={<ArrowRightIcon className="size-4"></ArrowRightIcon>}
            className="bg-primary hover:bg-primary-hover w-full text-white"
            onClick={() => onHandleRegister()}
          ></Button>
          <div className="relative flex items-center justify-center">
            <p className="relative z-10 w-fit bg-white px-2 text-center text-sm text-gray-500">
              Or sign up with
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
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:text-primary-hover font-medium transition-colors duration-300"
              >
                {" "}
                Login now
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

export default Signup;
