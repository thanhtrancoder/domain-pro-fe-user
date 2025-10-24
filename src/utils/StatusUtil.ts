export type NotificationType = "info" | "success" | "warning" | "error";

export const statusNotification = (status: number): NotificationType => {
  const statusMap: Record<number, NotificationType> = {
    1: "info",
    2: "warning",
    3: "error",
    4: "success",
  };

  return statusMap[status] ?? "unknown";
};

export type DomainNameStatusType = "active" | "expiring" | "expired";

export const statusDomainName = (status: number): DomainNameStatusType => {
  const statusMap: Record<number, DomainNameStatusType> = {
    1: "active",
    2: "expiring",
    3: "expired",
  };

  return statusMap[status] ?? "unknown";
};

export const statusDomainNameToNumber = (status: string): string => {
  const statusMap: Record<string, string> = {
    "active": "1",
    "expiring": "2",
    "expired": "3",
  };

  return statusMap[status] || "";
};