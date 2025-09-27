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
import { moneyFormat } from "../../utils/Format";
import { useEffect, useState } from "react";
import { Input, ToggleSwitch } from "../../components/ui/Input";
import { RecordItemTemp, type recordItemProps } from "./domainDetailData";

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

const DomainDetail: React.FC = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const [autoRenew, setAutoRenew] = useState(true);
  const [recordList, setRecordList] = useState<recordItemProps[]>([]);
  const [oldRecordList, setOldRecordList] = useState<recordItemProps[]>([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setRecordList(RecordItemTemp);
    setOldRecordList(RecordItemTemp);
  }, []);

  useEffect(() => {
    if (JSON.stringify(recordList) !== JSON.stringify(oldRecordList)) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [recordList]);

  const handleAutoRenewChange = () => {
    setAutoRenew(!autoRenew);
    console.log("autoRenew");
  };

  const handleRecordTypeChange = (recordId: number, type: string) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.id === recordId ? { ...record, type: type } : record,
      ),
    );
  };

  const handleRecordNameChange = (recordId: number, name: string) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.id === recordId ? { ...record, name: name } : record,
      ),
    );
  };

  const handleRecordValueChange = (recordId: number, value: string) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.id === recordId ? { ...record, value: value } : record,
      ),
    );
  };

  const handleRecordTTLChange = (recordId: number, ttl: number) => {
    setRecordList((prevRecordList) =>
      prevRecordList.map((record) =>
        record.id === recordId ? { ...record, ttl: ttl } : record,
      ),
    );
  };

  const handleAddRecord = () => {
    setRecordList((prevRecordList) => {
      const newRecordId = prevRecordList[prevRecordList?.length - 1].id + 1;
      const newRecord = {
        id: newRecordId,
        type: "A",
        name: "",
        value: "",
        ttl: 3600,
      };
      return [...prevRecordList, newRecord];
    });
  };

  const handleDeleteRecord = (recordId: number) => {
    setRecordList((prevRecordList) =>
      prevRecordList.filter((record) => record.id !== recordId),
    );
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
        <h2 className="text-2xl font-bold">Cấu hình tên miền</h2>
        <div className="ml-auto">
          <a
            href="//example.com"
            className="text-primary hover:text-primary-hover flex items-center gap-2"
            target="_blank"
          >
            <ArrowTopRightOnSquareIcon className="size-4 stroke-2"></ArrowTopRightOnSquareIcon>
            Đi đến website
          </a>
        </div>
      </div>

      {/* Domain info */}
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-medium">example.com</h3>
          <p className="bg-light-success text-success-hover2 rounded-full px-3 py-1 font-medium">
            Active
          </p>
          <p className="bg-tint-warning text-warning rounded-full px-3 py-1 font-medium">
            Expiring
          </p>
          <p className="bg-tint-fail text-fail rounded-full px-3 py-1 font-medium">
            Expired
          </p>
        </div>
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          <InfoItem
            Icon={CalendarIcon}
            label="Ngày đăng ký"
            value="2022-05-15"
          ></InfoItem>
          <InfoItem
            Icon={ClockIcon}
            label="Ngày hết hạn"
            value="2022-05-15"
          ></InfoItem>
          <InfoItem
            Icon={LockClosedIcon}
            label="Nhà cung cấp DNS"
            value="Cloudflare"
          ></InfoItem>
        </div>
      </div>

      {/* Renewal */}
      <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2">
          <ArrowPathIcon className="text-primary-hover size-6"></ArrowPathIcon>
          <h3 className="text-lg font-medium">Gia hạn</h3>
        </div>
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <div className="space-y-3 rounded-xl border border-gray-300 p-4">
            <p className="font-medium">Gia hạn thủ công</p>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-600">Gia hạn cho 1 năm</p>
                <p className="font-medium">
                  {moneyFormat({
                    value: 100000,
                    countryCode: "vi-VN",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div className="ml-auto">
                <Button label="Gia hạn ngay"></Button>
              </div>
            </div>
          </div>
          <div className="space-y-3 rounded-xl border border-gray-300 p-4">
            <p className="font-medium">Gia hạn tự động</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <ToggleSwitch
                  enable={autoRenew}
                  onChange={handleAutoRenewChange}
                ></ToggleSwitch>
                <p>Bật tự động gia hạn</p>
                <div className="ml-auto flex items-center gap-1">
                  <CheckCircleIcon className="text-success-hover2 size-5"></CheckCircleIcon>
                  <p className="text-sm text-gray-500">Kích hoạt</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Tên miền của bạn sẽ được tự động gia hạn 30 ngày trước khi hết
                hạn
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
          <h3 className="text-lg font-medium">Quản lý DNS</h3>
          <div className="ml-auto">
            <Button
              label="Thêm Record"
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
                <th className="p-6">Loại</th>
                <th className="p-6">Tên miền</th>
                <th className="p-6">Giá trị</th>
                <th className="p-6">TTL</th>
                <th className="p-6">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recordList?.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="p-6">
                    <select
                      className="focus:ring-primary-hover rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2"
                      value={record.type}
                      onChange={(event) =>
                        handleRecordTypeChange(record.id, event.target.value)
                      }
                    >
                      <option value="A">A</option>
                      <option value="AAAA">AAAA</option>
                      <option value="CNAME">CNAME</option>
                    </select>
                  </td>
                  <td className="p-6">
                    <div className="w-60">
                      <Input
                        placeholder="Nhập tên miền"
                        value={record.name}
                        onChange={(event) =>
                          handleRecordNameChange(record.id, event.target.value)
                        }
                      ></Input>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="w-40">
                      <Input
                        placeholder="Nhập giá trị"
                        value={record.value}
                        onChange={(event) =>
                          handleRecordValueChange(record.id, event.target.value)
                        }
                      ></Input>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="w-20">
                      <Input
                        placeholder="Nhập TTL"
                        value={record.ttl.toString()}
                        onChange={(event) =>
                          handleRecordTTLChange(
                            record.id,
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
                      className="hover:bg-light-fail bg-tint-fail"
                      onClick={() => handleDeleteRecord(record.id)}
                    ></SquareButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Note */}
        <div className="px-6">
          <div className="bg-light-primary2 text-primary-hover border-light-primary flex gap-2 rounded-xl border p-4">
            <ExclamationCircleIcon className="size-6 shrink-0"></ExclamationCircleIcon>
            <div className="space-y-1">
              <p className="font-medium">Lưu ý</p>
              <p className="text-sm">
                Thay đổi DNS có thể mất đến 48 giờ để thay đổi được áp dụng trên
                toàn cầu. Các thay đổi được thực hiện tại đây sẽ ảnh hưởng đến
                cách tên miền của bạn được phân giải thành địa chỉ IP.
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
            <Button label="Lưu thay đổi"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainDetail;
