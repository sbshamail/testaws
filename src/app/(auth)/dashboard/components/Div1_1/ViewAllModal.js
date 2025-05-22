import Image from "next/image";
import React, { useState, useEffect } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
const ViewAllModal = ({ isOpen, onClose, children, item, statuslist }) => {
  const [maintenancePolicies, setMaintenancePolicies] = useState([]);
  const [appFeatures, setAppFeatures] = useState([]);
  const [digitalMarketing, setDigitalMarketing] = useState([]);
  const [telematicsVehicleHealth, setTelematicsVehicleHealth] = useState([]);

  useEffect(() => {
    const appFeaturesList = statuslist?.filter(
      (item) => item.category === "App Features"
    );
    const maintenancePoliciesList = statuslist?.filter(
      (item) => item.category === "Maintenance Policies"
    );
    const digitalMarketingList = statuslist?.filter(
      (item) => item.category === "Digital Marketing"
    );
    const telematicsVehicleHealthList = statuslist?.filter(
      (item) => item.category === "Telematics + Vehicle Health"
    );

    setAppFeatures(appFeaturesList);
    setMaintenancePolicies(maintenancePoliciesList);
    setDigitalMarketing(digitalMarketingList);
    setTelematicsVehicleHealth(telematicsVehicleHealthList);
  }, [statuslist]);

  if (!isOpen) return null;
  const StatusCard = ({ item, statuslist }) => (
    <div
      className={`flex flex-row items-center gap-2 ${
        item.available === "0" ? " grayscale" : ""
      } ${
        item.text === "View All"
          ? "cursor-pointer hover:bg-gray-200 grayscale"
          : ""
      } rounded-lg`}
    >
      <Image
        src={"/images/" + item.src}
        width={40}
        height={40}
        alt={item.text}
      />
      <div
        className={`text-muted-foreground ${
          item.text === "Active Features"
            ? "text-xl font-bold leading-6 "
            : "leading-6 font-medium text-sm "
        }`}
      >
        {item.text}
      </div>
    </div>
  );

  return (
    <SimpleModal close={onClose} open={isOpen} title={"Active Features"}>
      <div
        className=""
        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to the overlay
      >
        <div className="">
          <div className="w-full text-2xl font-bold text-card-foreground px-12">
            Maintenance Policies
          </div>
          <div className="w-full grid px-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-4">
            {maintenancePolicies.map((item, i) => (
              <StatusCard key={i} item={item} showAll={true} />
            ))}
          </div>
          <div className="w-full text-2xl font-bold text-card-foreground px-12 my-2">
            App Features
          </div>
          <div className="w-full grid px-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-4">
            {appFeatures.map((item, i) => (
              <StatusCard key={i} item={item} />
            ))}
          </div>
          <div className="flex w-full">
            <div className="w-full">
              <div className="w-full text-2xl font-bold text-card-foreground px-12 my-2">
                Digital Marketing
              </div>
              <div className="w-full grid px-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-5 my-4">
                {digitalMarketing.map((item, i) => (
                  <StatusCard key={i} item={item} />
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="w-full text-2xl font-bold text-card-foreground px-12 my-2">
                Telematics + Vehicle Health
              </div>
              <div className="w-full grid px-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 my-4">
                {telematicsVehicleHealth.map((item, i) => (
                  <StatusCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default ViewAllModal;
