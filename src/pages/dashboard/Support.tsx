import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Support: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
      {/* Title */}
      <div>
        <h3 className="text-xl font-bold">Support Center</h3>
      </div>

      {/* FAQ */}

      {/* Ticket */}

      {/* Contact */}
      <div className="bg-light-primary2 text-primary-hover2 space-y-4 rounded-xl p-6 text-sm font-medium">
        <h4 className="text-base font-bold">Contact Information</h4>
        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
          <div>
            <p>Support Email</p>
            <p className="text-primary-hover font-normal">
              support@domainpro.com
            </p>
          </div>
          <div>
            <p>Support Hotline</p>
            <p className="text-primary-hover font-normal">1900 1234</p>
          </div>
          <div>
            <p>Working Hours</p>
            <p className="text-primary-hover font-normal">08:00 - 22:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
