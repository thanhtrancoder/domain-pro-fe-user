import LoadingSpinner from "../ui/LoadingSpinner";

interface LoadingProps {
  loading: boolean;
  children: React.ReactNode;
  size?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  loading,
  children,
  size = "12",
  className = "",
}) => {
  return (
    <div className={"relative " + className}>
      {loading && (
        <LoadingSpinner
          className="absolute top-0 right-0 bottom-0 left-0"
          size={size}
        />
      )}
      <div
        className={
          loading ? "pointer-events-none cursor-not-allowed opacity-50" : ""
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Loading;
