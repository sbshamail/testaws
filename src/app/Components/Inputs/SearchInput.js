import { HiMagnifyingGlass } from "react-icons/hi2";
import Input from "./Input";
// import { SearchIcon } from "./SearchIcon";
const SearchInput = ({
  value,
  setvalue,
  placeholder,
  fetchContracts,
  className,
}) => {
  return (
    // <div className="flex flex-row gap-2 items-center bg-secondary rounded-md p-2 drop-shadow-md sticky top-0">
    //   <HiMagnifyingGlass size={16} />
    //   <input
    //     value={value}
    //     onChange={(event) => setvalue(event.target.value)}
    //     className="w-full  border-transparent focus:outline-none placeholder-style"
    //     placeholder={placeholder}
    //   />
    // </div>

    <Input
      value={value}
      onChange={(event) => {
        setvalue(event.target.value);
      }}
      className={className}
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          fetchContracts();
        }
      }}
      suffix={() => <HiMagnifyingGlass size={17} onClick={fetchContracts} />}
    />
  );
};

export default SearchInput;
