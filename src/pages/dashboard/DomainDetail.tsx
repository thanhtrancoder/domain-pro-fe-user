import { useParams, useNavigate } from "react-router-dom";
import { Button, NavButton, SquareButton } from "../../components/ui/Button";
import {
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  ClockIcon,
  LockClosedIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ServerIcon,
  PlusIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
} from "../../components/icons/Icon";
import type { iconProps } from "../../components/icons/Icon";
import { formatDate, moneyFormat } from "../../utils/Format";
import { useEffect, useState } from "react";
import { Input, ToggleSwitch } from "../../components/ui/Input";
import {
  getDomainNameDetail,
  updateDomainName,
} from "../../api/domainName/domainNameApi";
import { useToast } from "../../components/context/Toast";
import type { domainNameDto } from "../../api/domainName/domainNameRes";
import {
  getAllDnsConfig,
  matchDnsConfig,
} from "../../api/dnsConfig/dnsConfigApi";
import type { dnsConfigDto } from "../../api/dnsConfig/dnsConfigRes";

interface infoItemProps {
  Icon: React.FC<iconProps>;
  label: string;
  value: string;
}

const InfoItem: React.FC<infoItemProps> = ({ Icon, label, value }) => {
  return (
    <div className="space-y-1 rounded-xl border border-gray-300 p-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Icon className="size-5"></Icon>
        <p>{label}</p>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
};

const LabelStatus: React.FC<{ status: number }> = ({ status }) => {
  return (
    <div>
      {status === 1 && (
        <p className="bg-light-success text-success-hover2 rounded-full px-3 py-1 font-medium">
          Active
        </p>
      )}
      {status === 2 && (
        <p className="bg-tint-warning text-warning rounded-full px-3 py-1 font-medium">
          Expiring
        </p>
      )}
      {status === 3 && (
        <p className="bg-tint-fail text-fail rounded-full px-3 py-1 font-medium">
          Expired
        </p>
      )}
    </div>
  );
};

const DomainDetail: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { domainId } = useParams<{ domainId: string }>();

  const [recordList, setRecordList] = useState<dnsConfigDto[]>([]);
  const [oldRecordList, setOldRecordList] = useState<dnsConfigDto[]>([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [domainNameDetail, setDomainNameDetail] =
    useState<domainNameDto | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    if (!domainId) {
      navigate("/domains");
    }

    async function fetch() {
      const domainNameDetail = await getDomainNameDetail(domainId || "");
      if (canceled) {
        return;
      }
      if (domainNameDetail.error?.status === 401) {
        toast("warning", domainNameDetail.error.message);
        navigate("/login");
      } else if (domainNameDetail.error) {
        toast("error", domainNameDetail.error.message);
      } else {
        setDomainNameDetail(domainNameDetail.data);
      }

      const dnsConfigList = await getAllDnsConfig(domainId || "");
      if (canceled) {
        return;
      }
      if (dnsConfigList.error?.status === 401) {
        toast("warning", dnsConfigList.error.message);
        navigate("/login");
      } else if (dnsConfigList.error) {
        toast("error", dnsConfigList.error.message);
      } else {
        const recordList = dnsConfigList.data?.content.map((item) => {
          return {
            ...item,
            virtualId: item.dnsConfigId,
          };
        });
        setRecordList(recordList || []);
        setOldRecordList(recordList || []);
      }
    }

    fetch();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (JSON.stringify(recordList) !== JSON.stringify(oldRecordList)) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [recordList]);

  const handleAutoRenewChange = async () => {
    const isAutoRenewal = !domainNameDetail?.isAutoRenewal;
    const updateDomainNameResponse = await updateDomainName({
      domainNameId: domainNameDetail?.domainNameId || 0,
      isAutoRenewal: isAutoRenewal,
      isBlock: domainNameDetail?.isBlock,
    });
    if (updateDomainNameResponse.error?.status === 401) {
      toast("warning", updateDomainNameResponse.error.message);
      navigate("/login");
    } else if (updateDomainNameResponse.error) {
      toast("error", updateDomainNameResponse.error.message);
    } else {
      setDomainNameDetail((prev) => ({
        ...prev,
        isAutoRenewal: isAutoRenewal,
      }));
      toast("success", updateDomainNameResponse.message);
    }
  };

  const handleRecordTypeChange = (recordId: number, type: string) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.virtualId === recordId ? { ...record, type: type } : record,
      ),
    );
  };

  const handleRecordNameChange = (recordId: number, name: string) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.virtualId === recordId ? { ...record, host: name } : record,
      ),
    );
  };

  const handleRecordValueChange = (recordId: number, value: string) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.virtualId === recordId ? { ...record, value: value } : record,
      ),
    );
  };

  const handleRecordTTLChange = (recordId: number, ttl: number) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.virtualId === recordId ? { ...record, ttl: ttl } : record,
      ),
    );
  };

  const handleAddRecord = () => {
    let newRecordId = 0;
    if (recordList.length === 0) {
      newRecordId = 1;
    } else {
      newRecordId = (recordList[recordList?.length - 1].virtualId || 0) + 1;
    }
    setRecordList((prevRecordList) => {
      const newRecord: dnsConfigDto = {
        virtualId: newRecordId,
        dnsConfigId: null,
        domainNameId: domainNameDetail?.domainNameId || 0,
        type: "A",
        host: "",
        value: "",
        ttl: 3600,
      };
      return [...prevRecordList, newRecord];
    });
  };

  const handleDeleteRecord = (recordId: number) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.virtualId === recordId
          ? {
              ...record,
              domainNameId: null,
            }
          : record,
      ),
    );
  };

  const handleRenewal = () => {
    navigate("/coming-soon");
  };

  const handleUpdateDnsConfig = async () => {
    const recordListTemp = recordList.filter(
      (record) => record.domainNameId !== null || record.dnsConfigId !== null,
    );

    if (JSON.stringify(recordListTemp) === JSON.stringify(oldRecordList)) {
      toast("warning", "No record changes.");
      return;
    }

    const matchDnsConfigResponse = await matchDnsConfig({
      domainNameId: domainNameDetail?.domainNameId || 0,
      dnsConfigs: recordListTemp,
    });
    if (matchDnsConfigResponse.error?.status === 401) {
      toast("warning", matchDnsConfigResponse.error.message);
      navigate("/login");
    } else if (matchDnsConfigResponse.error) {
      toast("error", matchDnsConfigResponse.error.message);
    } else {
      const recordListNew = matchDnsConfigResponse.data?.content.map((item) => {
        return {
          ...item,
          virtualId: item.dnsConfigId,
        };
      });
      setRecordList(recordListNew || []);
      setOldRecordList(recordListNew || []);
      setShowSaveButton(false);
      toast("success", matchDnsConfigResponse.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center">
        <Button
          leftIcon={<ArrowLeftIcon></ArrowLeftIcon>}
          className="hover:text-primary-hover"
          onClick={() => navigate(-1)}
        ></Button>
        <h2 className="text-2xl font-bold">Domain Configuration</h2>
        <div className="ml-auto">
          <a
            href={
              "//" +
              (domainNameDetail?.domainName || "") +
              (domainNameDetail?.domainExtend || "")
            }
            className="text-primary hover:text-primary-hover flex items-center gap-2"
            target="_blank"
          >
            <ArrowTopRightOnSquareIcon className="size-4 stroke-2"></ArrowTopRightOnSquareIcon>
            Go to website
          </a>
        </div>
      </div>

      {/* Domain info */}
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-medium">
            {(domainNameDetail?.domainName || "") +
              (domainNameDetail?.domainExtend || "")}
          </h3>
          <LabelStatus status={domainNameDetail?.status || 0}></LabelStatus>
        </div>
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          <InfoItem
            Icon={CalendarIcon}
            label="Registration Date"
            value={formatDate(domainNameDetail?.registerAt || "")}
          ></InfoItem>
          <InfoItem
            Icon={ClockIcon}
            label="Expiration Date"
            value={formatDate(domainNameDetail?.expiresAt || "")}
          ></InfoItem>
          <InfoItem
            Icon={LockClosedIcon}
            label="DNS Provider"
            value={domainNameDetail?.dnsProvider || ""}
          ></InfoItem>
        </div>
      </div>

      {/* Renewal */}
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2">
          <ArrowPathIcon className="text-primary-hover size-6"></ArrowPathIcon>
          <h3 className="text-lg font-medium">Renewal</h3>
        </div>
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <div className="space-y-3 rounded-xl border border-gray-300 p-4">
            <p className="font-medium">Manual Renewal</p>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-600">Renew for 1 year</p>
                {/* <p className="font-medium">
                  {moneyFormat({
                    value: 100000,
                    countryCode: "vi-VN",
                    currency: "VND",
                  })}
                </p> */}
              </div>
              <div className="ml-auto">
                <Button label="Renew now" onClick={handleRenewal}></Button>
              </div>
            </div>
          </div>
          <div className="space-y-3 rounded-xl border border-gray-300 p-4">
            <p className="font-medium">Automatic Renewal</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <ToggleSwitch
                  enable={domainNameDetail?.isAutoRenewal || false}
                  onChange={handleAutoRenewChange}
                ></ToggleSwitch>
                <p>Enable auto-renewal</p>
                {domainNameDetail?.isAutoRenewal && (
                  <div className="ml-auto flex items-center gap-1">
                    <CheckCircleIcon className="text-success-hover2 size-5"></CheckCircleIcon>
                    <p className="text-sm text-gray-500">Activated</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Your domain will be automatically renewed 30 days before
                expiration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DNS Management */}
      <div className="space-y-6 overflow-hidden rounded-xl bg-white pt-6 shadow-lg">
        {/* Title */}
        <div className="flex items-center gap-2 px-6">
          <ServerIcon className="text-primary-hover size-7"></ServerIcon>
          <h3 className="text-lg font-medium">DNS Management</h3>
          <div className="ml-auto">
            <Button
              label="Add Record"
              leftIcon={<PlusIcon className="size-5"></PlusIcon>}
              className="border-primary-hover text-primary-hover hover:bg-tint-primary border"
              onClick={handleAddRecord}
            ></Button>
          </div>
        </div>
        {/* Record List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-6">Host</th>
                <th className="p-6">Type</th>
                <th className="p-6">Value</th>
                <th className="p-6">TTL</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recordList?.map(
                (record) =>
                  record.domainNameId && (
                    <tr key={record.virtualId} className="hover:bg-gray-50">
                      <td className="p-6">
                        <div className="w-60 space-y-0.5">
                          <Input
                            placeholder="Enter host"
                            value={record.host}
                            onChange={(event) =>
                              handleRecordNameChange(
                                record.virtualId || 0,
                                event.target.value,
                              )
                            }
                          ></Input>
                          {record.host ? (
                            <span className="text-sm text-gray-500">
                              {(record.host === "@" ? "" : record.host + ".") +
                                (domainNameDetail?.domainName || "") +
                                (domainNameDetail?.domainExtend || "")}
                            </span>
                          ) : (
                            <div className="h-6"></div>
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <select
                          className="focus:ring-primary-hover mb-6 rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2"
                          value={record.type}
                          onChange={(event) =>
                            handleRecordTypeChange(
                              record.virtualId || 0,
                              event.target.value,
                            )
                          }
                        >
                          <option value="A">A</option>
                          <option value="AAAA">AAAA</option>
                          <option value="CNAME">CNAME</option>
                        </select>
                      </td>
                      <td className="p-6">
                        <div className="mb-6 w-40">
                          <Input
                            placeholder="Enter value"
                            value={record.value}
                            onChange={(event) =>
                              handleRecordValueChange(
                                record.virtualId || 0,
                                event.target.value,
                              )
                            }
                          ></Input>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="mb-6 w-20">
                          <Input
                            placeholder="Enter TTL"
                            value={record.ttl?.toString() || ""}
                            onChange={(event) =>
                              handleRecordTTLChange(
                                record.virtualId || 0,
                                Number(event.target.value),
                              )
                            }
                          ></Input>
                        </div>
                      </td>
                      <td className="p-6">
                        <SquareButton
                          leftIcon={
                            <XMarkIcon className="text-fail size-5"></XMarkIcon>
                          }
                          className="hover:bg-light-fail bg-tint-fail mb-6"
                          onClick={() =>
                            handleDeleteRecord(record.virtualId || 0)
                          }
                        ></SquareButton>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
        {/* Note */}
        <div className="px-6">
          <div className="bg-light-primary2 text-primary-hover border-light-primary flex gap-2 rounded-xl border p-4">
            <ExclamationCircleIcon className="size-6 shrink-0"></ExclamationCircleIcon>
            <div className="space-y-1">
              <p className="font-medium">Note</p>
              <p className="text-sm">
                DNS changes may take up to 48 hours to propagate globally.
                Changes made here will affect how your domain resolves to an IP
                address.
              </p>
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex items-center justify-end px-6 pb-6">
          <div
            className={
              showSaveButton ? "block" : "pointer-events-none opacity-50"
            }
          >
            <Button
              label="Save changes"
              onClick={handleUpdateDnsConfig}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainDetail;
