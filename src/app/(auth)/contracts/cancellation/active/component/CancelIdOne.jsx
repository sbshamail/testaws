"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/Components/containers/PageContainer";

import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Input from "@/app/Components/Inputs/Input";
import { FaCheckCircle } from "react-icons/fa";

import { IoArrowBack } from "react-icons/io5";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { formatDate, inputFormatDate } from "@/utils/helpers";
import Select from "@/app/Components/Inputs/Select";
import { CustomButton } from "@/components/cui/button/CustomButton";
import MainTable from "@/components/cui/table/MainTable";
import TextField from "@/components/cui/textField/TextField";
import { fetchPostObj } from "@/utils/action/function";
import { handlePrintCancellationData, recalculate } from "./function";
import TooltipNext from "@/components/nextui/TooltipNext";

function CancelIdOne({
  apiData,
  auth,
  Token,
  todayDate,
  Mileage,
  ContractNo,
  unlimitedMileage,
}) {
  const router = useRouter();
  const [data, setData] = useState(apiData);
  const [cancellationDate, setCancellationDate] = useState(todayDate);
  const [mileage, setMileage] = useState(Mileage);
  const [reasonCode, setReasonCode] = useState(data.CancellID);
  const [cancelPayeeType, setCancelPayeeType] = useState(data.CancellID);
  const [cancellationReason, setCancellationReason] = useState(data?.cReason);
  const [loading, setLoading] = useState(false);
  const giftedServices = data?.usedserviceslist?.filter(
    (item) => item?.GiftedService == "1"
  );

  const isUnlimitedMileage = unlimitedMileage == "1" ? true : false;
  const reasoncodes = data?.reasoncodes?.map((code, i) => {
    return { text: code.ReasonName, value: code.ReasonCodeID };
  });

  const payeetypes = data?.cancel_payee_types?.map((type, i) => {
    return { text: type.CancelPayeeType, value: type.CancelPayeeTypeID };
  });

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

  const NotChangeableFields = () => {
    return (
      <div className="flex flex-wrap items-center justify-between mt-6 gap-6">
        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            label="Total Cost"
            editable={true}
            value={data?.txtTotalCost}
            disable={true}
          />{" "}
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Admin Fee"
            value={data?.txtAAdminFee}
            disable={true}
          />{" "}
        </div>

        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Agent Fee"
            value={data?.txtCrAgentFee}
            disable={true}
          />{" "}
        </div>

        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Dealer Fee"
            value={data?.txtADrFee}
            disable={true}
          />{" "}
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Selling Rep Fee"
            value={data?.txtAFIFee}
            disable={true}
          />{" "}
        </div>

        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Cancellation Fee"
            value={data?.txtACanFee}
            disable={true}
          />{" "}
        </div>

        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Retained Fee"
            value={data?.txtARetainedFee}
            disable={true}
          />{" "}
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Other Fee"
            value={data?.txtOtherFee}
            disable={true}
          />{" "}
        </div>

        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Days Difference"
            value={data?.txtDays}
            disable={true}
          />{" "}
        </div>
        <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
          <Input
            editable={true}
            label="Mileage Difference"
            value={data?.MileageDifference}
            disable={true}
          />{" "}
        </div>
      </div>
    );
  };
  const CancellationFactor = () => {
    return (
      <div className="mt-6">
        <h1 className="font-bold">Cancellation Factors</h1>
        <div className="flex flex-wrap items-center justify-between mt-6 gap-6">
          <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
            <TooltipNext content={"Contract Cancellation Time base"}>
              <div className="w-full">
                <Input
                  label={"Cancellation Date:"}
                  type={"date"}
                  value={inputFormatDate(cancellationDate)}
                  setvalue={setCancellationDate}
                />
              </div>
            </TooltipNext>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
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
            <div className="flex items-center gap-6">
              <p>Time Percentage</p>
              <p>{data?.date_percentage}</p>
            </div>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <div className="flex items-center gap-6">
              <p>Mileage Percentage</p>
              <p>{data?.mileage_percentage}</p>
            </div>
          </div>

          <div className="flex-1 min-w-[400px] lg:min-w-[45%] ">
            <div className="flex items-center gap-2 font-bold text-lg">
              {data?.date_percentage < data?.mileage_percentage && (
                <FaCheckCircle className="text-siteBlue w-6 h-6" />
              )}

              <p> Un-used Percentage for the customer</p>
            </div>
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
            <div className="flex items-center gap-2 font-bold text-lg">
              {data?.mileage_percentage < data?.date_percentage && (
                <FaCheckCircle className="text-siteBlue w-6 h-6" />
              )}
              <p>Un-used Percentage for the customer (Mileage)</p>
            </div>
          </div>

          <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
            <Select
              label="Reason Code"
              options={reasoncodes}
              setvalue={setReasonCode}
              value={reasonCode}
              width={"full"}
            />
          </div>
          <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
            <Select
              label="Cancel Payee Type"
              options={payeetypes}
              setvalue={setCancelPayeeType}
              value={cancelPayeeType}
              width={"full"}
            />
          </div>
          <div className="w-full flex gap-4 justify-end ">
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
  const AmountRefundToCustomer = () => {
    return (
      <div className="mt-8">
        <div className="flex gap-4">
          <div className="w-full flex justify-between ">
            <div className="flex gap-2">
              <div className="text-muted-foreground font-bold my-3 text-xl">
                Amount Refund to Customer
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between mt-6 gap-6">
            <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
              <Input
                disable={true}
                label="Admin Fee"
                placeholder="Admin Fee"
                type="text"
                className="w-full"
                width={"96"}
                value={data?.txtCrAdminFee}
              />
            </div>
            <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
              <Input
                disable={true}
                label="Agent Fee"
                placeholder="Agent Fee"
                type="text"
                className="w-full"
                width={"96"}
                value={data?.agent_fee_used}
              />
            </div>

            <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
              <Input
                label="Dealer Fee"
                placeholder="Dealer Fee"
                type="text"
                className="w-full"
                width={"96"}
                value={data?.txtCrDealerFee}
                disable={true}
              />
            </div>

            <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
              <Input
                disable={true}
                label="F & I Manager Fee"
                placeholder="F & I Manager Fee"
                type="text"
                className="w-full"
                width={"96"}
                value={data?.txtCrFIFee}
              />{" "}
            </div>
            <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
              <Input
                disable={true}
                label="Other Fee"
                placeholder="Other Fee"
                type="text"
                className="w-full"
                width={"96"}
                value={data?.txtOtherFee}
              />{" "}
            </div>
            <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
              <Input
                disable={true}
                label="Retained Fee"
                placeholder="Retained Fee"
                type="text"
                className="w-full"
                width={"96"}
                value={data?.txtCrRetainedFee}
              />{" "}
            </div>

            <div className="flex-1 min-w-[400px] lg:min-w-[45%]">
              <Input
                disable={true}
                label="Total Refunded"
                placeholder="Total Refunded"
                type="text"
                className="w-full"
                width={"96"}
                value={data?.txtRemCost}
              />{" "}
            </div>
          </div>
          <div className="flex-1 max-w-[400px]">
            <TextField
              textarea={true}
              className={"border border-primary/10"}
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-end">
            <CustomButton
              className={"bg-red-500"}
              disabled={data?.success == 2 ? true : ""}
              onClick={
                data?.success == 1 ? handleContractConcellation : () => {}
              }
            >
              Cancel Contract
            </CustomButton>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageContainer>
      <div className="w-full">
        <SpinnerCenterScreen loading={loading} />
        <div className="flex flex-col  mt-5 gap-4">
          <div className="w-full flex gap-2 items-center">
            <IoArrowBack
              className="cursor-pointer text-xl Transition text-accent-foreground hover:text-accent-foreground/90"
              onClick={() => router.back()}
            />
            <h1 className="font-bold text-xl my-5">
              CONTRACT - CANCELLATION (Active)
            </h1>
          </div>
          <div className="lg:mx-10 flex flex-col gap-6">
            <ShadowContainer>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <div className="text-lg font-semibold uppercase">
                    Dealership:
                  </div>
                  <div className="text-lg font-extrabold">
                    {data?.DealerTitle}
                  </div>
                </div>
              </div>
            </ShadowContainer>{" "}
            <ShadowContainer>
              <div>
                {data?.success === 2 ? (
                  <div>
                    {data?.cReason && data?.cReason !== "" && (
                      <div className="p-4 mb-4 border-l-4 border-siteBlue">
                        <p className="text-lg font-semibold text-center">
                          {data?.cReason}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {data?.c_msg && (
                      <div className="p-4 mb-4 border-l-4 border-siteBlue">
                        <p className="bg-gradient-to-r from-siteBlue/20 via-siteBlue to-siteBlue/20 text-white text-lg font-semibold text-center">
                          {data?.c_msg}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="">
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

                <div className="flex gap-4 px-4 mt-3">
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex gap-2">
                      <div className="text-muted-foreground font-semibold">
                        Sale Date:
                      </div>
                      <div className="font-bold">
                        {data?.SaleDate ? data?.SaleDate : "-"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-muted-foreground font-semibold">
                        Mileage at sale:{" "}
                      </div>
                      <div className="font-bold">
                        {data?.ContractMileage ? data?.ContractMileage : "-"}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex gap-2">
                      <div className="text-muted-foreground font-semibold">
                        Full Refund Days:{" "}
                      </div>
                      <div className="font-bold">
                        {data?.FullRefundDays ? data?.FullRefundDays : "-"}
                      </div>
                    </div>
                  </div>
                </div>

                {NotChangeableFields()}

                {CancellationFactor()}
              </div>

              <div className="mt-8">
                <MainTable
                  tableWrapperClass={"h-full"}
                  data={data?.usedserviceslist}
                  columns={[
                    { title: "No", render: ({ index }) => index + 1 },
                    { title: "Coupon Title", accessor: "CouponTitle" },
                    { title: "Coupon No.", accessor: "CouponTitle" },
                    {
                      title: "Coupon Cost",
                      accessor: "CouponValue",
                      type: "currency",
                    },
                  ]}
                />
              </div>
              {giftedServices && giftedServices?.length > 0 && (
                <div className="mt-8">
                  <h1 className="text-xl text-secondary-foreground">
                    Gifted Services Amount deducted
                  </h1>
                  <MainTable
                    tableWrapperClass={"h-full"}
                    data={giftedServices}
                    columns={[
                      { title: "No", render: ({ index }) => index + 1 },
                      { title: "Coupon Title", accessor: "CouponTitle" },
                      { title: "Coupon No.", accessor: "CouponTitle" },
                      {
                        title: "Coupon Cost",
                        accessor: "CouponValue",
                        type: "currency",
                      },
                    ]}
                  />
                </div>
              )}
              {AmountRefundToCustomer()}
            </ShadowContainer>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default CancelIdOne;
