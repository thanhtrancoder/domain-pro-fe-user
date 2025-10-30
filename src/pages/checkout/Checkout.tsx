import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ShieldIcon,
  LockClosedIcon,
} from "../../components/icons/Icon";
import MomoIcon from "../../assets/icons/Momo-Icon.jpeg";
import { Input } from "../../components/ui/Input";
import type { iconProps } from "../../components/icons/Icon";
import { useState, useEffect } from "react";
import type { domainType } from "./checkoutData";
import { domainListSample } from "./checkoutData";
import { moneyFormat } from "../../utils/Format";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../components/context/AppContext";
import { getAllCart } from "../../api/cart/cartApi";
import { useToast } from "../../components/context/Toast";
import type { cartDto } from "../../api/cart/cartRes";
import { applyVoucher } from "../../api/vouchers/vouchersApi";
import { getProfile } from "../../api/account/accountApi";
import { createOrder } from "../../api/orders/ordersApi";
import { createCollectionLink } from "../../api/momo/momoApi";

interface inputDataProps {
  label: string;
  placeholder: string;
  Icon: React.FC<iconProps>;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputData: React.FC<inputDataProps> = ({
  label,
  placeholder,
  Icon,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        placeholder={placeholder}
        icon={<Icon className="size-6 text-gray-400"></Icon>}
        value={value}
        onChange={onChange}
        className="focus-within:ring-primary-hover border border-gray-300 focus-within:ring-2"
      ></Input>
    </div>
  );
};

interface paymentSecurityProps {
  content: string;
}

const PaymentSecurity: React.FC<paymentSecurityProps> = ({ content }) => {
  return (
    <li className="flex items-center gap-2">
      <CheckIcon className="text-success-hover2 size-4"></CheckIcon>
      <p className="text-sm text-gray-600">{content}</p>
    </li>
  );
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState<number>(0);
  const [domainList, setDomainList] = useState<cartDto[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherCodeApplied, setVoucherCodeApplied] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    window.scrollTo(0, 0);

    let canceled = false;

    async function fetch() {
      const response = await getAllCart();

      if (canceled) {
        return;
      }
      if (response.error?.status === 401) {
        toast("warning", response.error.message);
        navigate("/login");
      } else if (response.error) {
        toast("error", response.error.message);
      } else {
        setDomainList(response.data?.content || []);
        const totalPrice = response.data?.content.reduce((total, domain) => {
          return total + domain.discountPrice * domain.period;
        }, 0);
        setTotalPrice(totalPrice || 0);
      }

      const profile = await getProfile();
      if (canceled) {
        return;
      }
      if (profile.error?.status === 401) {
        toast("warning", profile.error.message);
        navigate("/login");
      } else if (profile.error) {
        toast("error", profile.error.message);
      } else {
        setName(profile.data?.fullname || "");
        setEmail(profile.data?.email || "");
      }
    }

    fetch();

    return () => {
      canceled = true;
    };
  }, []);

  const handleApplyVoucher = async () => {
    const response = await applyVoucher({
      code: voucherCode,
      amount: totalPrice,
    });

    if (response.error?.status === 401) {
      toast("warning", response.error.message);
      navigate("/login");
    } else if (response.error) {
      toast("error", response.error.message);
      setDiscountPrice(0);
    } else {
      setVoucherCodeApplied(voucherCode);
      setDiscountPrice(response.data?.discountPriceValue || 0);
      setVoucherCode("");
    }
  };

  const handleCancelVoucher = () => {
    setDiscountPrice(0);
    setVoucherCode("");
  };

  const handleSelectPaymentMethod = () => {
    setPaymentMethod("momo");
    setPaymentMethodId(1);
  };

  const handleCheckout = async () => {
    if (name === "") {
      toast("warning", "Vui lòng nhập họ và tên");
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !validEmail.test(email)) {
      toast("warning", "Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }

    if (paymentMethod === "") {
      toast("warning", "Vui lòng chọn phương thức thanh toán");
      return;
    }

    const order = await createOrder({
      fullname: name,
      email: email,
      phone: phone,
      province: province,
      address: address,
      paymentMethodId: paymentMethodId,
      discountCode: voucherCodeApplied,
    });

    if (order.error?.status === 401) {
      toast("warning", order.error.message);
      navigate("/login");
    } else if (order.error) {
      toast("error", order.error.message);
      return;
    }

    const momo = await createCollectionLink({
      orderId: order.data?.orderId + "",
    });

    if (momo.error?.status === 401) {
      toast("warning", momo.error.message);
      navigate("/login");
    } else if (momo.error) {
      toast("error", momo.error.message);
      return;
    }

    if (momo.data?.payUrl) {
      window.location.href = momo.data?.payUrl;
    } else if (momo.data?.shortLink) {
      window.location.href = momo.data?.shortLink;
    }
  };

  return (
    <div className="space-y-8 bg-gray-50 px-3 py-8 md:px-10 lg:px-20">
      {/* Title */}
      <div className="space-y-2">
        <p className="text-3xl font-bold">Thanh toán</p>
        <p className="text-gray-600">
          Hoàn tất đơn hàng của bạn một cách an toàn và bảo mật
        </p>
      </div>

      <div className="gap-8 lg:grid lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Customer info */}
          <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="text-primary-hover bg-tint-primary rounded-full p-2">
                <UserIcon></UserIcon>
              </div>
              <p className="text-xl font-bold">Thông tin khách hàng</p>
            </div>
            {/* Form */}
            <div className="space-y-4">
              <InputData
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                Icon={UserIcon}
                required={true}
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></InputData>
              <InputData
                label="Địa chỉ email"
                placeholder="Nhập địa chỉ email"
                Icon={EnvelopeIcon}
                required={true}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></InputData>
              <InputData
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                Icon={PhoneIcon}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              ></InputData>
              <InputData
                label="Tỉnh/Thành phố"
                placeholder="Nhập tỉnh/thành phố"
                Icon={MapPinIcon}
                value={province}
                onChange={(event) => setProvince(event.target.value)}
              ></InputData>
              <InputData
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                Icon={MapPinIcon}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              ></InputData>
            </div>
          </div>

          {/* Payment method */}
          <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="text-success-hover2 bg-light-success rounded-full p-2">
                <CreditCardIcon></CreditCardIcon>
              </div>
              <p className="text-xl font-bold">Phương thức thanh toán</p>
            </div>
            {/* Payment method list */}
            <div className="space-y-4">
              <div
                className={
                  "flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 " +
                  (paymentMethod === "momo"
                    ? "border-primary-hover hover:border-primary-hover2"
                    : "border-gray-200 hover:border-gray-300")
                }
                onClick={() => handleSelectPaymentMethod()}
              >
                <input
                  type="radio"
                  className="size-5"
                  checked={paymentMethod === "momo"}
                  onChange={() => handleSelectPaymentMethod()}
                ></input>
                <img src={MomoIcon} className="size-8 rounded-full"></img>
                <div>
                  <h3 className="font-bold">Ví MoMo</h3>
                  <p className="text-sm text-gray-600">
                    Thanh toán qua ví điện tử MoMo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="pt-8 lg:col-span-1 lg:pt-0">
          <div className="sticky top-24 space-y-8">
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
              <p className="text-xl font-bold">Tóm tắt đơn hàng</p>
              {/* Domain list */}
              <div className="space-y-3">
                {domainList.map((domainItem) => (
                  <div key={domainItem.cartId}>
                    <div className="flex items-center font-medium">
                      <p>{domainItem.domainName + domainItem.domainExtend}</p>
                      <p className="ml-auto">
                        {moneyFormat({
                          value: domainItem.discountPrice * domainItem.period,
                          countryCode: "vi-VN",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {domainItem.period} năm
                    </p>
                    <p className="text-sm text-gray-500">
                      {moneyFormat({
                        value: domainItem.discountPrice,
                        countryCode: "vi-VN",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                ))}
              </div>

              {/* Temporary total */}
              <div className="border-t border-gray-200">
                <div className="flex items-center pt-4 font-medium">
                  <p>Tạm tính</p>
                  <p className="ml-auto">
                    {moneyFormat({
                      value: totalPrice,
                      countryCode: "vi-VN",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>

              {/* Discount */}
              <div className="space-y-3">
                <p className="font-medium">Mã giảm giá</p>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Nhập mã giảm giá"
                    actionIcon={
                      <XMarkIcon className="size-6 cursor-pointer text-gray-500"></XMarkIcon>
                    }
                    className="focus-within:ring-primary-hover focus-within:border-primary-hover w-full border border-gray-400 focus-within:ring-2"
                    value={voucherCode}
                    onChange={(event) => setVoucherCode(event.target.value)}
                    onActionIconClick={() => setVoucherCode("")}
                  ></Input>
                  <div className="ml-auto">
                    <Button
                      label="Áp dụng"
                      onClick={handleApplyVoucher}
                    ></Button>
                  </div>
                </div>
                {discountPrice !== 0 && (
                  <div>
                    <div className="bg-light-success text-success-hover2 border-success flex items-center gap-2 rounded-lg border px-4 py-2">
                      <CheckIcon className="size-4"></CheckIcon>
                      <p className="font-bold uppercase">
                        {voucherCodeApplied}
                      </p>
                      {/* <p>(Giảm 80%)</p> */}
                      <button className="ml-auto" onClick={handleCancelVoucher}>
                        <XMarkIcon className="size-4 cursor-pointer"></XMarkIcon>
                      </button>
                    </div>
                    <div className="text-success-hover2 flex items-center pt-2 font-medium">
                      <p>Giảm giá</p>
                      <p className="ml-auto">
                        -
                        {moneyFormat({
                          value: discountPrice,
                          countryCode: "vi-VN",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="space-y-1 border-t border-gray-200 pt-4">
                <div className="flex items-center text-xl font-bold">
                  <p>Tổng cộng</p>
                  <p className="text-primary-hover ml-auto">
                    {moneyFormat({
                      value: totalPrice - discountPrice,
                      countryCode: "vi-VN",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <p className="text-sm text-gray-500">Đã bao gồm thuế VAT</p>
              </div>

              {/* Checkout button */}
              <Button
                label="Hoàn tất thanh toán"
                rightIcon={<ArrowRightIcon className="size-5"></ArrowRightIcon>}
                className="bg-primary hover:bg-primary-hover w-full py-4 text-lg text-white"
                onClick={handleCheckout}
              ></Button>

              {/* Commit */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ShieldIcon className="size-5"></ShieldIcon>
                  <p>Thanh toán an toàn với SSL 256-bit</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <LockClosedIcon className="size-5"></LockClosedIcon>
                  <p>Thông tin được bảo mật tuyệt đối</p>
                </div>
              </div>
            </div>

            {/* Payment security */}
            <div className="space-y-2 p-6">
              <h3>🔒 Bảo mật thanh toán</h3>
              <ul className="space-y-2">
                <PaymentSecurity content="Mã hóa SSL 256-bit"></PaymentSecurity>
                <PaymentSecurity content="Tuân thủ chuẩn PCI DSS"></PaymentSecurity>
                <PaymentSecurity content="Bảo vệ thông tin khách hàng"></PaymentSecurity>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
