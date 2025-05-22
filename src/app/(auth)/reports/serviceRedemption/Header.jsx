import React from "react";
import CardKeyValues from "./CardKeyValues";
import { currencyFormatter } from "@/utils/helpers";
const Header = ({ totalEntry }) => {
  const Note = () => (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4   p-4 ">
      <div className="border p-2 printNone">
        <h3>Note:</h3>
        <p>
          The amount taken out and remaining is based on the selections made by
          the accounting department at the dealership. It is going to be as
          accurate as the selections made. Please export the excel for batch
          entry for record keeping.
        </p>
      </div>
      <div className="border p-2">
        <div className="flex items-center justify-between">
          <p>Amount for Service Redeemed</p>
          <table>
            <tr className="border flex items-center">
              <td className="p-2 w-32 ">Total</td>
              <td className="p-2 w-32 bg-primary text-white">
                {currencyFormatter(totalEntry?.CouponValue ?? 0)}
              </td>
            </tr>
          </table>
        </div>
        <div className="flex items-center justify-between">
          <p>Amount Paid out on report</p>
          <table>
            <tr className="border flex items-center">
              <td className="p-2 w-32">Paid out</td>
              <td className="p-2 w-32 bg-green-500 text-white">
                {currencyFormatter(totalEntry?.paidout ?? 0)}
              </td>
            </tr>
          </table>
        </div>
        <div className="flex items-center justify-between">
          <p>Amount remaining to be Paid Out</p>
          <table>
            <tr className="border flex items-center">
              <td className="p-2 w-32">Remaining</td>
              <td className="p-2 w-32 bg-siteOrange text-white">
                {currencyFormatter(
                  totalEntry?.CouponValue - totalEntry?.paidout ?? 0
                )}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {Note()}
      <CardKeyValues totalEntry={totalEntry} />
    </div>
  );
};

export default Header;
