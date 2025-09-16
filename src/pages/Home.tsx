import { useState } from "react";
import { moneyFormat } from "../utils/Format";
import {
  SearchIcon,
  CheckIcon,
  ArrowRightIcon,
  BoltIcon,
  CheckBadgeIcon,
} from "../components/icons/Icon";
import { NavButton } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  domainSaleListSample,
  serviceListSample,
  domainDiscountSample,
  domainDiscountListSample,
} from "./homeData";
import type { iconProps } from "../components/icons/Icon";
import { SearchForm1 } from "../components/ui/SearchForm";

interface domainSaleType {
  id: number;
  domain: string;
  price: number;
  priceSale: number;
}

interface serviceType {
  id: number;
  icon: React.FC<iconProps>;
  title: string;
  description: string;
  feature: string[];
  price: number;
  unitPrice: string;
}

interface domainDiscountType {
  domain: string;
  discount: number;
  expiredDuringDate: number;
}

interface domainDiscountListType {
  id: number;
  domain: string;
  price: number;
  priceDiscount: number;
  feature: string[];
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
            <p>Phổ biến nhất</p>
          </div>
        </div>
      )}
      <p className="text-3xl font-bold">{domain}</p>
      <p className={`text-sm ${priceTextColor} line-through`}>
        {moneyFormat({ value: price, countryCode: "vi-VN", currency: "VND" })}
        /năm
      </p>
      <p className="text-4xl font-bold">
        {moneyFormat({
          value: priceDiscount,
          countryCode: "vi-VN",
          currency: "VND",
        })}
        <span className="text-lg font-normal">/năm</span>
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
          label="Đăng ký ngay"
          to="/register"
          className="text-primary bg-white font-medium hover:bg-gray-100"
        ></NavButton>
      ) : (
        <NavButton label="Đăng ký ngay" to="/register"></NavButton>
      )}
    </div>
  );
};

const Home = () => {
  const [domainSaleList, setDomainSaleList] =
    useState<domainSaleType[]>(domainSaleListSample);

  const [serviceList, setServiceList] =
    useState<serviceType[]>(serviceListSample);

  const [searchString, setSearchString] = useState("");
  const [domainDiscount, setDomainDiscount] =
    useState<domainDiscountType>(domainDiscountSample);
  const [domainDiscountList, setDomainDiscountList] = useState<
    domainDiscountListType[]
  >(domainDiscountListSample);

  return (
    <>
      {/* Search */}
      <div className="from-primary to-primary-hover2 bg-gradient-to-br px-2 py-20 md:px-10 lg:px-20">
        <div className="flex flex-col items-center space-y-8">
          {/* Title */}
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Tìm tên miền <p className="text-light-secondary">hoàn hảo</p> cho
            doanh nghiệp
          </h1>
          <p className="text-center text-xl text-white lg:text-2xl">
            Đăng ký tên miền với giá tốt nhất. Hơn 500+ đuôi tên miền để lựa
            chọn.
          </p>

          {/* Search form */}
          <SearchForm1
            searchString={searchString}
            setSearchString={setSearchString}
            navigate={"/search?domain=" + searchString}
            onActionIconClick={() => setSearchString("")}
          ></SearchForm1>
          {/* <div className="w-full max-w-4xl rounded-xl bg-white p-6">
            <form className="space-y-4 md:flex md:gap-4 md:space-y-0">
              <Input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Nhập tên miền bạn muốn tìm..."
                className="focus-within:border-primary focus-within:ring-primary flex-1 border border-gray-200 focus-within:ring-2 lg:px-6 lg:py-4"
              ></Input>
              <NavButton
                label="Tìm kiếm"
                to="/search"
                leftIcon={<SearchIcon className="size-6"></SearchIcon>}
                className="bg-primary hover:bg-primary-hover text-lg text-white lg:px-6"
              />
            </form>
          </div> */}

          {/* Domain on sale */}
          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {domainSaleList.map((domainSaleItem) => (
              <div
                key={domainSaleItem.id}
                className="flex w-full flex-col items-center rounded-xl bg-white/10 py-4 text-lg font-bold transition-colors duration-300 hover:bg-white/20"
              >
                <span className="text-white">{domainSaleItem.domain}</span>
                <span className="text-sm font-normal text-white line-through">
                  {moneyFormat({
                    value: domainSaleItem.price,
                    countryCode: "vi-VN",
                    currency: "VND",
                  })}
                </span>
                <span className="text-sixth">
                  {moneyFormat({
                    value: domainSaleItem.priceSale,
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
          <p className="text-4xl font-bold">Dịch vụ chuyên nghiệp</p>
          <p className="text-xl text-gray-600">
            Chúng tôi cung cấp đầy đủ các dịch vụ cần thiết để xây dựng và phát
            triển sự hiện diện trực tuyến của bạn.
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
                Từ &nbsp;
                {moneyFormat({
                  value: service.price,
                  countryCode: "vi-VN",
                  currency: "VND",
                })}
                {"/"}
                {service.unitPrice}
              </p>
              <NavButton
                label="Tìm hiểu thêm"
                to="/register"
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
          <p className="text-4xl font-bold">Giá cả minh bạch, ưu đãi hấp dẫn</p>
          <p className="text-xl text-gray-600">
            Không có phí ẩn, không có chi phí bất ngờ. Chỉ có giá tốt nhất thị
            trường.
          </p>
        </div>

        {/* Discount announcement */}
        <div className="from-secondary to-fail space-y-4 rounded-xl bg-gradient-to-br p-8 text-center text-white">
          <div className="flex items-center justify-center space-x-1 font-bold">
            <BoltIcon className="size-8"></BoltIcon>
            <p className="text-2xl">Khuyến mãi đặc biệt!</p>
          </div>
          <p className="text-xl">
            Giảm giá lên đến{" "}
            <span className="text-3xl font-bold">
              {domainDiscount.discount}%
            </span>{" "}
            cho tên miền{" "}
            <span className="font-bold">{domainDiscount.domain}</span>
          </p>
          <p className="text-lg">
            Chỉ còn{" "}
            <span className="font-bold">
              {domainDiscount.expiredDuringDate} ngày
            </span>{" "}
            để nhận ưu đãi này!
          </p>
        </div>

        {/* Domain discount list */}
        <div className="grid grid-cols-1 gap-6 space-y-4 md:grid-cols-2 lg:grid-cols-3">
          <DomainDiscount
            isPopular={false}
            domain={domainDiscountListSample[1].domain}
            price={domainDiscountListSample[1].price}
            priceDiscount={domainDiscountListSample[1].priceDiscount}
            feature={domainDiscountListSample[1].feature}
          ></DomainDiscount>
          <DomainDiscount
            isPopular={true}
            domain={domainDiscountListSample[0].domain}
            price={domainDiscountListSample[0].price}
            priceDiscount={domainDiscountListSample[0].priceDiscount}
            feature={domainDiscountListSample[0].feature}
          ></DomainDiscount>
          <DomainDiscount
            isPopular={false}
            domain={domainDiscountListSample[2].domain}
            price={domainDiscountListSample[2].price}
            priceDiscount={domainDiscountListSample[2].priceDiscount}
            feature={domainDiscountListSample[2].feature}
          ></DomainDiscount>
        </div>
      </div>
    </>
  );
};

export default Home;
