import { SearchForm2 } from "../../components/ui/SearchForm";
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  CartIcon,
  CartPlusIcon,
  CheckIcon,
} from "../../components/icons/Icon";
import { moneyFormat } from "../../utils/Format";
import { Button } from "../../components/ui/Button";
import FindIcon from "../../assets/icons/icons8-find.svg";
import { useEffect } from "react";
import { useToast } from "../../components/context/Toast";
import { searchDomainExtend } from "../../api/domainExtend/domainExtendApi";
import type { domainExtendDto } from "../../api/domainExtend/domainExtendRes";
import {
  transformString,
  keepLettersNumbersHyphen,
} from "../../utils/StringUtil";
import { addToCart } from "../../api/cart/cartApi";
import type { addCartReq } from "../../api/cart/cartReq";
import { useAccount } from "../../components/context/Account";
import { getProfile } from "../../api/account/accountApi";

const Search: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const accountContext = useAccount();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("domain");

  const [searchString, setSearchString] = useState(searchQuery || "");
  const [domainName, setDomainName] = useState<string>("");
  const [domainNameFull, setDomainNameFull] = useState<String>("");
  const [relatedDomainList, setRelatedDomainList] = useState<domainExtendDto[]>(
    [],
  );
  const [domainExtendIdCurrent, setDomainExtendIdCurrent] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [price, setPrice] = useState(0);
  const [isAddToCart, setIsAddToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      if (searchString === "") return;
      const transformedString = transformString(searchString);

      let domainExtendIdData: number = 0;
      let isAvailableData: boolean = false;
      let priceData: number = 0;
      let domainNameData: string = transformedString;
      let domainNameFullData: string = transformedString;

      const domainNameSplit = transformedString.split(".");
      if (domainNameSplit.length > 1) {
        domainNameData = domainNameSplit[domainNameSplit.length - 2];
      }

      const domainSearchData = await searchDomainExtend({
        domainName: transformedString,
        size: 100,
        page: 0,
      });

      if (cancelled) return;
      if (domainSearchData.data) {
        const domainList = domainSearchData.data.content;
        let filtered = domainList;

        if (domainNameSplit.length > 1) {
          for (const domain of domainList) {
            if (
              "." + domainNameSplit[domainNameSplit.length - 1] ===
              domain.name
            ) {
              domainExtendIdData = domain.domainExtendId;
              isAvailableData = true;
              priceData = domain.basePrice;
              filtered = domainList.filter((d) => d.name !== domain.name);
              break;
            }
          }
        } else {
          isAvailableData = true;
          domainNameFullData = transformedString + domainList[0].name;
          domainExtendIdData = domainList[0].domainExtendId;
          priceData = domainList[0].basePrice;
          filtered = domainList.filter((d) => d.name !== domainList[0].name);
        }

        // if (filtered.length === domainList.length) {
        //   isAvailableData = false;

        //   if (domainNameData === domainNameFullData) {
        //     isAvailableData = true;
        //     domainNameFullData = transformedString + domainList[0].name;
        //   }
        //   domainExtendIdData = domainList[0].domainExtendId;
        //   priceData = domainList[0].basePrice;
        //   filtered = domainList.filter((d) => d.name !== domainList[0].name);
        // }
        setDomainName(keepLettersNumbersHyphen(domainNameData));
        setDomainNameFull(keepLettersNumbersHyphen(domainNameFullData));
        setDomainExtendIdCurrent(domainExtendIdData);
        setIsAvailable(isAvailableData);
        setPrice(priceData);
        setRelatedDomainList(filtered);
      }
      if (domainSearchData.error?.status === 401) {
        toast("warning", domainSearchData.error.message);
        navigate("/login");
      } else if (domainSearchData.error) {
        toast("error", domainSearchData.error.message);
      }
    }

    fetch();

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const handleAddToCart = async (domainExtendId: number) => {
    const req: addCartReq = {
      domainName: domainName,
      domainExtendId: domainExtendId,
    };

    const addToCartData = await addToCart(req);
    if (addToCartData.error) {
      if (addToCartData.error.status === 403) {
        navigate("/login");
        toast("warning", "Please log in to add to cart");
      } else if (addToCartData.error?.status === 401) {
        toast("warning", addToCartData.error.message);
        navigate("/login");
      } else if (addToCartData.error) {
        toast("error", addToCartData.error.message);
      }
      return;
    }
    if (domainExtendId === domainExtendIdCurrent) {
      setIsAddToCart(true);
    }
    setRelatedDomainList((prev) =>
      prev.map((item) =>
        item.domainExtendId === domainExtendId
          ? { ...item, isAddToCart: true }
          : item,
      ),
    );

    const profileData = await getProfile();
    if (profileData.error?.status === 401) {
      toast("warning", profileData.error.message);
      navigate("/login");
    } else if (profileData.error) {
      toast("error", profileData.error.message);
    }
    if (profileData.data) {
      accountContext(profileData.data);
    }

    toast("success", addToCartData.message || "Added to cart successfully");
  };

  const onActionIconClick = () => {
    setSearchString("");
  };

  const handleSearch = () => {
    setIsAddToCart(false);
    navigate("/search?domain=" + searchString);
  };

  return (
    <div className="">
      <div className="from-primary to-primary-hover2 space-y-8 bg-gradient-to-br px-4 py-12 md:space-y-10 md:px-10 md:py-16 lg:space-y-12 lg:px-20 lg:py-20">
        {/* Tittle */}
        <p className="text-center text-4xl font-bold text-white md:text-5xl">
          Own your own <span className="text-light-secondary">domain</span>
        </p>

        {/* Search */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg">
            <SearchForm2
              searchString={searchString}
              setSearchString={setSearchString}
              onActionIconClick={() => onActionIconClick()}
              onClick={() => handleSearch()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>
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
                    (isAvailable ? "bg-light-success" : "bg-light-fail")
                  }
                >
                  {isAvailable ? (
                    <CheckIcon className="text-success-hover size-8"></CheckIcon>
                  ) : (
                    <XMarkIcon className="text-fail size-8"></XMarkIcon>
                  )}
                </div>
                <div className="w-full lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-2">
                  <p className="text-3xl font-bold break-all">
                    {domainNameFull}
                  </p>
                  <p
                    className={
                      "text-lg font-medium " +
                      (isAvailable
                        ? "text-success-hover md:w-2/3"
                        : "text-fail")
                    }
                  >
                    {isAvailable
                      ? "Available for registration"
                      : "This domain is already registered"}
                  </p>
                </div>
              </div>
              {isAvailable ? (
                <div className="flex items-center gap-4 lg:col-span-2 lg:justify-end">
                  <div className="text-right">
                    {/* <p className="text-sm text-gray-500 line-through">
                      {moneyFormat({
                        value: resultDomain.price,
                        countryCode: "vi-VN",
                        currency: "VND",
                      })}
                      /year
                    </p> */}
                    <p className="text-primary text-2xl font-bold">
                      {moneyFormat({
                        value: price,
                        countryCode: "vi-VN",
                        currency: "VND",
                      })}
                      /year
                    </p>
                  </div>
                  <div
                    className={
                      "ml-auto " +
                      (isAddToCart && "pointer-events-none opacity-50")
                    }
                  >
                    <div className="hidden md:block lg:ml-0">
                      <Button
                        label="Add to cart"
                        leftIcon={<CartIcon></CartIcon>}
                        onClick={() => handleAddToCart(domainExtendIdCurrent)}
                      ></Button>
                    </div>
                    <div className="md:hidden">
                      <Button
                        leftIcon={<CartPlusIcon></CartPlusIcon>}
                        onClick={() => handleAddToCart(domainExtendIdCurrent)}
                      ></Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center lg:col-span-2">
                  <p className="text-sm text-gray-500 lg:text-right">
                    Not available
                  </p>
                </div>
              )}
            </div>
          )}
      </div>

      <div className="md:px10 space-y-8 bg-gray-50 px-4 py-8 lg:px-20">
        {/* Related domain */}
        {searchQuery !== "" &&
        searchQuery !== undefined &&
        searchQuery !== null ? (
          <div className="space-y-4">
            <p className="text-2xl font-bold break-all">
              Other domain extensions for "{searchQuery}"
            </p>
            <div className="space-y-4">
              {relatedDomainList.map((relatedDomain) => (
                <div
                  key={relatedDomain.domainExtendId}
                  className="flex flex-col gap-y-2 rounded-xl border-2 border-gray-200 bg-white p-6 md:grid md:grid-cols-5 md:items-center"
                >
                  <p className="text-xl font-bold break-all md:col-span-2 lg:col-span-3">
                    {domainName}
                    <span className="text-secondary">{relatedDomain.name}</span>
                  </p>
                  <div className="flex items-center justify-end gap-4 md:col-span-3 lg:col-span-2">
                    <div className="text-right">
                      {/* <p className="text-sm text-gray-500 line-through">
                        {moneyFormat({
                          value: relatedDomain.price,
                          countryCode: "vi-VN",
                          currency: "VND",
                        })}
                        /year
                      </p> */}
                      <p className="text-primary text-2xl font-bold">
                        {moneyFormat({
                          value: relatedDomain.basePrice,
                          countryCode: "vi-VN",
                          currency: "VND",
                        })}
                        /year
                      </p>
                    </div>
                    <div
                      className={
                        "" +
                        (relatedDomain.isAddToCart &&
                          "pointer-events-none opacity-50")
                      }
                    >
                      <div className="hidden md:block">
                        <Button
                          label="Add to cart"
                          leftIcon={<CartIcon></CartIcon>}
                          onClick={() =>
                            handleAddToCart(relatedDomain.domainExtendId)
                          }
                        ></Button>
                      </div>
                      <div className="md:hidden">
                        <Button
                          leftIcon={<CartPlusIcon></CartPlusIcon>}
                          onClick={() =>
                            handleAddToCart(relatedDomain.domainExtendId)
                          }
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl px-4 py-10 shadow-lg">
            <img src={FindIcon}></img>
            <p className="text-lg font-bold">No matching results found</p>
            <p className="text-sm text-gray-500">
              Please enter a domain into the search box
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
