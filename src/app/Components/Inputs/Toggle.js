const Toggle = ({ value, setvalue, truetext, falsetext }) => {
  const toggleSwitch = () => {
    setvalue(!value);
  };

  return (
    <div
      onClick={toggleSwitch}
      className={`flex items-center justify-between gap-1 cursor-pointer ${
        value ? "flex-row-reverse bg-siteBlue" : "flex-row bg-gray-300"
      } w-16 h-7 px-1  rounded-full text-white`}
    >
      <div className="w-5 h-5 bg-white rounded-full"></div>
      <div className="text-sm">{value ? truetext : falsetext}</div>
    </div>
  );
};

export default Toggle;
