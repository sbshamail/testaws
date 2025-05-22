"use client";
import { fetchPostObj } from "@/utils/action/function";
import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Image from "next/image";
import { Bars } from "react-loader-spinner";

const CoveragesModal = ({ contract, close, open, ContractID }) => {
  const [carModel, setCarModel] = useState("");

  const { auth, Token } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCoverages = async (contract) => {
      const { contractinfo, getuserbyid, customereinfo } = contract || {};
      const { MakeID } = contractinfo || {};
      const data = {
        ContractID: contractinfo?.ContractID,
        IsGuest: contractinfo?.IsGuest,
        isVcsUser: getuserbyid?.isVcsUser,
        VIN: contractinfo?.VIN,
        LastName: customereinfo?.CustomerLName,
      };
      setLoading(true);
      const res = await fetchPostObj({
        api: "contracts/coveragedata",
        auth,
        Token,
        data,
        setLoading,
        showToast: true,
      });
      if (res) {
        setData(res);
        setCarModel(contract?.Makes?.find((item) => item.MakeID === MakeID));
      } else {
        setCarModel({ Make: " No Products Found" });
      }
    };
    if (open && !ContractID) {
      getCoverages(contract);
    }
    if (open && ContractID) {
      const data = { ContractID };
      const getContract = async () => {
        const res = await fetchPostObj({
          api: "contracts/editcontract",
          auth,
          Token,
          data,
          setLoading,
          showToast: true,
          toastMsg: "Contract found",
        });
        if (res) {
          await getCoverages(res);
        }
      };
      getContract();
    }
  }, [open, contract, ContractID]);
  return (
    <>
      <SimpleModal
        open={open}
        close={close}
        className={`w-10/12 m-auto  p-6 rounded-lg mt-10`}
      >
        <SpinnerCenterScreen loading={loading} />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Product Details</h1>
            <div className="flex gap-2 ">
              <Image
                src="/images/stone-eagle.png"
                width={30}
                height={30}
                alt="coverage icon"
                className="object-contain"
              />
              <div
                className="font-bold w-6 h-6 p-3 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
                onClick={close}
              >
                X
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200 my-4"></div>
          <div className="w-full flex items-center gap-4 ">
            <h1 className="text-2xl">Vehicle</h1>
            <p className="w-full flex justify-center rounded items-center p-2 text-center bg-accent">
              {carModel?.Make}
            </p>
          </div>

          <div className="w-full mt-4 flex flex-wrap gap-6">
            {data?.stoneeagle?.map((item, index) => (
              <div
                key={index}
                className="w-[600px] flex gap-4 shadow p-3 rounded"
              >
                <Image
                  className="w-max"
                  src={item.ProductImage}
                  alt={item?.PlanDescription}
                  height={100}
                  width={100}
                />
                <div className="w-full flex flex-col gap-2">
                  <h1 className="text-xl">{item?.PlanDescription} </h1>
                  <h3>{item?.DealNumber} </h3>
                  <div className="w-full flex justify-between items-center">
                    <p>
                      <span className="font-bold">Expires in</span>{" "}
                      {item.ExpirationDate}
                    </p>
                    <p>
                      <span className="font-bold">Mileage</span>{" "}
                      {item.ExpirationOdometer}
                    </p>
                  </div>
                  <div className="w-full flex justify-between bg-green-400 rounded p-2">
                    <p>Active</p>
                    <p>P# {item.ContractNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SimpleModal>
    </>
  );
};

export default CoveragesModal;
