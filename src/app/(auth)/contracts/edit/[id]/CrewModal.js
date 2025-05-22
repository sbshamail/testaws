import Input from "@/app/Components/Inputs/Input";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { unixTimestampToDate } from "@/app/functions";
import { GlobalContext } from "@/app/Provider";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import toast from "react-hot-toast";

const CrewModal = ({ isOpen, onClose, onSave, contractDetails }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [crewDetails, setCrewDetails] = useState(null);

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [userTitleId, setUserTitleId] = useState("");

  const fetchCrew = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractID", contractDetails?.ContractID);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/crew", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        return response.text(); // Log the raw text response to check if it's valid JSON
      })
      .then((text) => {
        try {
          const json = JSON.parse(text);
          if (json.success === 1) {
            setCrewDetails(json);
            setLoading(false);
          }
        } catch (error) {
          console.error("JSON parsing error:", error);
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
        setHasSearched(true);
      });
  };
  const handleSaveCrew = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    if (!userTitleId) {
      toast.error("Please select a slot");
    }
    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractID", contractDetails?.ContractID);
    formdata.append(
      "RowID",
      userTitleId === "3"
        ? 2
        : userTitleId === "5"
        ? 1
        : userTitleId === "6"
        ? 3
        : ""
    );

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/savepitcrew", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text(); // If it's not JSON, return the text
        }
      })
      .then((data) => {
        // If it's a JSON response
        if (typeof data === "object") {
          if (data.success === 1) {
            fetchCrew();
          }
        } else {
          // Handle non-JSON response (if necessary)
          // console.log("Non-JSON response:", data);
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
        setHasSearched(true);
      });
  };

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchCrew();
    }
  }, [GLOBAL_RESPONSE, contractDetails]);

  useEffect(() => {
    if (userTitleId) {
      toast.success("User Selected");
    }
  }, [userTitleId]);

  if (!isOpen) return null; // Modal visibility

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <SpinnerCenterScreen loading={loading} />
      <div className="bg-card text-card-foreground rounded-2xl max-w-3xl p-8 relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <span className="font-bold w-6 h-6 p-3 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer ">
            X
          </span>
        </button>

        <div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="absolute -top-16">
              {/* Big circle with background image */}
              {(crewDetails?.customerinfo?.CustomerImage ||
                crewDetails?.customerinfo?.AvatarImage) && (
                <div
                  className="bg-cover bg-center rounded-full w-32 h-32 mx-auto"
                  style={{
                    backgroundImage: `url(${
                      crewDetails?.customerinfo?.AvatarImage ||
                      crewDetails?.customerinfo?.CustomerImage
                    })`,
                    border: "6px solid white", // Added 16px white border
                  }}
                ></div>
              )}

              {/* Role name outside the image circle */}
            </div>
            {crewDetails?.customerinfo?.CustomerName && (
              <div className="mt-10">
                <h2 className="text-center text-2xl font-semibold mt-4">
                  {crewDetails?.customerinfo?.CustomerName}
                </h2>
                <p className="text-center text-lg  mt-2 font-semibold">
                  {crewDetails?.customerinfo?.CustomerName} needs a great team.
                  This allows {crewDetails?.customerinfo?.CustomerName} to reach
                  out to you when the need arises and well ....... who you gonna
                  call?
                </p>
              </div>
            )}
          </div>
          {crewDetails?.customerinfo?.CustomerName && (
            <h3 className="text-center text-2xl font-extrabold mt-4 ">
              Select Your Slot
            </h3>
          )}

          {/* Flex container for the three buttons with background images */}
          <div className="flex justify-around mt-4">
            {/* Advisor Slot with background image */}
            <div
              className="text-center relative"
              onClick={() => setUserTitleId("5")}
            >
              {/* Big circle with background image */}
              <div
                className="bg-cover bg-center rounded-full w-32 h-32 mx-auto relative"
                style={{
                  backgroundImage: `url(${
                    crewDetails?.advisor?.UserImage
                      ? crewDetails?.advisor?.UserImage
                      : ""
                  })`,
                }}
              >
                {/* Additional content can go here if needed */}

                <button
                  onClick={() => setUserTitleId("5")}
                  className={`absolute inset-0 m-auto z-10 ${
                    crewDetails?.IsAdvisor === 0
                      ? "bg-gray-500/40 text-white cursor-not-allowed"
                      : "bg-gray-500/30 text-white cursor-pointer"
                  } font-semibold py-2 px-4 rounded-full focus:outline-none focus:border-blue-500 focus:border-3`}
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                  }}
                  disabled={crewDetails?.IsAdvisor === 0}
                >
                  {crewDetails?.advisor?.Name
                    ? crewDetails?.advisor?.Name
                    : `Open Slot`}
                </button>
              </div>
              {/* Role name outside the image circle */}
              <p className="mt-4 text-lg font-medium text-secondary-foreground">
                Advisor
              </p>
            </div>

            {/* Sales Slot with background image */}
            <div
              className="text-center relative"
              onClick={() => setUserTitleId("3")}
            >
              {/* Big circle with background image */}
              <div
                className={`bg-cover bg-center rounded-full w-32 h-32 mx-auto relative cursor-pointer ${
                  userTitleId === "3" ? "border-3 border-primary" : ""
                }`}
                style={{
                  backgroundImage: `url(${
                    crewDetails?.sales?.UserImage
                      ? crewDetails?.sales?.UserImage
                      : ""
                  })`,
                }}
              >
                {/* Additional content can go here if needed */}
              </div>
              {/* Role name outside the image circle */}
              <p className="mt-4 text-lg font-bold text-siteBlue">Sales</p>
              <button
                className={`text-card-foreground`}
                disabled={crewDetails?.IsSales === 0} // Disable based on IsSales instead of IsFinance
              >
                {crewDetails?.sales?.Name
                  ? crewDetails?.sales?.Name
                  : `Open
                Slot`}
              </button>
            </div>

            {/* Finance Slot with background image */}
            <div className="text-center relative">
              {/* Big circle with background image */}
              <div
                className="bg-cover bg-center rounded-full w-32 h-32 mx-auto relative"
                style={{
                  backgroundImage: `url(${
                    crewDetails?.finance?.UserImage
                      ? crewDetails?.finance?.UserImage
                      : ""
                  })`,
                }}
              >
                {/* Additional content can go here if needed */}

                <button
                  onClick={() => setUserTitleId("6")}
                  className={`absolute inset-0 m-auto z-10 ${
                    crewDetails?.IsFinance === 0
                      ? "bg-gray-500/40 text-white cursor-not-allowed"
                      : "bg-gray-500/30 text-white cursor-pointer"
                  } font-semibold py-2 px-4 rounded-full focus:outline-none focus:border-blue-500 focus:border-3`}
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}
                  disabled={crewDetails?.IsFinance === 0}
                >
                  {crewDetails?.finance?.Name
                    ? crewDetails?.finance?.Name
                    : `Open
                Slot`}
                </button>
              </div>
              {/* Role name outside the image circle */}
              <p className="mt-4 text-lg font-medium text-secondary-foreground">
                Finance
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <CustomButton onClick={handleSaveCrew}>Save</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CrewModal;
// https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg
