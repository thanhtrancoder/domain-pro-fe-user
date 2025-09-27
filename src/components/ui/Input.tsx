interface inputProps {
  type?: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionIcon?: React.ReactNode;
  onActionIconClick?: () => void;
}

export const Input: React.FC<inputProps> = ({
  type = "text",
  placeholder,
  icon,
  className = "bg-white text-black border border-gray-300 focus-within:ring-primary-hover focus-within:border-transparent focus-within:ring-2",
  value,
  onChange,
  actionIcon,
  onActionIconClick,
}) => {
  return (
    <div
      className={
        "transition-color flex items-center space-x-1 rounded-lg px-4 py-2 duration-300 " +
        className
      }
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full focus:outline-none"
        onChange={onChange}
      ></input>
      <button type="button" onClick={onActionIconClick}>
        {actionIcon}
      </button>
    </div>
  );
};

interface toggleSwitchProps {
  enable: boolean;
  onChange: () => void;
}

export const ToggleSwitch: React.FC<toggleSwitchProps> = ({
  enable,
  onChange,
}) => {
  return (
    <label className="flex cursor-pointer items-center">
      <div className="relative">
        <input
          className="sr-only"
          type="checkbox"
          checked={enable}
          onChange={onChange}
        ></input>
        <div
          className={
            "block h-6 w-10 rounded-full " +
            (enable ? "bg-blue-600" : "bg-gray-300")
          }
        ></div>
        <div
          className={
            "absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform " +
            (enable ? "translate-x-4 transform" : "")
          }
        ></div>
      </div>
    </label>
  );
};
