import React, { useEffect, useState } from "react";
import Input from "@/app/Components/Inputs/Input";
import { currencyFormatter } from "@/utils/helpers";

const ServiceRedemptionPaidout = ({ redem, data, setCheckno, checkno }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const couponIDs = Object.keys(redem).filter((key) => redem[key] === true);
    const total = data.reduce((acc, item) => {
      return couponIDs.includes(item.CouponID)
        ? acc + Number(item.CouponValue)
        : acc;
    }, 0);

    setTotalAmount(total);
  }, [redem]);
  const tableInsideClass =
    "border border-border shadow-sm shadow-accent text-left p-2  ";
  return (
    <div className=" border mx-2 overflow-hidden">
      <table className="min-w-full table-auto relative">
        <thead className="bg-card">
          <tr>
            <th colSpan="2" className={`${tableInsideClass}`}>
              Check No.
            </th>
            <th className={`${tableInsideClass}`}>Total Services</th>
            <th className={`${tableInsideClass}`}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`${tableInsideClass}`} colSpan="2">
              <Input
                type="text"
                placeholder="Check No."
                setvalue={setCheckno}
                value={checkno}
                required={true}
              />
            </td>
            <td className={`${tableInsideClass} text-center`}>
              {Object.values(redem).filter((item) => item === true).length}
            </td>
            <td className={`${tableInsideClass} text-center`}>
              {currencyFormatter(totalAmount)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRedemptionPaidout;
