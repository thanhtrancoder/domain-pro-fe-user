import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DomainProIcon from "../../assets/icons/icons8-domain-50.png";
import { CheckIcon, LockClosedIcon } from "../../components/icons/Icon";
import { Button } from "../../components/ui/Button";

const ResetPasswordSuccess: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!state) {
      navigate("/");
    } else {
      if (!state.isResetPasswordSuccess) {
        navigate("/");
      }
    }
  }, []);

  const handleLoginNow = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <a href="/">
        <img src={DomainProIcon} className="h-16 w-16"></img>
      </a>

      <div className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-xl transition-all duration-500">
        <div className="flex flex-col items-center">
          {/* Success Icon */}
          <div className="mb-6 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-green-100">
            <CheckIcon className="text-success-hover h-10 w-10"></CheckIcon>
          </div>

          {/* Success Message */}
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Password reset successful!
          </h1>
          <p className="mb-8 text-center text-gray-600">
            Your password has been updated successfully. You can now Login with
            your new password.
          </p>

          {/* Illustration */}
          <div className="mb-8">
            <LockClosedIcon className="text-primary h-32 w-32"></LockClosedIcon>
          </div>

          {/* Additional Info */}
          <div className="mb-6 w-full rounded-lg bg-blue-50 p-4">
            <p className="text-primary-hover text-sm">
              <span className="font-semibold">Note:</span> Make sure to keep
              your new password in a safe place and do not share it with others.
            </p>
          </div>

          {/* Login Button */}
          <Button
            label="Login now"
            className="bg-primary hover:bg-primary-hover w-full text-white"
            onClick={() => handleLoginNow()}
          ></Button>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a
                href="/contact"
                className="text-primary hover:text-primary-hover font-medium transition duration-300"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
