import React from "react";

const SelectorButton = ({ contract, setvalue, setopen, selected }) => {
  // console.log("contract", contract);
  return (
    <button
      // defaultValue={contract.value}
      onClick={() => {
        setvalue(contract.value);
        setopen(false);
      }}
      className={`w-full flex flex-row items-center gap-2 p-2 border-b border-border bg-secondary/90 hover:bg-muted hover:text-muted-foreground ${
        selected && "border-b-0"
      }`}
    >
      {contract?.icon ? (
        contract.icon
      ) : (
        <>
          {contract?.color2 ? (
            <div className="w-5 h-5 rounded-full flex">
              <div className={`w-1/2 ${contract.color} rounded-l-full`}></div>
              <div className={`w-1/2 ${contract.color2} rounded-r-full`}></div>
            </div>
          ) : (
            <div className={`w-5 h-5 rounded-full ${contract.color}`}></div>
          )}
        </>
      )}

      <div className="truncate">{contract.text}</div>
    </button>
  );
};

export default SelectorButton;
