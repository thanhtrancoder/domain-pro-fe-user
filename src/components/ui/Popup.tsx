import { useAppState } from "../../components/context/AppContext";
import { useEffect } from "react";

interface popupProps {
  children: React.ReactNode;
  isShow: boolean;
  title: string;
  content: string;
  value?: string;
  onConfirm: (confirm: boolean) => void;
}

export const Popup: React.FC<popupProps> = ({
  children,
  isShow,
  onConfirm,
  title,
  content,
  value,
}) => {
  const { isShowPopup } = useAppState();

  useEffect(() => {
    if (isShow) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isShow]);

  return (
    <div>
      {isShow && (
        <div>
          <div className="pointer-events-auto fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">{title}</h2>
              {value && (
                <p className="text-primary-hover mb-2 text-lg font-semibold">
                  {value}
                </p>
              )}
              <p className="mb-6 text-gray-700">{content}</p>
              <div className="flex justify-end gap-3">
                <button
                  className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
                  onClick={() => onConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-700 focus:outline-none"
                  onClick={() => onConfirm(true)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              "fixed z-30 h-screen w-full " + (isShowPopup ? "" : "bg-black/50")
            }
          ></div>
        </div>
      )}
      <div className={isShow ? "pointer-events-none" : ""}>{children}</div>
    </div>
  );
};

export const Popup2: React.FC<popupProps> = ({
  children,
  isShow,
  onConfirm,
  title,
  content,
  value,
}) => {
  return (
    <div className="relative">
      {isShow && (
        <div>
          <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">{title}</h2>
              {value && (
                <p className="text-primary-hover mb-2 text-lg font-semibold">
                  {value}
                </p>
              )}
              <p className="mb-6 text-gray-700">{content}</p>
              <div className="flex justify-end gap-3">
                <button
                  className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
                  onClick={() => onConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-700 focus:outline-none"
                  onClick={() => onConfirm(true)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div className="absolute z-30 h-full w-full bg-black/50"></div>
        </div>
      )}
      <div className={isShow ? "pointer-events-none opacity-50" : ""}>
        {children}
      </div>
    </div>
  );
};

interface popupProps3 {
  children: React.ReactNode;
  isShow: boolean;
  title: string;
  content: React.ReactNode;
  value?: string;
  onConfirm: (confirm: boolean) => void;
}

export const Popup3: React.FC<popupProps3> = ({
  children,
  isShow,
  onConfirm,
  title,
  content,
  value,
}) => {
  return (
    <div className="relative">
      {isShow && (
        <div>
          <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">{title}</h2>
              {value && (
                <p className="text-primary-hover mb-2 text-lg font-semibold">
                  {value}
                </p>
              )}
              <p className="mb-6 text-gray-700">{content}</p>
              <div className="flex justify-end gap-3">
                <button
                  className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
                  onClick={() => onConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-700 focus:outline-none"
                  onClick={() => onConfirm(true)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div className="absolute z-30 h-full w-full bg-black/50"></div>
        </div>
      )}
      <div className={isShow ? "pointer-events-none opacity-50" : ""}>
        {children}
      </div>
    </div>
  );
};
