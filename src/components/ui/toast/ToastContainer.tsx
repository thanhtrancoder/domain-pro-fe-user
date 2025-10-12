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
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "error":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "info":
        return "bg-gradient-to-r from-blue-500 to-blue-600";
      case "warning":
        return "bg-gradient-to-r from-amber-500 to-amber-600";
    }
  };

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col space-y-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-slide-in-right pointer-events-auto w-full max-w-md transform transition-all duration-500 ease-in-out ${getToastStyles(t.type)} bg-opacity-90 rounded-lg shadow-lg backdrop-blur-lg`}
        >
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
                  className="inline-flex rounded-md text-white transition-colors duration-200 hover:text-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none"
                  onClick={() => dispatch({ type: "REMOVE_TOAST", id: t.id })}
                >
                  <span className="sr-only">Đóng</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-opacity-30 h-1 overflow-hidden rounded-b-lg bg-white">
            <div className="bg-opacity-60 animate-progress-bar h-full rounded-b-lg bg-white"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
