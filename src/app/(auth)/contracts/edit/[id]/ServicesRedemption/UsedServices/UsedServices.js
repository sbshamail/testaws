import React, { useContext, useState } from "react";
import { EditContractContext } from "../../page";

import { CustomButton } from "@/components/cui/button/CustomButton";
import { useTheme } from "@/utils/theme/themeProvider";

import { fetchPost } from "@/utils/action/function";

import { GlobalContext } from "@/app/Provider";

import PrintSelectedServices from "@/components/printModals/PrintSelectedServices";
import UsedService from "./UsedService";
import { Toastify } from "@/utils/helpers";

const UsedServices = () => {
  const { params, usedservices, services, contract, dealer } =
    useContext(EditContractContext);
  const { auth, Token } = useContext(GlobalContext);
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState(null);
  const formData = new FormData();
  const [selectedRows, setSelectedRows] = useState([]);
  const { toggleMode, theme } = useTheme();

  const requestForPrintSelectedService = async () => {
    formData.append("DealerID", dealer);
    formData.append("ContractID", params.id);
    // Append auth object as individual fields (assuming auth is an object)
    Object.keys(auth).forEach((key) => {
      formData.append(key, auth[key]);
    });
    selectedRows.forEach((item) => {
      formData.append("CouponIDs[]", item.CouponID);
    });

    const res = await fetchPost({
      url: "https://mypcp.us/webservices/contracts/printselectdservices",
      token: Token,
      formdata: formData,
    });
    if (res) {
      const { dealer_data, serviceinvoice, services } = res;
      const data = {
        dealer_data,
        serviceinvoice,
        services,
      };

      setContent(data);
      setModal(true);
    }
  };

  const handlePrintSelectedService = () => {
    if (selectedRows.length > 0) {
      requestForPrintSelectedService();
    } else {
      Toastify("error", "Please select at least one service");
    }
  };
  return (
    <>
      <PrintSelectedServices
        modal={modal}
        setModal={setModal}
        content={content}
        close={() => {
          setSelectedRows([]);
          setModal(false);
        }}
      />
      <div className="space-y-4">
        <div>
          <div key={usedservices} className="w-full ">
            {usedservices?.length === 0 && (
              <div
                className={`col-span-8 text-center py-4 ${
                  theme === "light" ? "bg-white" : "bg-[#061028]"
                }`}
              >
                {" "}
                No Used Services Found
              </div>
            )}

            <UsedService
              usedservices={usedservices}
              contract={contract}
              services={services}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </div>
        </div>

        <CustomButton
          className="flex ml-auto "
          onClick={handlePrintSelectedService}
        >
          Print Invoice For Selected Services
        </CustomButton>
      </div>
    </>
  );
};

export default UsedServices;
