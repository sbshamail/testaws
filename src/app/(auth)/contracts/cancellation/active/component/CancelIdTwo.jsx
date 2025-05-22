"use client";
import React, { useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Input from "@/app/Components/Inputs/Input";
import { FaCheckCircle } from "react-icons/fa";
import Select from "@/app/Components/Inputs/Select";
import { CustomButton } from "@/components/cui/button/CustomButton";
import MainTable from "@/components/cui/table/MainTable";
import TextField from "@/components/cui/textField/TextField";
import TooltipNext from "@/components/nextui/TooltipNext";

import { formatDate } from "@/utils/helpers";
import { handlePrintCancellationData, recalculate } from "./function";
import { fetchPostObj } from "@/utils/action/function";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const CancelIdTwo = ({
  apiData,
  todayDate,
  auth,
  Token,
  Mileage,
  ContractNo,
  unlimitedMileage,
}) => {
  const [data, setData] = useState(apiData);
  const [cancellationDate, setCancellationDate] = useState(todayDate);
  const [mileage, setMileage] = useState();
  const [reasonCode, setReasonCode] = useState(data.CancellID);
  const [cancelPayeeType, setCancelPayeeType] = useState(data.CancellID);
  const [cancellationReason, setCancellationReason] = useState(data?.cReason);
  const router = useRouter();
  const isUnlimitedMileage = unlimitedMileage == "1" ? true : false;
  const handleContractConcellation = async () => {
    const data = {
      ...apiData,
      txtcancellationReason: cancellationReason,
      CancelPayeeTypeID: cancelPayeeType,
      ReasonCode: reasonCode,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "contracts/cancellation_done",
      spinner: true,
      data,
    });
    if (res) {
      await handlePrintCancellationData({
        ContractID: res.ContractID,
        auth,
        Token,
      });
      const url = `/contracts/cancellation?refresh=true`;
      router.push(url);
    }
  };
  const NotChangableFields = () => {
    return (
      <div className="flex flex-wrap items-center justify-between mt-6 gap-6">
        <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
          <Input
            label={"Contract selling price"}
            width={"full"}
            value={data?.txtTotalCost}
            disable={true}
          />
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
          <Input
            label={"Amount remitted to PCP"}
            width={"full"}
            value={data?.txtAAdminFee}
            disable={true}
          />
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
          <Input
            label={"Dealer Complimentary services"}
            width={"full"}
            value={data?.txtCrAgentFee}
            disable={true}
          />
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
          <Input
            label={"Services used by customers besides complimentary"}
            value={data?.txtADrFee}
            width={"full"}
            disable={true}
          />
        </div>

        <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
          <Input
            label={"Cancellation Fee"}
            value={data?.txtACanFee}
            width={"full"}
            disable={true}
          />
        </div>

        <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
          <Input
            label={"Days Difference"}
            width={"full"}
            value={data?.txtDays}
            disable={true}
          />
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
          <Input
            label={"Mileage Difference"}
            width={"full"}
            value={data?.MileageDifference}
            disable={true}
          />
        </div>
      </div>
    );
  };
  const CancellationFactor = () => {
    return (
      <div className="mt-6">
        <h1 className="font-bold">Cancellation Factors</h1>
        <div className="flex flex-wrap items-center justify-between mt-6 gap-6">
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <TooltipNext
              content={`Contract Cancellation Mileage base ${
                isUnlimitedMileage &&
                "not allowed due to UNLIMITED MILEAGE PLAN"
              }`}
            >
              <div className="w-full">
                <Input
                  label="Cancellation Mileage"
                  type={"number"}
                  value={mileage}
                  disable={isUnlimitedMileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full"
                />
              </div>
            </TooltipNext>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <TooltipNext content={"Contract Cancellation Mileage base"}>
              <div className="w-full">
                <Input
                  label={"Cancellation Mileage"}
                  width={"full"}
                  value={mileage}
                  setvalue={setMileage}
                />
              </div>
            </TooltipNext>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <div className="flex items-center gap-6">
              <p>Time Percentage</p>
              <p>{data?.date_percentage}%</p>
            </div>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <div className="flex items-center gap-6">
              <p>Mileage Percentage</p>
              <p>{data?.mileage_percentage}%</p>
            </div>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <div className="flex items-center gap-2 font-bold text-lg">
              <FaCheckCircle className="text-primary text-2xl " />
              <p> Un-used Percentage for the customer</p>
            </div>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] font-bold text-lg">
            Un-used Percentage for the customer
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <Select
              label={"Reason Code"}
              options={data?.reasoncodes}
              setvalue={setReasonCode}
              value={reasonCode}
              keyTitle={"ReasonName"}
              keyValue={"ReasonCodeID"}
              width={"full"}
            />
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <Select
              label={"Cancel Payee Type"}
              options={data?.cancel_payee_types}
              keyTitle={"CancelPayeeType"}
              setvalue={setCancelPayeeType}
              value={cancelPayeeType}
              keyValue={"CancelPayeeTypeID"}
              width={"full"}
            />
          </div>
          <div className="w-full flex justify-end">
            <CustomButton
              variant="main"
              onClick={() =>
                recalculate({
                  auth,
                  Token,
                  formData: {
                    ExpiryDate: formatDate(cancellationDate),
                    Mileage: mileage ? mileage : Mileage,
                    ContractNo,
                  },
                  setState: setData,
                })
              }
            >
              Recalculate
            </CustomButton>
          </div>
        </div>
      </div>
    );
  };
  return (
    <PageContainer>
      <div className="w-full">
        <div className="w-full flex gap-2 items-center">
          <IoArrowBack
            className="cursor-pointer text-xl Transition text-accent-foreground hover:text-accent-foreground/90"
            onClick={() => router.back()}
          />
          <h1 className="font-bold text-xl my-5">
            CONTRACT - CANCELLATION (Cancelled)
          </h1>
        </div>

        <div className="lg:mx-10 flex flex-col gap-6">
          <ShadowContainer>
            <div className="flex gap-2 items-center">
              <div className="text-lg font-semibold uppercase">Dealership:</div>
              <div className="text-lg font-extrabold">
                {/* {data?.GetDealerDetails?.DealerTitle} */}
                {data?.DealerTitle}
              </div>
            </div>
          </ShadowContainer>
          <ShadowContainer>
            {data?.c_msg && (
              <div className="p-4 mb-4 border-l-4 border-siteBlue">
                <p className="bg-gradient-to-r from-siteBlue/20 via-siteBlue to-siteBlue/20 text-white text-lg font-semibold text-center">
                  {data?.c_msg}
                </p>
              </div>
            )}

            {data?.PlanName && (
              <div className="bg-gradient-to-r from-muted via-muted to-secondary text-foreground text-center p-2 rounded-lg mb-6 shadow-lg ">
                <div className=" font-bold tracking-wide drop-shadow-lg">
                  {data?.PlanName}{" "}
                  <span className="text-primary">{data?.PlanYear} </span>
                  {data?.PlanYear === 1 ? "YEAR" : "YEARS"}{" "}
                  <span className="text-sm">
                    <span className="text-primary">
                      {Number.isNaN(Number(data?.PlanMileage))
                        ? 0
                        : Number(data?.PlanMileage).toLocaleString()}
                    </span>{" "}
                    MILE/KM
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-4">
                <p>Sale Date:</p>
                <p>{data?.SaleDate}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold">Mileage at sale:</p>
                <p>{data?.ContractMileage}</p>
              </div>
              <div className="flex items-center gap-4">
                <p>Full Refund Days:</p>
                <p>{data?.FullRefundDays}</p>
              </div>
            </div>
            {NotChangableFields()}
            {CancellationFactor()}

            <div className="mt-8 flex flex-col gap-6">
              <MainTable
                tableWrapperClass={"h-full"}
                data={data?.usedserviceslist}
                columns={[
                  { title: "Coupon Title", accessor: "CouponTitle" },
                  { title: "Coupon No.", accessor: "CouponTitle" },
                  {
                    title: "Coupon Cost",
                    accessor: "CouponValue",
                    type: "currency",
                  },
                ]}
              />

              <div className="flex flex-col gap-4">
                <h1 className="font-bold">Amount Refund to Customer</h1>
                <div className="w-full flex gap-3 items-center">
                  <label>Total Refunded</label>
                  <div className={"min-w-[300px]"}>
                    <Input
                      className={"border border-primary/10"}
                      disable={true}
                      value={data?.total_refund ?? 0}
                    />
                  </div>
                </div>
                <div className="w-full flex gap-3 items-center">
                  <label>Cancellation Reason</label>
                  <div className={"min-w-[300px]"}>
                    <TextField
                      textarea={true}
                      className={"border border-primary/10"}
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <CustomButton onClick={handleContractConcellation}>
                    Cancel Contract
                  </CustomButton>
                </div>
              </div>
            </div>
          </ShadowContainer>
        </div>
      </div>
    </PageContainer>
  );
};

export default CancelIdTwo;
