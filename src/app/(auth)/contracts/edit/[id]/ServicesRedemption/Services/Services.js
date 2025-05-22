import React, { useContext } from "react";
import { EditContractContext } from "../../page";
import Service from "./Service";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { useEffect } from "react";
const Services = ({ redeemedservices, setredeemedservices }) => {
  const { services } = useContext(EditContractContext);
  //redeemedservices and services are same but redeem add checked, !hamza did this
  // console.log("redeemedservices", redeemedservices, services);
  return (
    <div key={services} className="w-full flex flex-col gap-2">
      <ShadowContainer>
        <div className="w-full grid grid-cols-5 font-semibold">
          <div className="col-span-1 flex justify-center">Available</div>
          <div className="col-span-1 flex justify-center">Services</div>
          <div className="flex justify-center">Used</div>
          <div className="flex justify-center">Price</div>
          <div className="flex justify-center">Detail</div>
        </div>
      </ShadowContainer>

      {redeemedservices.length == 0 && (
        <div className="col-span-5 text-center">No Services Found</div>
      )}

      <>
        {redeemedservices.map((service, i) => (
          <Service
            key={i}
            service={service}
            i={i}
            redeemedservices={redeemedservices}
            setredeemedservices={setredeemedservices}
          />
        ))}
      </>
    </div>
  );
};

export default Services;
