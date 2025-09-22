import { Link } from "react-router-dom";

interface buttonProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<buttonProps> = ({
  label,
  leftIcon,
  rightIcon,
  onClick,
  className = "bg-primary hover:bg-primary-hover text-white",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex cursor-pointer items-center justify-center space-x-1 rounded-lg px-4 py-2 font-medium transition-colors duration-300 " +
        className
      }
    >
      {leftIcon}
      {label && (
        <label className="cursor-pointer whitespace-nowrap">{label}</label>
      )}
      {rightIcon}
    </button>
  );
};

export const SquareButton: React.FC<buttonProps> = ({
  label,
  leftIcon,
  rightIcon,
  onClick,
  className = "bg-primary hover:bg-primary-hover text-white",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex cursor-pointer items-center justify-center space-x-1 rounded-lg px-2 py-2 font-medium transition-colors duration-300 " +
        className
      }
    >
      {leftIcon}
      {label && (
        <label className="cursor-pointer whitespace-nowrap">{label}</label>
      )}
      {rightIcon}
    </button>
  );
};

interface navButtonProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to: string;
  onClick?: () => void;
  className?: string;
}

export const NavButton: React.FC<navButtonProps> = ({
  label,
  leftIcon,
  rightIcon,
  to,
  onClick,
  className = "bg-primary hover:bg-primary-hover text-white",
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={
        "flex items-center justify-center space-x-1 rounded-lg px-4 py-2 font-medium transition-colors duration-300 " +
        className
      }
    >
      {leftIcon}
      {label && (
        <label className="cursor-pointer whitespace-nowrap">{label}</label>
      )}
      {rightIcon}
    </Link>
  );
};

export const SquareNavButton: React.FC<navButtonProps> = ({
  label,
  leftIcon,
  rightIcon,
  to,
  onClick,
  className = "bg-primary hover:bg-primary-hover text-white",
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={
        "flex items-center justify-center space-x-1 rounded-lg px-2 py-2 font-medium transition-colors duration-300 " +
        className
      }
    >
      {leftIcon}
      {label && (
        <label className="cursor-pointer whitespace-nowrap">{label}</label>
      )}
      {rightIcon}
    </Link>
  );
};
