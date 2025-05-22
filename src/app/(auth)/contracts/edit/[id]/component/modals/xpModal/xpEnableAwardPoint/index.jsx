import { CustomButton } from "@/components/cui/button/CustomButton";
import React, { useContext, useRef, useState } from "react";
import RedemptionRewards from "./RedemptionRewards";

import MainTable from "@/components/cui/table/MainTable";
import { GlobalContext } from "@/app/Provider";
import { fetchPostObj } from "@/utils/action/function";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import XpRewardDeleted from "./XpRewardDeleted";

const XPEnableAwardPoint = ({
  servicelist,
  servicelistredeem,
  xp_count,
  contract,
  setLoading,
  setXpPoints,
}) => {
  const { auth, Token } = useContext(GlobalContext);

  //states for redemption rewards modal
  const [redemptionModal, setRedemptionModal] = useState(false);
  const [rewardList, setRewardList] = useState([]);
  //states for xp reward deleted
  const [xpRewardDelModal, setXpRewardDelModal] = useState(false);
  const [contractServiceId, setContractServiceId] = useState(null);
  const [deleteXpCount, setDeleteXpCount] = useState(0);
  const [deleteXpRewardApi, setDeleteXpRewardApi] = useState("");

  const handleAwardCustomerXpPoints = async (
    xpPoints,
    xpName,
    xpId,
    xpDealer
  ) => {
    const data = {
      ContractID: contract?.ContractID,
      xp_points: xpPoints,
      name: xpName,
      id: xpId,
      DealerID: xpDealer,
      setLoading,
    };
    const res = await fetchPostObj({
      api: "contracts/xpredeem",
      auth,
      data,
      Token,
      setLoading,
      showToast: true,
    });

    if (res) {
      setXpPoints((prev) => ({
        ...prev,
        servicelistredeem: res.servicelistredeem,
        xp_count: res.xp_count,
      }));
      console.log("AwardCustomerXpPoints", res);
    }
  };

  const ServiceListAction = ({ row }) => {
    return (
      <CustomButton
        className={"whitespace-nowrap"}
        size="sm"
        Icon={() => "+"}
        variant="success"
        onClick={() => {
          handleAwardCustomerXpPoints(
            row.xp_value,
            row.xp_key,
            row.xp_point_id,
            row.DealerID
          );
        }}
      >
        &nbsp; Award Points
      </CustomButton>
    );
  };
  const ServiceListRedeemAction = ({ row }) => {
    return row.xp_type === "1" || row.xp_type === "2" ? (
      <div className="flex items-center gap-2">
        <div className="flex justify-center hover:text-red-500 Transition cursor-pointer">
          <MdDelete
            className="text-xl"
            onClick={() => {
              setXpRewardDelModal(true);
              setContractServiceId(row?.ContractServiceID);
              setDeleteXpCount(Number(row?.xp_point ?? 0));
              setDeleteXpRewardApi("contracts/deletexppoint");
            }}
          />
        </div>
        {row.xp_type === "2" && (
          <Image src="/images/award.png" width={15} height={15} alt="award" />
        )}
      </div>
    ) : (
      ""
    );
  };

  const serviceListColumns = [
    { title: "Service Name", accessor: "xp_key" },
    { title: "Points", accessor: "xp_value" },
    {
      title: "Action",
      render: ServiceListAction,
      className: "whitespace-nowwrap",
    },
  ];
  const serviceListRedeemColumns = [
    { title: "Service Name", accessor: "Name" },
    { title: "Date", accessor: "pointdate", type: "date" },
    { title: "Points", accessor: "xp_point" },
    { title: "Action", render: ServiceListRedeemAction },
  ];
  return (
    <>
      <div className="flex p-4 my-4">
        <div className="w-1/2 mr-4">
          <div className="flex justify-between items-center mb-5 ">
            <h3 className="text-lg font-bold">Services</h3>
            <CustomButton onClick={() => setRedemptionModal(true)}>
              Redemption Rewards
            </CustomButton>
          </div>
          <MainTable
            tableWrapperClass={"h-full"}
            data={servicelist}
            columns={serviceListColumns}
          />
        </div>
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold">History</h3>
            <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
              Points :
              <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                {xp_count?.toLocaleString()}
              </span>
            </button>
          </div>
          <div className="shadow-lg p-2">
            <MainTable
              tableWrapperClass={"h-full"}
              columns={serviceListRedeemColumns}
              data={servicelistredeem}
            />
          </div>
        </div>
      </div>
      {redemptionModal && (
        <RedemptionRewards
          isOpen={redemptionModal}
          onClose={() => setRedemptionModal(false)}
          contractDetails={contract}
          setLoading={setLoading}
          setXpRewardDelModal={setXpRewardDelModal}
          setContractServiceId={setContractServiceId}
          rewardList={rewardList}
          setRewardList={setRewardList}
          setDeleteXpCount={setDeleteXpCount}
          setDeleteXpRewardApi={setDeleteXpRewardApi}
        />
      )}
      {xpRewardDelModal && (
        <XpRewardDeleted
          open={xpRewardDelModal}
          close={() => setXpRewardDelModal(false)}
          auth={auth}
          Token={Token}
          ContractID={contract?.ContractID}
          ContractServiceID={contractServiceId}
          setRewardList={setRewardList}
          setXpPoints={setXpPoints}
          deleteXpCount={deleteXpCount}
          api={deleteXpRewardApi}
        />
      )}
    </>
  );
};

export default XPEnableAwardPoint;
