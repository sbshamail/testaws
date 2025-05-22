import { IoSearch } from "react-icons/io5";
import Input from "./Input";
import TextField from "@/components/cui/textField/TextField";
const SearchByInput = ({
  value,
  setvalue,
  placeholder,
  buttonbg,
  bg,
  height,
  onClick, // Add the onClick prop here
  className,
}) => {
  return (
    <>
      <TextField
        value={value}
        onChange={(event) => setvalue(event.target.value)}
        placeholder={placeholder}
        className={className}
        suffix={() => (
          <div
            onClick={onClick}
            className=" bg-primary/80 h-full w-full flex items-center justify-center px-2 hover:opacity-90 cursor-pointer"
          >
            <IoSearch className="text-muted-foreground text-2xl" />
          </div>
        )}
      />
    </>
  );
};

export default SearchByInput;
