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
  className = "bg-white text-black border border-gray-500",
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
