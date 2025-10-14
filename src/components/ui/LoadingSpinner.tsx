interface LoadingProps {
  className?: string;
  size?: string;
}

const LoadingSpinner: React.FC<LoadingProps> = ({
  className = "",
  size = "12",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`border-primary h-${size} w-${size} animate-spin rounded-full border-t-4 border-b-4`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
