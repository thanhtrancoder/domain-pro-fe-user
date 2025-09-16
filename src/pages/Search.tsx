import { SearchForm1 } from "../components/ui/SearchForm";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  CartIcon,
  CartPlusIcon,
  CheckIcon,
} from "../components/icons/Icon";
import { relatedDomainSample, resultDomainSample } from "./searchData";
import type { relatedDomainType, resultDomainType } from "./searchData";
import { moneyFormat } from "../utils/Format";
import { Button } from "../components/ui/Button";
import FindIcon from "../assets/icons/icons8-find.svg";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("domain");
  const [searchString, setSearchString] = useState(searchQuery || "");
  const [relatedDomainList, setRelatedDomainList] =
    useState<relatedDomainType[]>(relatedDomainSample);
  const [resultDomain, setResultDomain] =
    useState<resultDomainType>(resultDomainSample);
  const navigate = useNavigate();

  const onActionIconClick = () => {
    setSearchString("");
    navigate("/search");
  };

  return (
    <div className="">
      <div className="from-primary to-primary-hover2 space-y-8 bg-gradient-to-br px-4 py-12 md:space-y-10 md:px-10 md:py-16 lg:space-y-12 lg:px-14 lg:py-20">
        {/* Tittle */}
        <p className="text-center text-4xl font-bold text-white md:text-5xl">
          Sở hữu <span className="text-light-secondary">tên miền</span> riêng
          của bạn
        </p>

        {/* Search */}
        <div className="flex w-full items-center justify-center">
          <SearchForm1
            searchString={searchString}
            setSearchString={setSearchString}
            navigate={"/search?domain=" + searchString}
            onActionIconClick={() => onActionIconClick()}
          />
        </div>

        {/* Result */}
        {searchQuery !== "" &&
          searchQuery !== undefined &&
          searchQuery !== null && (
            <div className="flex flex-col gap-4 rounded-xl bg-white px-15 py-8 shadow-lg lg:grid lg:grid-cols-5">
              <div className="flex items-center gap-4 lg:col-span-3">
                <div
                  className={
                    "flex aspect-square h-14 w-14 items-center justify-center rounded-full " +
                    (resultDomain.isAvailable
                      ? "bg-light-success"
                      : "bg-light-fail")
                  }
                >
                  {resultDomain.isAvailable ? (
                    <CheckIcon className="text-success-hover size-8"></CheckIcon>
                  ) : (
                    <XMarkIcon className="text-fail size-8"></XMarkIcon>
                  )}
                </div>
                <div className="w-full lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-2">
                  <p className="text-3xl font-bold break-all">{searchQuery}</p>
                  <p
                    className={
                      "text-lg font-medium " +
                      (resultDomain.isAvailable
                        ? "text-success-hover md:w-2/3"
                        : "text-fail")
                    }
                  >
                    {resultDomain.isAvailable
                      ? "Có sẵn để đăng ký"
                      : "Tên miền này đã được đăng ký"}
                  </p>
                </div>
              </div>
              {resultDomain.isAvailable ? (
                <div className="flex items-center gap-4 lg:col-span-2 lg:justify-end">
                  <div className="text-right">
                    <p className="text-sm text-gray-500 line-through">
                      {moneyFormat({
                        value: resultDomain.price,
                        countryCode: "vi-VN",
                        currency: "VND",
                      })}
                      /năm
                    </p>
                    <p className="text-primary text-2xl font-bold">
                      {moneyFormat({
                        value: resultDomain.priceDiscount,
                        countryCode: "vi-VN",
                        currency: "VND",
                      })}
                      /năm
                    </p>
                  </div>
                  <div className="ml-auto hidden md:block lg:ml-0">
                    <Button
                      label="Thêm vào giỏ hàng"
                      leftIcon={<CartIcon></CartIcon>}
                    ></Button>
                  </div>
                  <div className="ml-auto md:hidden">
                    <Button leftIcon={<CartPlusIcon></CartPlusIcon>}></Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center lg:col-span-2">
                  <p className="text-sm text-gray-500 lg:text-right">
                    Không khả dụng
                  </p>
                </div>
              )}
            </div>
          )}
      </div>

      <div className="md:px10 space-y-8 bg-gray-50 px-4 py-8 lg:px-14">
        {/* Related domain */}
        {searchQuery !== "" &&
        searchQuery !== undefined &&
        searchQuery !== null ? (
          <div className="space-y-4">
            <p className="text-2xl font-bold break-all">
              Các đuôi tên miền khác cho "{searchQuery}"
            </p>
            <div className="space-y-4">
              {relatedDomainList.map((relatedDomain) => (
                <div
                  key={relatedDomain.id}
                  className="flex flex-col gap-y-2 rounded-xl border-2 border-gray-200 bg-white p-6 md:grid md:grid-cols-5 md:items-center"
                >
                  <p className="text-xl font-bold break-all md:col-span-2 lg:col-span-3">
                    {searchQuery}
                    <span className="text-secondary">
                      {relatedDomain.domain}
                    </span>
                  </p>
                  <div className="flex items-center justify-end gap-2 md:col-span-3 lg:col-span-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 line-through">
                        {moneyFormat({
                          value: relatedDomain.price,
                          countryCode: "vi-VN",
                          currency: "VND",
                        })}
                        /năm
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {moneyFormat({
                          value: relatedDomain.priceDiscount,
                          countryCode: "vi-VN",
                          currency: "VND",
                        })}
                        /năm
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <Button
                        label="Thêm vào giỏ hàng"
                        leftIcon={<CartIcon></CartIcon>}
                      ></Button>
                    </div>
                    <div className="md:hidden">
                      <Button leftIcon={<CartPlusIcon></CartPlusIcon>}></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl px-4 py-10 shadow-lg">
            <img src={FindIcon}></img>
            <p className="text-lg font-bold">Không tìm thấy kết quả phù hợp</p>
            <p className="text-sm text-gray-500">
              Vui lòng nhập tên miền vào ô tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
