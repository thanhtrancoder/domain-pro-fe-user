import { Input } from "../../components/ui/Input";
import {
  SearchIcon,
  GlobeIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  LockOpenIcon,
  LockClosedIcon,
  FunnelIcon,
  SortIcon,
  XMarkIcon,
} from "../../components/icons/Icon";
import { Button, SquareButton } from "../../components/ui/Button";
import { searchDomainListTemp } from "./domainsData";
import type { domainType } from "./domainsData";
import { useState, useEffect } from "react";
import { Pagination, PaginationMini } from "../../components/ui/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  searchDomainName,
  updateDomainName,
} from "../../api/domainName/domainNameApi";
import { useToast } from "../../components/context/Toast";
import type { domainNameDto } from "../../api/domainName/domainNameRes";
import {
  statusDomainName,
  statusDomainNameToNumber,
} from "../../utils/StatusUtil";
import { formatDate } from "../../utils/Format";
import Loading from "../../components/layout/Loading";
import { Popup } from "../../components/ui/Popup";
import { usePopup } from "../../components/context/PopupContext";

const Domains: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const popupContext = usePopup();

  const [searchDomainList, setSearchDomainList] = useState<domainNameDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("expires_at,desc");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [domainNameCurrent, setDomainNameCurrent] = useState<domainNameDto>();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   let canceled = false;

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }

  //   return () => {
  //     canceled = true;
  //   };
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const searchQuery = searchParams.get("keyword") || "";
    setSearchKey(searchQuery);
    const filterQuery = searchParams.get("filter") || "";
    setFilter(filterQuery);
    const sortQuery = searchParams.get("sort") || "expires_at,desc";
    setSort(sortQuery);
    const pageQuery = Number(searchParams.get("page") || 1);
    setCurrentPage(pageQuery);

    async function fetch() {
      setLoading(true);
      const domainNameResponse = await searchDomainName({
        size: 10,
        page: pageQuery - 1,
        sort: sortQuery,
        keyword: searchQuery,
        status: statusDomainNameToNumber(filterQuery),
      });
      if (canceled) {
        return;
      }
      if (domainNameResponse.error?.status === 401) {
        toast("warning", domainNameResponse.error.message);
        navigate("/login");
      } else if (domainNameResponse.error) {
        toast("error", domainNameResponse.error.message);
        setLoading(false);
      } else {
        setSearchDomainList(domainNameResponse.data?.content || []);
        setTotalPages(domainNameResponse.data?.page.totalPages || 1);
        setCurrentPage((domainNameResponse.data?.page.number || 0) + 1);
        setTotalElements(domainNameResponse.data?.page.totalElements || 0);
        setLoading(false);
      }
    }

    fetch();

    return () => {
      canceled = true;
    };
  }, [searchParams]);

  const handleNavigate = () => {
    let keyQuery = "keyword=" + searchKey;
    if (searchKey === "") {
      keyQuery = "";
    }
    let filterQuery = "filter=" + filter;
    if (filter === "") {
      filterQuery = "filter=all";
    }
    const sortQuery = "sort=" + sort;
    const pageQuery = "page=" + currentPage;
    navigate(
      `/dashboard/domains?${keyQuery}&${filterQuery}&${sortQuery}&${pageQuery}`,
    );
  };

  useEffect(() => {
    handleNavigate();
  }, [currentPage, filter, sort]);

  useEffect(() => {
    setSearchDomainList((prev) =>
      prev.map((item) => ({
        ...item,
        isChecked: isChecked,
      })),
    );
  }, [isChecked]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    handleNavigate();
  };

  const handleDomainDetail = (domainId: number) => {
    navigate(`${domainId}`);
  };

  const handleConfirmChangeBlockDomain = (domainName: domainNameDto) => {
    setShowPopup(true);
    popupContext(true);
    setDomainNameCurrent(domainName);
  };

  const handleChangeBlockDomain = async (confirm: boolean) => {
    if (confirm) {
      const updateDomainNameResponse = await updateDomainName({
        domainNameId: domainNameCurrent?.domainNameId || 0,
        isAutoRenewal: domainNameCurrent?.isAutoRenewal || false,
        isBlock: !domainNameCurrent?.isBlock,
      });
      if (updateDomainNameResponse.error?.status === 401) {
        toast("warning", updateDomainNameResponse.error.message);
        navigate("/login");
      } else if (updateDomainNameResponse.error) {
        toast("error", updateDomainNameResponse.error.message);
      } else {
        setSearchDomainList((prev) =>
          prev.map((item) => {
            if (item.domainNameId === domainNameCurrent?.domainNameId) {
              return {
                ...item,
                isBlock: !item.isBlock,
              };
            }
            return item;
          }),
        );
        toast("success", updateDomainNameResponse.message);
      }
    }
    setShowPopup(false);
    popupContext(false);
  };

  const handleCheckboxChange = (
    domainNameId: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchDomainList((prev) =>
      prev.map((item) => {
        if (item.domainNameId === domainNameId) {
          return {
            ...item,
            isChecked: e.target.checked,
          };
        }
        return item;
      }),
    );
  };

  return (
    <Popup
      title="Confirmation"
      content={
        domainNameCurrent?.isBlock
          ? "Are you sure you want to unlock this domain?"
          : "Are you sure you want to lock this domain?"
      }
      value={
        domainNameCurrent?.domainName ||
        "" + domainNameCurrent?.domainExtend ||
        ""
      }
      isShow={showPopup}
      onConfirm={handleChangeBlockDomain}
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Input
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search domains..."
              icon={<SearchIcon className="size-6 text-gray-400"></SearchIcon>}
              className="focus-within:ring-primary-hover w-full border border-gray-300 focus-within:border-transparent focus-within:ring-2"
              actionIcon={
                <XMarkIcon className="size-6 cursor-pointer text-gray-400"></XMarkIcon>
              }
              onActionIconClick={() => {
                setSearchKey("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <div className="ml-auto">
              <Button label="Search" onClick={handleSearch}></Button>
            </div>
          </div>
          <div className="space-y-4 md:flex md:items-center md:gap-4 md:space-y-0">
            <div className="flex items-center gap-2">
              <FunnelIcon className="size-6 text-gray-500"></FunnelIcon>
              <select
                className="focus:ring-primary-hover rounded-xl border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="expiring">Expiring soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <SortIcon className="size-6 text-gray-500"></SortIcon>
              <select
                className="focus:ring-primary-hover rounded-xl border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="domain_name,asc">Name: A-Z</option>
                <option value="domain_name,desc">Name: Z-A</option>
                <option value="expires_at,asc">
                  Expiration date: Ascending
                </option>
                <option value="expires_at,desc">
                  Expiration date: Descending
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="overflow-hidden rounded-xl bg-white pt-6 shadow-lg">
          <div className="flex items-center px-6 pb-6">
            <h3 className="text-xl font-bold">My domains ({totalElements})</h3>
            <div className="ml-auto">
              <PaginationMini
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              ></PaginationMini>
            </div>
          </div>

          <Loading loading={loading}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-6">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="size-4"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        ></input>
                        {/* {isChecked && <p>({searchDomainList.length})</p>} */}
                      </div>
                    </th>
                    <th className="p-6">Domain</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Expiration date</th>
                    <th className="p-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {searchDomainList.map((domain) => (
                    <tr key={domain.domainNameId} className="hover:bg-gray-50">
                      <td className="p-6">
                        <input
                          type="checkbox"
                          className="size-4"
                          checked={!!domain.isChecked}
                          onChange={(e) =>
                            handleCheckboxChange(domain.domainNameId || 0, e)
                          }
                        ></input>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <GlobeIcon className="text-primary-hover size-5 shrink-0"></GlobeIcon>
                          <div>
                            <p className="font-medium">
                              {(domain?.domainName || "") +
                                (domain?.domainExtend || "")}
                            </p>
                            {domain?.isAutoRenewal && (
                              <div className="text-success-hover2 flex items-center gap-1">
                                <ArrowPathIcon className="size-4"></ArrowPathIcon>
                                <p className="text-sm">Auto-renewal</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-medium">
                        {statusDomainName(domain.status || 0) === "active" ? (
                          <p className="text-success-hover2 bg-light-success w-fit rounded-full px-3 py-1">
                            Active
                          </p>
                        ) : statusDomainName(domain.status || 0) ===
                          "expiring" ? (
                          <p className="text-warning bg-lightest-warning w-fit rounded-full px-3 py-1">
                            Expiring soon
                          </p>
                        ) : (
                          <p className="text-fail bg-light-fail w-fit rounded-full px-3 py-1">
                            Expired
                          </p>
                        )}
                      </td>
                      <td className="p-6">
                        {formatDate(domain.expiresAt || "")}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <SquareButton
                            leftIcon={
                              <Cog6ToothIcon className="text-third size-4"></Cog6ToothIcon>
                            }
                            className="hover:bg-light-third"
                            onClick={() =>
                              handleDomainDetail(domain.domainNameId || 0)
                            }
                          ></SquareButton>
                          <SquareButton
                            leftIcon={
                              domain.isBlock ? (
                                <LockClosedIcon className="size-4"></LockClosedIcon>
                              ) : (
                                <LockOpenIcon className="size-4"></LockOpenIcon>
                              )
                            }
                            className="hover:bg-gray-200"
                            onClick={() =>
                              handleConfirmChangeBlockDomain(domain)
                            }
                          ></SquareButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Loading>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          ></Pagination>
        </div>
      </div>
    </Popup>
  );
};

export default Domains;
