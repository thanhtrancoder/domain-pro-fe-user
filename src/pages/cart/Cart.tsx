import { GlobeIcon } from "../../components/icons/Icon";
import { domainListSample, serviceListSample } from "./cartData";
import type { domainType, serviceType } from "./cartData";
import { useState, useEffect } from "react";
import { moneyFormat } from "../../utils/Format";
import { SquareButton, Button } from "../../components/ui/Button";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  SquaresPlusIcon,
  ArrowRightIcon,
} from "../../components/icons/Icon";
import AnnouncementIcon from "../../assets/icons/icons8-announcement-48.png";
import { useNavigate } from "react-router-dom";
import {
  getAllCart,
  updateCartItem,
  deleteCartItem,
} from "../../api/cart/cartApi";
import { useToast } from "../../components/context/Toast";
import type { cartDto } from "../../api/cart/cartRes";
import type { updateCartReq } from "../../api/cart/cartReq";
import {
  useAppState,
  useAppDispatch,
} from "../../components/context/AppContext";
import { useAccount } from "../../components/context/Account";
import { Popup } from "../../components/ui/Popup";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const accountContext = useAccount();
  const { account } = useAppState();

  const [domainList, setDomainList] = useState<cartDto[]>([]);
  const [serviceList, setServiceList] =
    useState<serviceType[]>(serviceListSample);
  const [numberCartItem, setNumberCartItem] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [cartId, setCartId] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    async function fetch() {
      const response = await getAllCart();

      if (canceled) {
        return;
      }
      if (response.error) {
        toast("error", response.error.message);
      } else {
        setDomainList(response.data?.content || []);
        setNumberCartItem(response.data?.page.totalElements || 0);
        const totalPrice = response.data?.content.reduce((total, domain) => {
          return total + domain.discountPrice * domain.period;
        }, 0);
        setTotalPrice(totalPrice || 0);
      }
    }

    fetch();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    const totalPrice = domainList.reduce((total, domain) => {
      return total + domain.discountPrice * domain.period;
    }, 0);
    setTotalPrice(totalPrice || 0);
    setNumberCartItem(domainList.length || 0);

    if (account) {
      accountContext({
        ...account,
        numberCartItem: domainList.length,
      });
    }
  }, [domainList]);

  const handleCheckServiceFull = (
    serviceId: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setServiceList((prevServiceList) =>
      prevServiceList.map((prevService) =>
        prevService.id === serviceId
          ? { ...prevService, isChecked: !prevService.isChecked }
          : prevService,
      ),
    );
  };

  const handleCheckService = (
    serviceId: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setServiceList((prevServiceList) =>
      prevServiceList.map((prevService) =>
        prevService.id === serviceId
          ? { ...prevService, isChecked: event.target.checked }
          : prevService,
      ),
    );
  };

  const handleUpdatePeriod = async (cartId: number, period: number) => {
    const req: updateCartReq = {
      cartId: cartId,
      period: period,
    };
    const response = await updateCartItem(req);
    if (response.error) {
      toast("error", response.error.message);
    } else if (response.data) {
      setDomainList((prevList) =>
        prevList.map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                period: response.data?.period ?? item.period,
                basePrice: response.data?.basePrice ?? item.basePrice,
                discountPrice:
                  response.data?.discountPrice ?? item.discountPrice,
              }
            : item,
        ),
      );
      toast("success", response.message);
    }
  };

  const handleConfirmDeleteCartItem = (cartId: number) => {
    setShowPopup(true);
    setCartId(cartId);
  };

  const handleDeleteCartItem = async (confirm: boolean) => {
    if (confirm) {
      const response = await deleteCartItem(cartId);
      if (response.error) {
        toast("error", response.error.message);
      } else {
        setDomainList((prevList) =>
          prevList.filter((item) => item.cartId !== cartId),
        );
        toast("success", response.message);
      }
    }

    setShowPopup(false);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Popup
      title="Xác nhận"
      content="Bạn có chắc chắn muốn xóa tên miền này?"
      value={
        "" +
        domainList.find((item) => item.cartId === cartId)?.domainName +
        domainList.find((item) => item.cartId === cartId)?.domainExtend
      }
      isShow={showPopup}
      onConfirm={handleDeleteCartItem}
    >
      <div className="space-y-8 bg-gray-50 px-3 py-8 md:px-10 lg:px-20">
        {/* Title */}
        <div className="space-y-2">
          <p className="text-3xl font-bold">Giỏ hàng của bạn</p>
          <p className="text-gray-600">
            Xem lại các sản phẩm đã chọn và hoàn tất đơn hàng
          </p>
        </div>

        <div className="gap-8 lg:grid lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Domain list */}
            <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-light-primary2 rounded-full p-2">
                  <GlobeIcon className="text-primary-hover size-6"></GlobeIcon>
                </div>

                <p className="text-xl font-bold">Tên miền đã chọn</p>
                <p className="text-primary-hover bg-light-primary2 rounded-full px-3 py-1 text-center text-sm font-medium">
                  {numberCartItem} tên miền
                </p>
              </div>

              <div className="space-y-4">
                {domainList.map((domain) => (
                  <div
                    key={domain.cartId}
                    className="space-y-4 rounded-xl border border-gray-200 p-4 lg:flex lg:items-center lg:gap-3 lg:space-y-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <p className="text-xl font-bold">
                          {domain.domainName + domain.domainExtend}
                        </p>
                        <SquareButton
                          leftIcon={<TrashIcon className="text-fail size-5" />}
                          onClick={() =>
                            handleConfirmDeleteCartItem(domain.cartId)
                          }
                          className="hover:bg-light-fail ml-auto lg:hidden"
                        ></SquareButton>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        {domain.discountPrice !== domain.basePrice && (
                          <p className="text-gray-600 line-through">
                            {moneyFormat({
                              value: domain.basePrice,
                              countryCode: "vi-VN",
                              currency: "VND",
                            })}
                            /năm
                          </p>
                        )}

                        <p className="text-success-hover2 font-medium">
                          {moneyFormat({
                            value: domain.discountPrice,
                            countryCode: "vi-VN",
                            currency: "VND",
                          })}
                          /năm
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 lg:ml-auto">
                      <p className="text-sm text-gray-600">Thời hạn:</p>
                      <div className="flex items-center gap-2 rounded-xl border border-gray-200">
                        <SquareButton
                          leftIcon={<MinusIcon className="size-4" />}
                          onClick={() =>
                            handleUpdatePeriod(domain.cartId, domain.period - 1)
                          }
                          className="hover:bg-gray-100"
                        ></SquareButton>
                        <p className="text-center text-sm font-medium">
                          {domain.period} năm
                        </p>
                        <SquareButton
                          rightIcon={<PlusIcon className="size-4" />}
                          onClick={() =>
                            handleUpdatePeriod(domain.cartId, domain.period + 1)
                          }
                          className="hover:bg-gray-100"
                        ></SquareButton>
                      </div>
                      <div className="ml-auto min-w-[120px] text-right lg:pl-2">
                        <p className="text-primary-hover text-lg font-bold">
                          {moneyFormat({
                            value: domain.discountPrice * domain.period,
                            countryCode: "vi-VN",
                            currency: "VND",
                          })}
                        </p>
                        {domain.period > 1 && (
                          <p className="text-sm text-gray-500">
                            {domain.period} năm
                          </p>
                        )}
                      </div>
                    </div>
                    <SquareButton
                      leftIcon={<TrashIcon className="text-fail size-5" />}
                      onClick={() => handleConfirmDeleteCartItem(domain.cartId)}
                      className="hover:bg-light-fail hidden lg:block"
                    ></SquareButton>
                  </div>
                ))}
              </div>
            </div>

            {/* Service support */}
            <div className="relative">
              {/* Disable announcement */}
              <div className="absolute z-10 flex h-full w-fit w-full items-center justify-center">
                <div className="bg-tint-primary border-tint-primary2 text-primary-hover2 flex w-fit items-center justify-center gap-2 rounded-xl border p-4 font-medium shadow-xl">
                  <img src={AnnouncementIcon} className="size-6"></img>
                  <span className="">Tính năng sẽ được phát hành sau.</span>
                </div>
              </div>

              <div className="pointer-events-none relative opacity-50">
                <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
                  {/* Title */}
                  <div className="flex items-center gap-3">
                    <div className="bg-light-success rounded-full p-2">
                      <SquaresPlusIcon className="text-success-hover2 size-6"></SquaresPlusIcon>
                    </div>
                    <p className="text-xl font-bold">Dịch vụ bổ trợ</p>
                    <p className="text-secondary bg-lightest-secondary rounded-full px-3 py-1 text-center text-sm font-medium">
                      Khuyến nghị
                    </p>
                  </div>

                  {/* Service list */}
                  <div className="space-y-4">
                    {serviceList.map((service) => (
                      <div
                        key={service.id}
                        className={
                          "flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition-colors duration-300 " +
                          (service.isChecked
                            ? "border-primary-hover bg-tint-primary hover:border-primary-hover2"
                            : "border-gray-200 hover:border-gray-300")
                        }
                        onClick={(event) =>
                          handleCheckServiceFull(service.id, event)
                        }
                      >
                        <div>
                          <input
                            type="checkbox"
                            className="h-5 w-5"
                            checked={service.isChecked}
                            onChange={(event) =>
                              handleCheckService(service.id, event)
                            }
                          ></input>
                        </div>
                        <div
                          className={
                            "h-fit rounded-xl p-2 transition-colors duration-300 " +
                            (service.isChecked
                              ? "text-primary-hover bg-tint-primary2"
                              : "bg-gray-100")
                          }
                        >
                          <service.icon className="h-7 w-7 shrink-0"></service.icon>
                        </div>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <p className="text-lg font-bold">{service.name}</p>
                            <p className="text-sm text-gray-600">
                              {service.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500 line-through">
                              {moneyFormat({
                                value: service.price,
                                countryCode: "vi-VN",
                                currency: "VND",
                              })}
                            </p>
                            <p className="text-success-hover2 text-lg font-bold">
                              {moneyFormat({
                                value: service.priceDiscount,
                                countryCode: "vi-VN",
                                currency: "VND",
                              })}
                              /năm
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 lg:col-span-1 lg:pt-0">
            <div className="sticky top-24 space-y-8">
              {/* Summary */}
              <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
                <p className="text-xl font-bold">Tóm tắt đơn hàng</p>
                {/* List item */}
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <p>Tên miền ({numberCartItem})</p>
                    <p className="ml-auto">
                      {moneyFormat({
                        value: totalPrice,
                        countryCode: "vi-VN",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p>Dịch vụ bổ trợ (0)</p>
                    <p className="ml-auto">0</p>
                  </div>
                </div>
                {/* Total */}
                <div className="space-y-1 border-t border-gray-200 pt-4">
                  <div className="flex items-center text-xl font-bold">
                    <p>Tổng cộng</p>
                    <p className="text-primary-hover ml-auto">
                      {moneyFormat({
                        value: totalPrice,
                        countryCode: "vi-VN",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
                {/* Checkout button */}
                <div
                  className={
                    numberCartItem === 0 ? "pointer-events-none opacity-50" : ""
                  }
                >
                  <Button
                    label="Tiến hành thanh toán"
                    rightIcon={
                      <ArrowRightIcon className="size-4"></ArrowRightIcon>
                    }
                    className="bg-primary hover:bg-primary-hover w-full py-4 text-lg text-white"
                    onClick={handleCheckout}
                  ></Button>
                </div>
              </div>

              {/* Suggest */}
              <div className="bg-tint-primary space-y-3 rounded-xl p-6">
                <p className="text-primary-hover2 font-bold">
                  💡 Gợi ý cho bạn
                </p>
                <ul className="text-primary-hover2 space-y-1 text-sm">
                  <li>• Đăng ký nhiều năm để tiết kiệm chi phí</li>
                  <li>• Thêm Domain Privacy để bảo vệ thông tin</li>
                  <li>• SSL Certificate giúp website an toàn hơn</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default Cart;
