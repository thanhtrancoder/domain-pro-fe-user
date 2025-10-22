import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useSearchParams, useNavigate } from "react-router-dom";
import { checkPayment } from "../../api/momo/momoApi";
import type { CheckPaymentReq } from "../../api/momo/momoReq";
import { useEffect } from "react";
import { useToast } from "../../components/context/Toast";

const MoMoReturn: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();

  const req: CheckPaymentReq = {
    partnerCode: "MOMO",
    orderId: searchParams.get("orderId"),
    requestId: searchParams.get("requestId"),
    amount: searchParams.get("amount"),
    orderInfo: searchParams.get("orderInfo"),
    orderType: searchParams.get("orderType"),
    transId: searchParams.get("transId"),
    resultCode: searchParams.get("resultCode"),
    message: searchParams.get("message"),
    payType: searchParams.get("payType"),
    responseTime: searchParams.get("responseTime"),
    extraData: searchParams.get("extraData"),
    signature: searchParams.get("signature"),
  };

  useEffect(() => {
    let canceled = false;

    async function fetch() {
      const res = await checkPayment(req);
      if (canceled) return;
      if (res.error) {
        toast("error", res.error.message);
        navigate("/login");
        return;
      }
      toast("success", res.message);
      navigate("/payment/success", { state: res.data });
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

export default MoMoReturn;
