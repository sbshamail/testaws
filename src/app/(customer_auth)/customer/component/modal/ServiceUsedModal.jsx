import { GlobalContext } from "@/app/Provider";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Table from "@/components/cui/table";
import { fetchPostObj } from "@/utils/action/function";
import React, { useContext, useEffect, useState } from "react";

const ServiceUsedModal = ({ open, close }) => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { customer_id: CustomerID, ContractID } = GLOBAL_RESPONSE || {};
  const fetchServicesUsed = async () => {
    const data = { ContractID, CustomerID, IsGuest: 0 };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "customer/servicesusedbox",
      setLoading,
      data,
    });
    setData(res);
  };
  useEffect(() => {
    fetchServicesUsed();
  }, []);
  const columns = [
    { title: "#", accessor: "total" },
    { title: "Service Used", accessor: "CouponTitle" },
    { title: "Mileage", accessor: "CouponMileage" },
  ];
  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        title={"VIEW SERVICES USED"}
        className={"min-h-56"}
      >
        <SpinnerCenterScreen loading={loading} center={true} />
        {!data?.GetContractCouponCount_used?.length > 0 ? (
          <div className="p-2 rounded bg-yellow-600">No Service Used</div>
        ) : (
          <Table columns={columns} data={data.GetContractCouponCount_used} />
        )}
      </SimpleModal>
    </div>
  );
};

export default ServiceUsedModal;
