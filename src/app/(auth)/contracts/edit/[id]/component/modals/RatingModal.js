"use client";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { GlobalContext } from "@/app/Provider";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useTheme } from "@/utils/theme/themeProvider";

const RatingModal = ({ ratingModal, toggleRatingModal, contractDetails }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [rating, setRating] = useState([]);
  const { toggleMode, theme } = useTheme();

  const fetchRating = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("ContractID", contractDetails?.ContractID);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/customer_ratting", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("Raw response:", response);
        return response.text();
      })
      .then((text) => {
        try {
          const json = JSON.parse(text);
          if (json.success === 1) {
            setRating(json?.history);
            setLoading(false);
          }
        } catch (error) {
          console.error("JSON parsing error:", error);
          toast.error("Failed to parse server response.");
        }
      })
      .catch((error) => {
        console.log({ error });
        setLoading(false);
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
        setHasSearched(true);
      });
  };

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchRating();
    }
  }, [contractDetails, GLOBAL_RESPONSE]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
  if (!ratingModal) return null; // Do not render if isOpen is false

  return (
    <div>
      <button
        onClick={toggleRatingModal}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Open Rating History
      </button>

      {ratingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className={`${
              theme === "light" ? "bg-white" : "bg-[#061028]"
            } rounded-lg shadow-lg w-full mx-20 p-6 overflow-auto h-auto relative`}
          >
            {/* Close icon */}
            <button
              onClick={toggleRatingModal}
              className="absolute top-5 right-6 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              Rating History
            </h2>
            {loading ? (
              <div className="w-full flex justify-center items-center">
                <SpinnerLoader />
              </div>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Sr.#
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Rating Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Rating Comments
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Star Rating
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Rating Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rating.map((rate, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rate?.RatingDate ? formatDate(rate.RatingDate) : "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rate?.RatingComments}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} role="img" aria-label="star">
                            {i < rate?.Rating ? "⭐" : ""}
                          </span>
                        ))}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rate?.IsPcpUser === "1" ? "PCP" : "NON PCP "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={toggleRatingModal}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingModal;
