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
} from "../../components/icons/Icon";
import { Button, SquareButton } from "../../components/ui/Button";
import { searchDomainListTemp } from "./domainsData";
import type { domainType } from "./domainsData";
import { useState } from "react";
import { Pagination, PaginationMini } from "../../components/ui/Pagination";

const Domains: React.FC = () => {
  const [searchDomainList, setSearchDomainList] =
    useState<domainType[]>(searchDomainListTemp);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Tìm kiếm tên miền..."
            icon={<SearchIcon className="size-6 text-gray-400"></SearchIcon>}
            className="focus-within:ring-primary-hover w-full border border-gray-300 focus-within:border-transparent focus-within:ring-2"
          />
          <div className="ml-auto">
            <Button label="Tìm kiếm"></Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FunnelIcon className="size-6 text-gray-500"></FunnelIcon>
            <select className="focus:ring-primary-hover rounded-xl border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2">
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="expiring">Sắp hết hạn</option>
              <option value="expired">Đã hết hạn</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <SortIcon className="size-6 text-gray-500"></SortIcon>
            <select className="focus:ring-primary-hover rounded-xl border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2">
              <option value="nameAZ">Tên: A-Z</option>
              <option value="nameZA">Tên: Z-A</option>
              <option value="expiredDateAsc">Ngày hết hạn: Tăng dần</option>
              <option value="expiredDateDesc">Ngày hết hạn: Giảm dần</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="overflow-hidden rounded-xl bg-white pt-6 shadow-lg">
        <div className="flex items-center px-6 pb-6">
          <h3 className="text-xl font-bold">Tên miền của tôi (4)</h3>
          <div className="ml-auto">
            <PaginationMini
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            ></PaginationMini>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-6">
                  <input type="checkbox" className="size-4"></input>
                </th>
                <th className="p-6">Tên miền</th>
                <th className="p-6">Trạng thái</th>
                <th className="p-6">Ngày hết hạn</th>
                <th className="p-6">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {searchDomainList.map((domain) => (
                <tr key={domain.id} className="hover:bg-gray-50">
                  <td className="p-6">
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={domain.isChecked}
                    ></input>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <GlobeIcon className="text-primary-hover size-5 shrink-0"></GlobeIcon>
                      <div>
                        <p className="font-medium">{domain.name}</p>
                        {domain.isAutoRenew && (
                          <div className="text-success-hover2 flex items-center gap-1">
                            <ArrowPathIcon className="size-4"></ArrowPathIcon>
                            <p className="text-sm">Tự động gia hạn</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium">
                    {domain.status === "active" ? (
                      <p className="text-success-hover2 bg-light-success w-fit rounded-full px-3 py-1">
                        Đang hoạt động
                      </p>
                    ) : domain.status === "expiring" ? (
                      <p className="text-warning bg-lightest-warning w-fit rounded-full px-3 py-1">
                        Sắp hết hạn
                      </p>
                    ) : (
                      <p className="text-fail bg-light-fail w-fit rounded-full px-3 py-1">
                        Đã hết hạn
                      </p>
                    )}
                  </td>
                  <td className="p-6">{domain.expiredDate}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <SquareButton
                        leftIcon={
                          <Cog6ToothIcon className="text-third size-4"></Cog6ToothIcon>
                        }
                        className="hover:bg-light-third"
                      ></SquareButton>
                      <SquareButton
                        leftIcon={
                          domain.isBlocked ? (
                            <LockClosedIcon className="size-4"></LockClosedIcon>
                          ) : (
                            <LockOpenIcon className="size-4"></LockOpenIcon>
                          )
                        }
                        className="hover:bg-gray-200"
                      ></SquareButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  );
};

export default Domains;
