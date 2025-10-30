import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { oauth2 } from "../api/auth/authApi";
import { useToast } from "../components/context/Toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const OAuth2Success: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let canceled = false;

    async function fetch() {
      const res = await oauth2();
      if (canceled) return;
      if (res.error?.status === 401) {
        toast("warning", res.error.message);
        navigate("/login");
      } else if (res.error) {
        toast("error", res.error.message);
        navigate("/login");
      }
      if (res.data) {
        localStorage.setItem("token", res.data?.token || "");
        toast("success", res.message);
        navigate("/");
      }
    }
    fetch();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner size="16"></LoadingSpinner>
    </div>
  );
};

export default OAuth2Success;
