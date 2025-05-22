import React, { useState } from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FiCalendar, FiFileText } from "react-icons/fi";
import { IoInfinite } from "react-icons/io5";
import ServiceGiftedModal from "./modal/ServiceGiftedModal";
import ServiceUsedModal from "./modal/ServiceUsedModal";
import ServiceRemainingModal from "./modal/ServiceRemainingModal";
const ServiceStatus = ({ customer, fetchCustomer }) => {
  const {
    gifted_services_count = 0,
    redeemed_services_count = 0,
    services_left = 0,
  } = customer || {};
  const [serviceGiftedModal, setServiceGiftedModal] = useState(false);
  const [serviceUsedModal, setServiceUsedModal] = useState(false);
  const [serviceRemainingModal, setServiceRemainingModal] = useState(false);
  return (
    <>
      <div className=" grid gap-4 md:grid-cols-3">
        <Card className="group Transition hover:shadow hover:shadow-amber-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground Transition group-hover:text-foreground/80">
              Service Gifted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-amber-500">
                {gifted_services_count}
              </span>
              <div className="rounded-full bg-amber-100 p-3">
                <FiCalendar className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CustomButton
              variant="ghost"
              size="sm"
              className="text-xs text-primary Transition group-hover:scale-125"
              onClick={() => setServiceGiftedModal(true)}
            >
              View Details
            </CustomButton>
          </CardFooter>
        </Card>

        <Card className="group Transition hover:shadow hover:shadow-primary/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80">
              Service Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary/90">
                {redeemed_services_count}
              </span>
              <div className="rounded-full bg-blue-100 p-3">
                <FiFileText className="h-6 w-6 text-primary/90" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CustomButton
              variant="ghost"
              size="sm"
              className="text-xs text-primary Transition group-hover:scale-125"
              onClick={() => setServiceUsedModal(true)}
            >
              View Details
            </CustomButton>
          </CardFooter>
        </Card>

        <Card className="group Transition hover:shadow hover:shadow-emerald-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80">
              Service Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-emerald-500">
                {services_left}
              </span>
              <div className="rounded-full bg-emerald-100 p-3">
                <IoInfinite className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <CustomButton
              variant="ghost"
              size="sm"
              className="text-xs text-primary Transition group-hover:scale-125"
              onClick={() => setServiceRemainingModal(true)}
            >
              View Details
            </CustomButton>
          </CardFooter>
        </Card>
      </div>
      {serviceGiftedModal && (
        <ServiceGiftedModal
          open={serviceGiftedModal}
          close={() => setServiceGiftedModal(false)}
          fetchCustomer={fetchCustomer}
        />
      )}
      {serviceUsedModal && (
        <ServiceUsedModal
          open={serviceUsedModal}
          close={() => setServiceUsedModal(false)}
        />
      )}
      {serviceRemainingModal && (
        <ServiceRemainingModal
          open={serviceRemainingModal}
          fetchCustomer={fetchCustomer}
          close={() => setServiceRemainingModal(false)}
        />
      )}
    </>
  );
};

export default ServiceStatus;
