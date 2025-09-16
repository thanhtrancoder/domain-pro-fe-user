import { Input } from "./Input";
import { NavButton } from "./Button";
import { SearchIcon, XMarkIcon } from "../icons/Icon";

interface searchProps {
  searchString: string;
  setSearchString: (searchString: string) => void;
  navigate: string;
  onActionIconClick?: () => void;
}

export const SearchForm1: React.FC<searchProps> = ({
  searchString,
  setSearchString,
  navigate,
  onActionIconClick,
}) => {
  return (
    <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg">
      <form className="space-y-4 md:flex md:gap-4 md:space-y-0">
        <Input
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Nhập tên miền bạn muốn tìm..."
          className="focus-within:border-primary focus-within:ring-primary flex-1 border border-gray-200 focus-within:ring-2 lg:px-6 lg:py-4"
          actionIcon={
            <XMarkIcon className="size-6 cursor-pointer text-gray-400 hover:text-gray-500"></XMarkIcon>
          }
          onActionIconClick={onActionIconClick}
        ></Input>
        <NavButton
          label="Tìm kiếm"
          to={navigate}
          leftIcon={<SearchIcon className="size-6"></SearchIcon>}
          className="bg-primary hover:bg-primary-hover text-lg text-white lg:px-6"
        />
      </form>
    </div>
  );
};
