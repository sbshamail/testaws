import Select from "@/app/Components/Inputs/Select";
import React, { useState, useContext, useEffect } from "react";
import { EditContractContext } from "./page";
import { FaExclamationCircle } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { FcExpired } from "react-icons/fc";
import PlanDetailModal from "./PlanDetailModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ResellContractModal({ onClose, resellContractModal, contractId }) {
  const { contract, setResellPlanClicked, setResellPlanId } =
    useContext(EditContractContext);
  const router = useRouter();

  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(null);
  const [showPlanDetail, setShowPlanDetail] = useState(false);

  useEffect(() => {
    setPlans(contract?.Plans || []);
  }, [resellContractModal, contract]);

  const planslist = plans?.map((plan, i) => ({
    text: plan.PlanDescription,
    value: plan.PlanID,
  }));
  const matchedPlan = contract?.Plans.find((p) => p.PlanID == plan);

  let customerPrice = matchedPlan ? matchedPlan.customerprice : null;

  function resellPlanId() {
    if (!plan) {
      toast.error("Please select a plan");
      return;
    }
    router.push(`/contracts/resell/${contractId}/plan=${plan}`);
    setResellPlanId(plan);
    setResellPlanClicked("1");
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center z-50 pt-10">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-8 border-2 border-gray-400">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-600 flex gap-2 justify-center items-center">
            <FaExclamationCircle className="w-4 h-4" />
            RESELL CONTRACT
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700 font-semibold text-sm text-center my-2 tracking-wide flex gap-2 justify-center items-center">
          THIS CUSTOMER&lsquo;S CONTRACT HAS EXPIRED
          <FcExpired className="w-5 h-5" />
        </p>
        <div className="flex justify-between my-5">
          <button
            onClick={resellPlanId}
            className="bg-[#5cb85c] hover:bg-[#5cb85c]/80 text-white font-semibold py-3 px-4 rounded-xl w-1/2 mr-2 tracking-wide"
          >
            Resell a new plan
          </button>
          <button className="bg-siteOrange hover:bg-siteOrange/80 text-white font-semibold py-3 px-4 rounded-xl w-1/2 ml-2 tracking-wide">
            Continue without Reselling
          </button>
        </div>
        <div className="mb-4 flex justify-center items-center gap-2">
          <Select
            options={planslist}
            value={plan || null}
            setvalue={setPlan}
            onSelectionChange={(e) => setPlan(e.target.value)}
            placeholder={"Select Plan to Offer"}
            bgcolor="bg-[#ffffff]"
            width={"full"}
          />
          <div className="text-slate-600 font-semibold px-5 py-[6px] text-lg tracking-wide bg-gray-100 rounded-2xl border border-gray-300">
            $
            {!isNaN(customerPrice) && customerPrice !== null
              ? Number(customerPrice).toFixed(0)
              : 0}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowPlanDetail(true)}
            className="font-semibold text-base text-gray-600 hover:underline"
          >
            View selected plans services
          </button>
        </div>
        {showPlanDetail && (
          <PlanDetailModal onClose={() => setShowPlanDetail(false)} />
        )}
      </div>
    </div>
  );
}
export default ResellContractModal;
