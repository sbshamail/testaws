import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "@/app/Provider";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import { formatDate } from "@/utils/helpers";
import { MdDelete } from "react-icons/md";
import { EditContractContext } from "../../../../page";
import SimpleModal from "@/components/cui/modals/SimpleModal";

const RedemptionRewards = ({
  isOpen,
  onClose,
  contractDetails,
  setLoading,
  setXpRewardDelModal,
  setContractServiceId,
  rewardList,
  setRewardList,
  setDeleteXpCount,
  setDeleteXpRewardApi,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const { dealer } = useContext(EditContractContext);

  const [dealerXpRewards, setDealerXpRewards] = useState(null);

  const [page, setPage] = useState(0);
  const historyRef = useRef(null);
  // Scroll event handler
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = historyRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  // Load initial entries
  useEffect(() => {
    const loadMoreEntries = () => {
      const newEntries = rewardList?.slice(page * 20, (page + 1) * 20);
      setRewardList((prevEntries) => [...prevEntries, ...newEntries]);
    };

    loadMoreEntries();
  }, [page]);

  const fetchCustomerDealerXpPoints = async () => {
    const data = {
      ContractID: contractDetails?.ContractID,
    };
    const res = await fetchPostObj({
      api: "contracts/dealer_xprewards",
      auth,
      Token,
      data,
      setLoading,
    });
    if (res) {
      setDealerXpRewards(res);
      setRewardList(res?.rewardlist);
    }
  };

  useEffect(() => {
    fetchCustomerDealerXpPoints();
  }, [isOpen, contractDetails]);

  if (!isOpen) return null;
  const fetchXpReward = async ({ xp_points, name, id }) => {
    const data = {
      xp_points,
      name,
      id,
      ContractID: contractDetails?.ContractID,
      DealerID: dealer,
    };
    const res = await fetchPostObj({
      api: "contracts/xpreward",
      data,
      auth,
      Token,
      setLoading,
    });
    setRewardList(res?.rewardlist);
  };
  console.log(rewardList);
  return (
    <SimpleModal
      title={"Redemption Service (XP Points)"}
      open={isOpen}
      close={onClose}
    >
      <div className="flex p-4 my-4">
        {/* Services Table */}
        <div className="w-1/2 mr-4">
          <div className="bg-accent border p-2"> Services</div>
          <table className="min-w-full border">
            <thead className="bg-accent">
              <tr>
                <th className="py-2 px-4 border text-left">Reward Name</th>
                <th className="py-2 px-4 border text-left">Points</th>
                <th className="py-2 px-4 border text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {dealerXpRewards?.servicereward?.map((service, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{service.Reward}</td>
                  <td className="py-2 px-4 border">{service.xp_points}</td>
                  <td className="py-2 px-4 border">
                    <CustomButton
                      variant="success"
                      size="sm"
                      className={"whitespace-nowrap"}
                      onClick={() =>
                        fetchXpReward({
                          xp_points: service.xp_points,
                          name: service.Reward,
                          id: service?.xp_reward_id,
                        })
                      }
                    >
                      + Reward
                    </CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-2/3">
          <div
            className="overflow-y-auto max-h-96"
            ref={historyRef}
            onScroll={handleScroll}
          >
            <div className="bg-accent border p-2"> Rewards</div>
            <table className="min-w-full border">
              <thead className="bg-accent">
                <tr>
                  <th className="py-2 px-4 border text-left">Service Name</th>
                  <th className="py-2 px-4 border text-left">Date</th>
                  <th className="py-2 px-4 border text-left">Points</th>
                  <th className="py-2 px-4 border text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {rewardList?.map((entry, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{entry?.Name}</td>
                    <td className="py-2 px-4 border">
                      {formatDate(entry?.pointdate)}
                    </td>
                    <td className="py-2 px-4 border">{entry?.xp_point}</td>
                    <td className="py-2 px-4  border cursor-pointer ">
                      <div className="flex justify-center hover:text-red-500 Transition">
                        <MdDelete
                          onClick={() => {
                            setXpRewardDelModal(true);
                            setContractServiceId(entry?.ContractServiceID);
                            setDeleteXpCount(Number(entry?.xp_point ?? 0));
                            setDeleteXpRewardApi("contracts/deletedxpreward");
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default RedemptionRewards;
