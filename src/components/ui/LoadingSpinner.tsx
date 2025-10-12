interface LoadingProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-4 border-b-4"></div>
    </div>
  );
};

export default LoadingSpinner;
