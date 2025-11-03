import { useState, useEffect } from "react";
import { moneyFormat } from "../../utils/Format";
import {
  CheckIcon,
  ArrowRightIcon,
  BoltIcon,
  CheckBadgeIcon,
} from "../../components/icons/Icon";
import { NavButton } from "../../components/ui/Button";
import {
  serviceListSample,
  domainDiscountSample,
  domainDiscountListSample,
} from "./homeData";
import type { iconProps } from "../../components/icons/Icon";
import { SearchForm2 } from "../../components/ui/SearchForm";
import { useNavigate } from "react-router-dom";
import { getDomainExtendPopular } from "../../api/domainExtend/domainExtendApi";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/context/Toast";
import { getDiscountest, type voucherDto } from "../../api/vouchersApi";
import type { domainExtendDto } from "../../api/domainExtend/domainExtendRes";

interface serviceType {
  id: number;
  icon: React.FC<iconProps>;
  title: string;
  description: string;
  feature: string[];
  price: number;
  unitPrice: string;
  navigate: string;
}

interface domainDiscountType {
  domain: string;
  discount: number;
  expiredDuringDate: number;
}

interface domainDiscountProps {
  isPopular: boolean;
  domain: string;
  price: number;
  priceDiscount: number;
  feature: string[];
}

