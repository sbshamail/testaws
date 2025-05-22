import { currencyFormatter } from "@/utils/helpers";
import React from "react";

const CancelledCoupanTable = ({ cancellationData }) => {
  const total = (cancellationData?.usedserviceslist || []).reduce(
    (acc, item) => acc + Number(item.CouponValue),
    0
  );

  return (
    <div className="bg-card shadow-md shadow-shadow rounded-lg my-6">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 font-semibold">Coupon Title</th>
            <th className="px-4 py-2 font-semibold">Coupon No.</th>
            <th className="px-4 py-2 font-semibold">Coupon Cost</th>
          </tr>
        </thead>
        <tbody>
          {cancellationData?.usedserviceslist?.length ? (
            cancellationData.usedserviceslist.map((service, index) => (
              <>
                <tr
                  className={`border-t ${
                    index === cancellationData.usedserviceslist.length - 1
                      ? ""
                      : "border-b"
                  }`}
                  key={service.CouponID}
                >
                  <td className="px-4 py-2">{service.CouponTitle ?? "-"}</td>
                  <td className="px-4 py-2">{service.CouponID ?? "-"}</td>
                  <td className="px-4 py-2">
                    {currencyFormatter(service.CouponValue) ?? "-"}
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2" colSpan="3">
                No Coupons Available
              </td>
            </tr>
          )}
          {cancellationData?.usedserviceslist?.length && (
            <tr>
              <td className="px-4 py-2 border border-border" colSpan={"2"}>
                Total
              </td>
              <td className="px-4 py-2 border border-border">
                {currencyFormatter(total)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CancelledCoupanTable;
