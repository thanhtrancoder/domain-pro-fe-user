import { ChevronLeftIcon, AngleRightIcon, type iconProps } from "../icons/Icon";

interface paginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

interface currentButtonProps {
  label?: number;
}

interface buttonProps extends currentButtonProps {
  Icon?: React.FC<iconProps>;
  handleClick?: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<buttonProps> = ({
  Icon,
  label,
  handleClick,
  isDisabled,
}) => {
  return (
    <>
      {isDisabled ? (
        <button className="hover:text-primary-hover px-3 transition-colors duration-300">
          {Icon && <Icon></Icon>}
          {label}
        </button>
      ) : (
        <button
          className="hover:text-primary-hover cursor-pointer px-3 transition-colors duration-300"
          onClick={handleClick}
        >
          {Icon && <Icon></Icon>}
          {label}
        </button>
      )}
    </>
  );
};

const CurrentButton: React.FC<currentButtonProps> = ({ label }) => {
  return (
    <button className="hover:bg-primary-hover bg-primary rounded-lg px-3 text-white transition-colors duration-300">
      {label}
    </button>
  );
};

const HidePageLabel: React.FC = () => {
  return <p className="hover:text-primary-hover px-3">...</p>;
};

export const Pagination: React.FC<paginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="flex items-center gap-4 text-xl text-gray-500">
      <Button
        Icon={ChevronLeftIcon}
        handleClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      ></Button>

      {currentPage > 1 && (
        <Button label={1} handleClick={() => handlePageChange(1)}></Button>
      )}
      {currentPage > 3 && <HidePageLabel></HidePageLabel>}
      {currentPage - 1 > 1 && (
        <Button
          label={currentPage - 1}
          handleClick={() => handlePageChange(currentPage - 1)}
        ></Button>
      )}
      <CurrentButton label={currentPage}></CurrentButton>
      {currentPage + 1 < totalPages && (
        <Button
          label={currentPage + 1}
          handleClick={() => handlePageChange(currentPage + 1)}
        ></Button>
      )}
      {totalPages - currentPage > 2 && <HidePageLabel></HidePageLabel>}
      {currentPage !== totalPages && (
        <Button
          label={totalPages}
          handleClick={() => handlePageChange(totalPages)}
        ></Button>
      )}

      <Button
        Icon={AngleRightIcon}
        handleClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      ></Button>
    </div>
  );
};

const ButtonMini: React.FC<buttonProps> = ({
  Icon,
  handleClick,
  isDisabled,
}) => {
  return (
    <>
      {isDisabled ? (
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 transition-colors duration-300">
          {Icon && <Icon className="size-4 text-gray-400"></Icon>}
        </button>
      ) : (
        <button
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-300 hover:border-gray-200 hover:bg-white"
          onClick={handleClick}
        >
          {Icon && <Icon className="size-4"></Icon>}
        </button>
      )}
    </>
  );
};

export const PaginationMini: React.FC<paginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <p>
        <span className="text-primary-hover">{currentPage}</span>/{totalPages}
      </p>
      <div className="flex items-center gap-1">
        <ButtonMini
          Icon={ChevronLeftIcon}
          handleClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        ></ButtonMini>
        <ButtonMini
          Icon={AngleRightIcon}
          handleClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        ></ButtonMini>
      </div>
    </div>
  );
};
