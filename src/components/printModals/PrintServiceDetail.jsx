import { CustomButton } from "@/components/cui/button/CustomButton";
import { openHtmlInNewTab } from "@/utils/helpers";
import React from "react";

const PrintServiceDetail = ({ contractId }) => {
  const fetchService = async (id) => {
    const contractUrl = `https://mypcp.us/webservices/contracts/printcontractservices?ContractID=${id}`;
    const response = await fetch(contractUrl);
    const res = await response.json();
    if (res) {
      openHtmlInNewTab(res?.html);
    }
  };
  return (
    <div>
      <CustomButton
        className={"w-full"}
        onClick={() => fetchService(contractId)}
      >
        Print Services Details
      </CustomButton>
    </div>
  );
};

export default PrintServiceDetail;
