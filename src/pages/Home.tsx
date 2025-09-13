import { useState } from "react";
import { moneyFormat } from "../utils/Format";
import {
  SearchIcon,
  CheckIcon,
  ArrowRightIcon,
  GlobeIcon,
  ServerIcon,
  ShieldIcon,
  EnvelopeIcon,
} from "../components/icons/Icon";
import { NavButton } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

type domainSaleType = {
  id: number;
  domain: string;
  price: number;
  priceSale: number;
};

type serviceType = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  feature: string[];
  price: number;
  unitPrice: string;
};

const Home = () => {
  const [domainSaleList, setDomainSaleList] = useState<domainSaleType[]>([
    {
      id: 1,
      domain: ".com",
      price: 399000,
      priceSale: 299000,
    },
    {
      id: 2,
      domain: ".net",
      price: 449000,
      priceSale: 349000,
    },
    {
      id: 3,
      domain: ".vn",
      price: 799000,
      priceSale: 599000,
    },
    {
      id: 4,
      domain: ".org",
      price: 429000,
      priceSale: 329000,
    },
    {
      id: 5,
      domain: ".info",
      price: 299000,
      priceSale: 199000,
    },
    {
      id: 5,
      domain: ".xyz",
      price: 199000,
      priceSale: 99000,
    },
  ]);

  const [serviceList, setServiceList] = useState<serviceType[]>([
    {
      id: 1,
      icon: <GlobeIcon className="size-8"></GlobeIcon>,
      title: "Đăng ký tên miền",
      description:
        "Đăng ký tên miền với hơn 500+ đuôi tên miền khác nhau. Giá cả cạnh tranh, dịch vụ chuyên nghiệp.",
      feature: ["Hỗ trợ 24/7", "DNS miễn phí", "Chuyển đổi dễ dàng"],
      price: 99000,
      unitPrice: "năm",
    },
    {
      id: 2,
      icon: <ServerIcon className="size-8"></ServerIcon>,
      title: "Web Hosting",
      description:
        "Hosting tốc độ cao với SSD, băng thông không giới hạn và uptime 99.9%.",
      feature: ["SSD NVMe", "SSL miễn phí", "Backup tự động"],
      price: 199000,
      unitPrice: "tháng",
    },
    {
      id: 3,
      icon: <ShieldIcon className="size-8"></ShieldIcon>,
      title: "Chứng chỉ SSL",
      description:
        "Bảo mật website với chứng chỉ SSL từ các nhà cung cấp uy tín hàng đầu thế giới.",
      feature: ["Mã hóa 256-bit", "Cài đặt tự động", "Bảo hành 100%"],
      price: 299000,
      unitPrice: "năm",
    },
    {
      id: 4,
      icon: <EnvelopeIcon className="size-8"></EnvelopeIcon>,
      title: "Email doanh nghiệp",
      description:
        "Email chuyên nghiệp với tên miền riêng, dung lượng lớn và bảo mật cao.",
      feature: ["50GB dung lượng", "Anti-spam", "Đồng bộ đa thiết bị"],
      price: 99000,
      unitPrice: "tháng",
    },
  ]);

  const [searchString, setSearchString] = useState("");

  return (
    <>
      {/* Search */}
      <div className="from-primary to-primary-hover2 bg-gradient-to-br px-2 py-20">
        <div className="flex flex-col items-center space-y-8">
          {/* Title */}
          <h1 className="text-center text-4xl font-bold text-white">
            Tìm tên miền <p className="text-light-secondary">hoàn hảo</p> cho
            doanh nghiệp
          </h1>
          <p className="text-center text-xl text-white">
            Đăng ký tên miền với giá tốt nhất. Hơn 500+ đuôi tên miền để lựa
            chọn.
          </p>

          {/* Search form */}
          <div className="w-full rounded-lg bg-white p-6">
            <form className="flex flex-col space-y-4">
              <Input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Nhập tên miền bạn muốn tìm..."
                className="focus-within:border-primary focus-within:ring-primary border border-gray-200 focus-within:ring-2"
              ></Input>
              <NavButton
                label="Tìm kiếm"
                to="/search"
                leftIcon={<SearchIcon className="size-6"></SearchIcon>}
                className="bg-primary hover:bg-primary-hover text-lg text-white"
              />
            </form>
          </div>

          {/* Domain on sale */}
          <div className="grid w-full grid-cols-2 gap-4">
            {domainSaleList.map((domainSaleItem) => (
              <div
                key={domainSaleItem.id}
                className="flex w-full flex-col items-center rounded-lg bg-white/10 py-4 text-lg font-bold transition-colors duration-300 hover:bg-white/20"
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
      <div className="bg-gray-50 px-2 py-20">
        {/* Title */}
        <div className="flex flex-col space-y-4 pb-16 text-center">
          <p className="text-4xl font-bold">Dịch vụ chuyên nghiệp</p>
          <p className="text-xl text-gray-600">
            Chúng tôi cung cấp đầy đủ các dịch vụ cần thiết để xây dựng và phát
            triển sự hiện diện trực tuyến của bạn.
          </p>
        </div>

        {/* Service list */}
        <div className="grid grid-cols-1 gap-8">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col space-y-4 rounded-lg bg-white p-8 shadow-lg transition-discrete duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-primary-hover group-hover:bg-primary-hover bg-light-primary2 w-fit rounded-lg p-4 transition-colors duration-300 group-hover:text-white">
                {service.icon}
              </div>
              <p className="text-xl font-bold">{service.title}</p>
              <p className="text-gray-600">{service.description}</p>
              <ul className="space-y-2">
                {service.feature.map((feature: string, index: number) => (
                  <li key={feature} className="flex items-center space-x-1">
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
    </>
  );
};

export default Home;
