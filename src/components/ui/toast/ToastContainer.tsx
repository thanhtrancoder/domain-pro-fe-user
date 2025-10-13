import { useToastState, useToastDispatch } from "./ToastContext";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BellIcon,
  XCircleIcon,
  XMarkIcon,
} from "../../icons/Icon";
import { type Toast } from "./ToastContext";

export default function ToastContainer() {
  const { toasts } = useToastState();
  const dispatch = useToastDispatch();

  const getToastIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-white" />;
      case "error":
        return <XCircleIcon className="h-6 w-6 text-white" />;
      case "info":
        return <BellIcon className="h-6 w-6 text-white" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-6 w-6 text-white" />;
    }
  };

  const getToastStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-success-hover to-success-hover2";
      case "error":
        return "bg-gradient-to-r from-fail to-fail-hover";
      case "info":
        return "bg-gradient-to-r from-primary to-primary-hover";
      case "warning":
        return "bg-gradient-to-r from-warning to-warning-hover";
    }
  };

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col items-end space-y-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${
            t.isLeaving ? "animate-collapse-grid" : "animate-slide-in-right"
          } animate-slide-in-right pointer-events-auto w-fit max-w-md transform transition-all duration-500 ease-in-out ${getToastStyles(t.type)} bg-opacity-90 rounded-xl shadow-lg`}
        >
          <div>
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{getToastIcon(t.type)}</div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium break-words text-white">
                    {t.message}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    className="inline-flex cursor-pointer rounded-md text-white transition-colors duration-200 hover:text-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none"
                    onClick={() => {
                      // Đánh dấu toast đang biến mất
                      dispatch({ type: "START_REMOVE_TOAST", id: t.id });
                      // Sau khi animation kết thúc thì xóa khỏi state
                      setTimeout(() => {
                        dispatch({ type: "REMOVE_TOAST", id: t.id });
                      }, 300); // Khớp với thời gian animation
                    }}
                  >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