const DomainDiscount: React.FC<domainDiscountProps> = ({
  isPopular,
  domain,
  price,
  priceDiscount,
  feature,
}) => {
  const bgColor = isPopular ? "bg-primary" : "bg-gray-50";
  const textColor = isPopular ? "text-white" : "text-black";
  const priceTextColor = isPopular ? "text-blue-200" : "text-gray-500";
  const checkIconColor = isPopular ? "text-sixth" : "text-success-hover";

  return (
    <div
      className={`rounded-xl ${bgColor} ${textColor} h-fit space-y-5 p-8 text-center`}
    >
      {isPopular && (
        <div className="flex items-center justify-center font-bold text-black">
          <div className="bg-sixth flex items-center justify-center space-x-1 rounded-2xl px-4 py-1">
            <CheckBadgeIcon className="size-5"></CheckBadgeIcon>
            <p>Most popular</p>
          </div>
        </div>
      )}
      <p className="text-3xl font-bold">{domain}</p>
      {/* <p className={`text-sm ${priceTextColor} line-through`}>
        {moneyFormat({ value: price, countryCode: "vi-VN", currency: "VND" })}
        /year
      </p> */}
      <p className="text-4xl font-bold">
        {moneyFormat({
          value: priceDiscount,
          countryCode: "vi-VN",
          currency: "VND",
        })}
        <span className="text-lg font-normal">/year</span>
      </p>
      <div className="space-y-3 text-left">
        {feature.map((item: string, index: number) => (
          <div key={index} className="flex items-center space-x-1">
            <CheckIcon className={`${checkIconColor} size-5`}></CheckIcon>
            <p>{item}</p>
          </div>
        ))}
      </div>
      {isPopular ? (
        <NavButton
          label="Register now"
          to={"/search?domain=yourdomain" + domain}
          className="text-primary bg-white font-medium hover:bg-gray-100"
        ></NavButton>
      ) : (
        <NavButton
          label="Register now"
          to={"/search?domain=yourdomain" + domain}
        ></NavButton>
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [domainSaleList, setDomainSaleList] = useState<domainExtendDto[]>([]);

  const [serviceList, setServiceList] =
    useState<serviceType[]>(serviceListSample);

  const [searchString, setSearchString] = useState("");
  const [domainDiscount, setDomainDiscount] =
    useState<domainDiscountType>(domainDiscountSample);
  // const [domainDiscountList, setDomainDiscountList] = useState<
  //   domainDiscountListType[]
  // >(domainDiscountListSample);
  const [showSearchStringEmptyTooltip, setShowSearchStringEmptyTooltip] =
    useState(false);
  const [featureList, setFeatureList] = useState<string[]>([
    "24/7 support",
    "Free DNS",
    "Easy transfer",
  ]);
  const [voucher, setVoucher] = useState<voucherDto | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      const domainSaleData = await getDomainExtendPopular();
      if (cancelled) return;
      if (domainSaleData.data) {
        setDomainSaleList(domainSaleData.data);
      }
      if (domainSaleData.error?.status === 401) {
        toast("warning", domainSaleData.error.message);
        navigate("/login");
      } else if (domainSaleData.error) {
        toast("error", domainSaleData.error.message);
      }

      const voucherData = await getDiscountest();
      if (cancelled) return;
      if (voucherData.data) {
        setVoucher(voucherData.data);
      }
      if (voucherData.error?.status === 401) {
        toast("warning", voucherData.error.message);
        navigate("/login");
      } else if (voucherData.error) {
        toast("error", voucherData.error.message);
      }
    }

    fetch();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = () => {
    if (searchString.trim() === "") {
      setShowSearchStringEmptyTooltip(true);
      return;
    }
    navigate("/search?domain=" + searchString);
  };

  return (
    <>
      {/* Search */}
      <div className="from-primary to-primary-hover2 bg-gradient-to-br px-2 py-20 md:px-10 lg:px-20">
        <div className="flex flex-col items-center space-y-8">
          {/* Title */}
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Find the <p className="text-light-secondary">perfect</p> domain for
            your business
          </h1>
          <p className="text-center text-xl text-white lg:text-2xl">
            Register domains at the best prices.
          </p>

          {/* Search form */}
          <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg">
            {showSearchStringEmptyTooltip && (
              <div className="relative">
                <div className="absolute bottom-full left-0 mb-2 -translate-x-0 transform">
                  <div className="tooltip-box bg-light-warning2 relative rounded px-2 py-1 text-sm">
                    You haven't entered a domain or keyword
                    <div className="tooltip-arrow border-t-light-warning2 absolute bottom-[-4px] left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-r-transparent border-l-transparent" />
                  </div>
                </div>
              </div>
            )}

            <SearchForm2
              searchString={searchString}
              setSearchString={setSearchString}
              onActionIconClick={() => setSearchString("")}
              onClick={() => handleSearch()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            ></SearchForm2>
          </div>

          {/* Domain on sale */}
          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {domainSaleList.map((domainSaleItem) => (
              <div
                key={domainSaleItem.domainExtendId}
                className="flex w-full flex-col items-center rounded-xl bg-white/10 py-4 text-lg font-bold transition-colors duration-300 hover:bg-white/20"
              >
                <span className="text-white">{domainSaleItem.name}</span>
                {/* <span className="text-sm font-normal text-white line-through">
                  {moneyFormat({
                    value: domainSaleItem.price,
                    countryCode: "vi-VN",
                    currency: "VND",
                  })}
                </span> */}
                <span className="text-sixth">
                  {moneyFormat({
                    value: domainSaleItem.basePrice,
                    countryCode: "vi-VN",
                    currency: "VND",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="bg-gray-50 px-2 py-20 md:px-10 lg:px-20">
        {/* Title */}
        <div className="flex flex-col space-y-4 pb-16 text-center">
          <p className="text-4xl font-bold">Professional services</p>
          <p className="text-xl text-gray-600">
            We provide all the essential services to build and grow your online
            presence.
          </p>
        </div>

        {/* Service list */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col space-y-4 rounded-xl bg-white p-8 shadow-lg transition-discrete duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-primary-hover group-hover:bg-primary-hover bg-light-primary2 w-fit rounded-xl p-4 transition-colors duration-300 group-hover:text-white">
                <service.icon className="size-8"></service.icon>
              </div>
              <p className="text-xl font-bold">{service.title}</p>
              <p className="text-gray-600">{service.description}</p>
              <ul className="space-y-2">
                {service.feature.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-1">
                    <CheckIcon className="text-success-hover size-4"></CheckIcon>
                    <p className="text-gray-600">{feature}</p>
                  </li>
                ))}
              </ul>
              <p className="text-primary-hover text-2xl font-bold no-underline">
                From &nbsp;
                {moneyFormat({
                  value: service.price,
                  countryCode: "vi-VN",
                  currency: "VND",
                })}
                {"/"}
                {service.unitPrice}
              </p>
              <NavButton
                label="Learn more"
                to={service.navigate}
                className="hover:bg-primary-hover bg-gray-100 hover:text-white"
                rightIcon={<ArrowRightIcon className="size-4"></ArrowRightIcon>}
              ></NavButton>
            </div>
          ))}
        </div>
      </div>

      {/* Prices */}
      <div className="space-y-10 px-2 py-20 md:px-10 lg:px-20">
        {/* Title */}
        <div className="space-y-4 text-center">
          <p className="text-4xl font-bold">Transparent pricing, great deals</p>
          <p className="text-xl text-gray-600">
            No hidden fees, no surprises. Just the best prices on the market.
          </p>
        </div>

        {/* Discount announcement */}
        {voucher ? (
          <div className="from-secondary to-fail space-y-4 rounded-xl bg-gradient-to-br p-8 text-center text-white">
            <div className="flex items-center justify-center space-x-1 font-bold">
              <BoltIcon className="size-8"></BoltIcon>
              <p className="text-2xl">Special promotion!</p>
            </div>
            <p className="text-xl">
              Discount up to{" "}
              <span className="text-3xl font-bold">
                {moneyFormat({
                  value: voucher.maxDiscountAmount,
                  countryCode: "vi-VN",
                  currency: "VND",
                })}
              </span>{" "}
              for any domain{" "}
              {/* <span className="font-bold">{domainDiscount.domain}</span> */}
            </p>
            <p className="text-lg">
              Enter code <span className="font-bold">{voucher.code}</span> to
              get this offer!
            </p>
          </div>
        ) : (
          <LoadingSpinner></LoadingSpinner>
        )}

        {/* Domain discount list */}
        {domainSaleList.length === 0 ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <div className="grid grid-cols-1 gap-6 space-y-4 md:grid-cols-2 lg:grid-cols-3">
            <DomainDiscount
              isPopular={false}
              domain={domainSaleList[1].name}
              price={0}
              priceDiscount={domainSaleList[1].basePrice}
              feature={featureList}
            ></DomainDiscount>
            <DomainDiscount
              isPopular={true}
              domain={domainSaleList[0].name}
              price={0}
              priceDiscount={domainSaleList[0].basePrice}
              feature={featureList}
            ></DomainDiscount>
            <DomainDiscount
              isPopular={false}
              domain={domainSaleList[2].name}
              price={0}
              priceDiscount={domainSaleList[2].basePrice}
              feature={featureList}
            ></DomainDiscount>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
