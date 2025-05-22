import { MdDelete, MdEdit } from "react-icons/md";
import { fetchPostObj } from "@/utils/action/function";
import { IoThumbsDownSharp, IoThumbsUpSharp } from "react-icons/io5";
export const MyCarAction = ({
  row,
  cell,
  auth,
  Token,
  setXpPoints,
  xpPoints,
  setEditCarValue,
  setEnrollEditCar,
}) => {
  // delete car action
  const deleteCar = async (row) => {
    const data = {
      ContractID: xpPoints.ContractID,
      ID: row.ID,
    };
    const res = await fetchPostObj({
      api: "contracts/deletenewcarinfo",
      auth,
      data,
      Token,
      showToast: true,
    });
    if (res) {
      setXpPoints((prev) => ({ ...prev, contractvins: res.contractvins }));
    }
  };

  //  status enable disable
  const enableDisable = async (row) => {
    const data = {
      ContractID: xpPoints.ContractID,
      ID: row.ID,
      VinStatus: row.VinStatus === "1" ? "0" : "1",
    };
    const res = await fetchPostObj({
      api: "contracts/disablenewcarinfo",
      auth,
      data,
      Token,
      showToast: true,
    });
    if (res) {
      setXpPoints((prev) => ({ ...prev, contractvins: res.contractvins }));
    }
  };
  return (
    <div className="flex items-center gap-1">
      {row?.VIN !== xpPoints?.VIN && (
        <>
          <MdEdit
            fontSize={"1.5em"}
            className="cursor-pointer text-yellow-600 hover:opacity-80"
            onClick={() => {
              setEnrollEditCar(true);
              setEditCarValue(row);
            }}
          />
          <MdDelete
            fontSize={"1.5em"}
            className="cursor-pointer text-red-500 hover:opacity-80"
            onClick={() => deleteCar(row)}
          />
        </>
      )}
      {cell && cell === "1" ? (
        <IoThumbsUpSharp
          fontSize={"1.5em"}
          className="cursor-pointer text-green-600 hover:opacity-80"
          onClick={() => enableDisable(row)}
        />
      ) : (
        <IoThumbsDownSharp
          fontSize={"1.5em"}
          className="cursor-pointer hover:opacity-80"
          onClick={() => enableDisable(row)}
        />
      )}
    </div>
  );
};
