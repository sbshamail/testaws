import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CustomButton } from "@/components/cui/button/CustomButton";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import ProfilePictureUpload from "@/components/cui/imageInput/ProfilePictureUpload";
import { unixTimestampToDate } from "@/utils/helpers";

import { useRouter } from "next/navigation";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import Link from "next/link";
import ScheduleAppointmentModal from "./modal/ScheduleAppointmentModal";

const PlanInfoAction = ({ GetCustomerById, Plan, result, fetchCustomer }) => {
  const router = useRouter();
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = "0",
  } = GLOBAL_RESPONSE || {};

  const [selectedFile, setSelectedFile] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const {
    VehYear,
    SaleDate,
    Make,
    CustomerImage,
    ContractNo,
    Model,
    CustomerFName,
    DealerTitle,
    ValidityMileage,
    ValidityDate,
    PlanDescription,
  } = GetCustomerById || {};

  useEffect(() => {
    if (!selectedFile || selectedFile == "") {
      setSelectedFile(CustomerImage);
    }
  }, [CustomerImage]);

  const handleFileChange = async (file) => {
    const data = { CustomerID, ContractID, IsGuest, file_browse: file };
    const res = await fetchPostObj({
      auth,
      Token,
      data,
      api: "customer/profilepicupload",
      showToast: true,
      spinner: true,
    });
    if (res) {
      await fetchCustomer();
      setSelectedFile(file);
    }
  };
  function isValidUrl(str) {
    // Accepts both absolute and relative URLs
    try {
      new URL(str, window.location.origin);
      return true;
    } catch {
      return false;
    }
  }
  const openScheduleService = async () => {
    if (
      result?.ScheduleAppointment == "2" &&
      result?.ScheduleAppointmentUrl &&
      isValidUrl(result?.ScheduleAppointmentUrl)
    ) {
      window.open(result.ScheduleAppointmentUrl, "_blank");
    } else {
      setShowSchedule(true);
    }
  };

  return (
    <>
      <div className=" grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Picture and Info */}
              <div className="flex flex-col items-center md:items-start">
                <ProfilePictureUpload
                  selectedFile={selectedFile}
                  onFileChange={handleFileChange}
                  maxSizeInMB={1}
                  className="mb-4"
                  id="profile-picture"
                  showClear={false}
                />
                <div className="text-center md:text-left">
                  <p className="font-medium">{CustomerFName}</p>
                  <p className="text-sm text-muted-forground">
                    Max Allowed Size: 1MB
                  </p>
                </div>

                <CustomButton
                  variant="outline"
                  className="mt-3 w-full md:w-auto flex items-center gap-2"
                  onClick={() => router.push("/userProfile")}
                >
                  <FiUser className="h-4 w-4" />
                  MY PROFILE
                </CustomButton>
              </div>

              {/* Plan Details */}
              <div className="flex-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-forground">
                      Valid up to Date
                    </h3>
                    <p className="text-lg font-semibold ">
                      {unixTimestampToDate(ValidityDate)}
                    </p>
                    <Progress value={65} className="mt-2 h-2" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-forground">
                      Valid up to Mileage
                    </h3>
                    <p className="text-lg font-semibold ">{ValidityMileage}</p>
                    <Progress value={45} className="mt-2 h-2" />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 text-base font-medium">
                    Vehicle Information
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-forground">
                        Contract Number
                      </p>
                      <p className="font-medium">{ContractNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-forground">
                        Vehicle Make
                      </p>
                      <p className="font-medium">{Make}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-forground">
                        Vehicle Model
                      </p>
                      <p className="font-medium">{Model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-forground">
                        Vehicle Year
                      </p>
                      <p className="font-medium">{VehYear}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-forground">Plan</p>
                      <p className="font-medium">{PlanDescription}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-forground">Sale Date</p>
                      <p className="font-medium">
                        {unixTimestampToDate(SaleDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <CustomButton variant="primary" onClick={openScheduleService}>
              Schedule Service
            </CustomButton>
            <CustomButton variant="outline">
              <Link href="/customer/quick-specials">Quick Special</Link>
            </CustomButton>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Provider</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="mb-4 h-24 w-24 overflow-hidden rounded-md">
              <Image
                src="/images/print/cdjr.png"
                alt="Trident Auto Care Logo"
                className="h-full w-full object-contain"
                width={100}
                height={100}
              />
            </div>
            <h3 className="text-center text-primary font-semibold">
              {DealerTitle}
            </h3>
            <p className="text-center text-sm text-muted-forground">
              Service Provider
            </p>
          </CardContent>
        </Card>
      </div>
      {showSchedule && (
        <ScheduleAppointmentModal
          open={showSchedule}
          close={() => setShowSchedule(false)}
        />
      )}
    </>
  );
};

export default PlanInfoAction;
