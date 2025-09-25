import { Input } from "../../components/ui/Input";
import {
  SearchIcon,
  GlobeIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  LockOpenIcon,
  LockClosedIcon,
} from "../../components/icons/Icon";
import { Button, SquareButton } from "../../components/ui/Button";
import { searchDomainListTemp } from "./domainsData";
import type { domainType } from "./domainsData";
import { useState } from "react";

const Domains: React.FC = () => {
  const [searchDomainList, setSearchDomainList] =
    useState<domainType[]>(searchDomainListTemp);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
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
      </div>

      {/* Results */}
      <div className="rounded-xl bg-white pt-6 shadow-lg">
        <h3 className="px-6 pb-6 text-xl font-bold">Tên miền của tôi (4)</h3>
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
    </div>
  );
};

export default Domains;
