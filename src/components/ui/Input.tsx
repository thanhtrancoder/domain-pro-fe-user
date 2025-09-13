interface inputProps {
  type?: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<inputProps> = ({
  type = "text",
  placeholder,
  icon,
  className = "bg-white text-black border border-gray-500",
  value,
  onChange,
}) => {
  return (
    <div
      className={
        "flex items-center space-x-1 rounded-lg px-4 py-2 " + className
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
    </div>
  );
};
