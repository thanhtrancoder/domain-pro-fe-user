import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { moneyFormat, formatDate, formatDateTime } from "../../utils/Format";
import DomainProIcon from "../../assets/icons/icons8-domain-50.png";

const PaymentSuccess: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (state) {
      setOrderId(state.orderId);
      setAmount(state.amount);
      setDate(state.createdAt);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="space-y-12">
        <div className="flex items-center justify-center">
          <img src={DomainProIcon} className="h-16 w-16"></img>
        </div>
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-3xl font-semibold text-gray-800">
            Payment successful!
          </h1>

          {/* Description */}
          <p className="mb-6 text-gray-600">
            Thank you for completing your payment. Your order is being
            processed, and you can configure the domain name right now.
          </p>

          {/* Order information */}
          <div className="mb-6 rounded-md bg-gray-50 p-4 text-left">
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-medium text-gray-700">{orderId}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500">Total amount:</span>
              <span className="font-medium text-gray-700">
                {moneyFormat({
                  value: amount || 0,
                  countryCode: "vi-VN",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction date:</span>
              <span className="font-medium text-gray-700">
                {formatDateTime(date || "")}
              </span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            className="bg-primary hover:bg-primary-hover inline-flex w-full cursor-pointer items-center justify-center rounded-lg px-6 py-3 font-medium text-white transition-colors duration-300"
            onClick={() => navigate("/")}
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
