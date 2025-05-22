import { GlobalContext } from "@/app/Provider";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Table from "@/components/cui/table";
import { fetchPostObj } from "@/utils/action/function";
import React, { useContext, useEffect, useState } from "react";

const VehicleHistory = ({ open, close, ContractID }) => {
  const { auth, Token } = useContext(GlobalContext);
  const [vehicleData, setVehicleData] = useState([]);
  useEffect(() => {
    const fetchVehicle = async () => {
      const res = await fetchPostObj({
        auth,
        Token,
        api: "contracts/vehicheinfohistory",
        data: { ContractID },
        showToast: true,
        spinner: true,
      });
      if (res) {
        setVehicleData(res.vehicheinfohistory);
      }
    };
    fetchVehicle();
  }, []);
  const columns = [
    { title: "Sr.#" },
    { title: "Date" },
    { title: "Make" },
    { title: "VIN" },
  ];
  return (
    <SimpleModal open={open} close={close} title={"Make/Vin Change History"}>
      <Table columns={columns} data={vehicleData} />
    </SimpleModal>
  );
};

export default VehicleHistory;
