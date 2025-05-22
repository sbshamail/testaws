import { CustomButton } from "@/components/cui/button/CustomButton";
import MainTable from "@/components/cui/table/MainTable";
import React, { useContext, useState } from "react";

import EnrollNewCar from "./EnrollNewCar";

import { MyCarAction } from "./function";
import { GlobalContext } from "@/app/Provider";
const MyCarTab = ({ contractvins, xpPoints, fetchXp, setXpPoints }) => {
  const { auth, Token } = useContext(GlobalContext);
  const [enrollNewCar, setEnrollNewCar] = useState(false);
  const [enrollEditCar, setEnrollEditCar] = useState(false);
  const [editCarValue, setEditCarValue] = useState(null);
  const close = () => setEnrollNewCar(false);

  const columns = [
    { title: "VIN#", accessor: "VIN" },
    { title: "Make", accessor: "Make" },
    { title: "Model", accessor: "Model" },
    { title: "Year", accessor: "VehYear" },
    {
      title: "Action",
      render: ({ row, cell }) =>
        MyCarAction({
          row,
          cell,
          auth,
          Token,
          setXpPoints,
          xpPoints,
          setEditCarValue,
          setEnrollEditCar,
        }),
      accessor: "VinStatus",
      className: "flex justify-center",
    },
  ];
  return (
    <>
      <div className="mt-2">
        <div className="flex items-end justify-end">
          <CustomButton
            variant="main"
            className={"rounded-none"}
            onClick={() => setEnrollNewCar(true)}
          >
            ENROLL NEW CAR
          </CustomButton>
        </div>
        <MainTable columns={columns} data={contractvins} />
      </div>
      {enrollNewCar && (
        <EnrollNewCar
          open={enrollNewCar}
          close={close}
          contract={xpPoints.contract}
          xpPoints={xpPoints}
          setXpPoints={setXpPoints}
        />
      )}
      {enrollEditCar && (
        <EnrollNewCar
          open={enrollEditCar}
          close={() => setEnrollEditCar(false)}
          contract={xpPoints.contract}
          xpPoints={xpPoints}
          editCarValue={editCarValue}
          api={"contracts/updatenewcarvin"}
          setXpPoints={setXpPoints}
        />
      )}
    </>
  );
};

export default MyCarTab;
