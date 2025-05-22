import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { fetchPostObj } from "@/utils/action/function";
//ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainTable from "@/components/cui/table/MainTable";
import { formatDate } from "@/utils/helpers";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";

const ServiceGiftedModal = ({ open, close, fetchCustomer }) => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = 0,
    PrimaryEmail,
  } = GLOBAL_RESPONSE || {};
  const fetchServicesGifted = async () => {
    const data = { ContractID, CustomerID, IsGuest };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "customer/servicesgiftedbox",
      setLoading,
      data,
    });
    setData(res);
  };
  useEffect(() => {
    fetchServicesGifted();
  }, []);

  const columns = [
    { title: "Service Name", accessor: "Gifted_CouponTitle" },
    {
      title: "Gifted Date",
      render: ({ row }) => {
        return formatDate(row.GiftedDate);
      },
    },
    { title: "No. of Services", accessor: "Gifted_CouponCount" },
  ];
  const handleResendEmail = async (Email) => {
    const data = {
      ContractID,
      CustomerID,
      IsGuest,
      ContractNo: PrimaryEmail,
      Email,
    };
    await fetchPostObj({
      auth,
      Token,
      api: "customer/resendemail",
      showToast: true,
      setLoading,
      data,
    });
  };
  const handleRollBack = async (ContractNo) => {
    const data = { ContractID, CustomerID, IsGuest, ContractNo };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "customer/rollbackgifteddervice",
      showToast: true,
      setLoading,
      data,
    });
    if (res) {
      await fetchCustomer();
      close();
    }
  };
  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        title={"VIEW GIFTED SERVICES"}
        className={"min-h-56"}
      >
        <SpinnerCenterScreen loading={loading} center={true} />
        {!data?.GetGiftedContractById?.length > 0 ? (
          <div className="p-2 rounded bg-yellow-600">No Service Gifted</div>
        ) : (
          <>
            <Accordion type="single" collapsible className="w-full">
              {data.GetGiftedContractById.map((item, index) => {
                return (
                  <AccordionItem
                    key={index}
                    value={index + 1}
                    className="border-none "
                  >
                    <AccordionTrigger
                      className={`bg-blue-600 rounded p-2 border-none  text-foreground ${
                        index === 0 ? "mt-0" : "mt-2"
                      }`}
                    >
                      <span>{item.GiftedTo_Email}</span>
                    </AccordionTrigger>
                    <AccordionContent className="border-2 border-border rounded p-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <DancingLoadingButton
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleRollBack(item.GiftedTo_ContractNo)
                            }
                            loading={loading}
                          >
                            Roll Back
                          </DancingLoadingButton>
                          <DancingLoadingButton
                            variant="success"
                            size="sm"
                            onClick={() =>
                              handleResendEmail(item.GiftedTo_Email)
                            }
                            loading={loading}
                          >
                            Resend Email
                          </DancingLoadingButton>
                        </div>
                        <MainTable
                          columns={columns}
                          data={item?.GetGiftedEmailServices}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        )}
      </SimpleModal>
    </div>
  );
};

export default ServiceGiftedModal;
