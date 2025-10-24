import DomainProIcon from "../assets/icons/icons8-domain-50.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/Button";

const FeatureComingSoon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-16">
      <div className="mx-auto max-w-lg p-8 text-center">
        <div className="mb-6 flex items-center justify-center">
          <img
            src={DomainProIcon}
            className="size-12 text-center md:size-16"
          ></img>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
          Tính năng đang phát triển
        </h1>

        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Chúng tôi đang nỗ lực làm việc để sớm ra mắt tính năng này. Cảm ơn bạn
          đã quan tâm và vui lòng quay lại sau!
        </p>

        <div className="mt-8 flex items-center justify-center">
          <Button
            label="Quay lại"
            onClick={handleGoBack}
            className="bg-primary hover:bg-primary-hover px-6 py-3 text-white"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureComingSoon;
