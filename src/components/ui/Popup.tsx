interface popupProps {
  children: React.ReactNode;
  isShow: boolean;
  onConfirm: (confirm: boolean) => void;
}

export const Popup: React.FC<popupProps> = ({
  children,
  isShow,
  onConfirm,
}) => {
  return (
    <div>
      {isShow && (
        <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Xác nhận</h2>
            <p className="mb-6 text-gray-700">{}</p>
            <div className="flex justify-end gap-3">
              <button
                className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
                onClick={() => onConfirm(false)}
              >
                Hủy
              </button>
              <button
                className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-700 focus:outline-none"
                onClick={() => onConfirm(true)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={isShow ? "pointer-events-none" : ""}>{children}</div>
    </div>
  );
};
