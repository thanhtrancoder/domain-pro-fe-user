export type NotificationType = "info" | "success" | "warning" | "error";

export const statusNotification = (status: number): NotificationType => {
  const statusMap: Record<number, NotificationType> = {
    1: "info",
    2: "warning",
    3: "error",
    4: "success",
  };

  return statusMap[status] ?? "info";
};