import Image from "next/image";

const isValidDate = (date) => {
  const [month, day, year] = date.split("/");
  return (
    !isNaN(new Date(`${year}-${month}-${day}`).getTime()) &&
    month > 0 &&
    month <= 12 &&
    day > 0 &&
    day <= 31
  );
};

const formatToMMDDYYYY = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; // Handle invalid date
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

const validateDate = (date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) ? parsedDate : null;
};

const DateofSale = ({
  label,
  value,
  setvalue,
  placeholder,
  type,
  bgcolor,
  disable,
  image,
  onImageClick,
  min,
  max,
  editable,
  disableFutureDate,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const minDate =
    min && validateDate(min)
      ? validateDate(min).toISOString().split("T")[0]
      : undefined;

  const handleInputChange = (event) => {
    const input = event.target.value;
    if (isValidDate(input)) {
      setvalue(input);
    }
  };

  const handleCalendarChange = (event) => {
    const isoDate = event.target.value; // yyyy-mm-dd
    const formattedDate = formatToMMDDYYYY(isoDate);
    if (formattedDate) {
      setvalue(formattedDate);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label>{label}</label>}
      <div className="relative w-full">
        {image && (
          <Image
            src={image}
            alt="icon"
            onClick={onImageClick}
            className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 h-6"
            width="25"
            height="10"
          />
        )}
        <input
          value={value} // Always in mm/dd/yyyy format
          type={type === "date" ? "text" : type} // Only add date logic for "date"
          placeholder={placeholder || "mm/dd/yyyy"}
          className="h-14 w-full border-transparent focus:outline-none px-4 rounded-lg bg-gray-100 text-sm"
          onChange={type === "date" ? handleInputChange : undefined}
          onFocus={
            type === "date" ? (e) => (e.target.type = "date") : undefined
          } // Calendar on focus
          onBlur={type === "date" ? (e) => (e.target.type = "text") : undefined} // Revert to text
          onInput={type === "date" ? handleCalendarChange : undefined}
          readOnly={editable}
          min={type === "date" ? minDate : undefined}
          max={type === "date" && disableFutureDate ? today : max}
        />
      </div>
    </div>
  );
};

export default DateofSale;
