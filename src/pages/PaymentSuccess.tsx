import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { moneyFormat, formatDate } from "../utils/Format";
import DomainProIcon from "../assets/icons/icons8-domain-50.png";

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
      console.log("state = ", state);
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
          {/* Icon thành công */}
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

          {/* Tiêu đề */}
          <h1 className="mb-2 text-3xl font-semibold text-gray-800">
            Thanh toán thành công!
          </h1>

          {/* Mô tả */}
          <p className="mb-6 text-gray-600">
            Cảm ơn bạn đã hoàn tất thanh toán. Đơn hàng của bạn đang được xử lý
            và bạn sẽ sớm nhận được thông tin xác nhận.
          </p>

          {/* Thông tin đơn hàng (ví dụ) */}
          <div className="mb-6 rounded-md bg-gray-50 p-4 text-left">
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500">Mã đơn hàng:</span>
              <span className="font-medium text-gray-700">{orderId}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500">Tổng số tiền:</span>
              <span className="font-medium text-gray-700">
                {moneyFormat({
                  value: amount || 0,
                  countryCode: "vi-VN",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Ngày giao dịch:</span>
              <span className="font-medium text-gray-700">
                {formatDate(date || "")}
              </span>
            </div>
          </div>

          {/* Nút hành động */}
          <button
            type="button"
            className="bg-primary hover:bg-primary-hover inline-flex w-full cursor-pointer items-center justify-center rounded-lg px-6 py-3 font-medium text-white transition-colors duration-300"
            onClick={() => navigate("/")}
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
