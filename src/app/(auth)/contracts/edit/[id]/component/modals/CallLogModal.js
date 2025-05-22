"use client";
import { unixTimestampToDate } from "@/app/functions";
import { GlobalContext } from "@/app/Provider";

import React, { useState, useEffect, useRef, useContext } from "react";
import toast from "react-hot-toast";
import { useTheme } from "@/utils/theme/themeProvider";
const CallLogModal = ({
  callLogModal,
  toggleCallLogModal,
  contractDetails,
}) => {
  const colorIndicators = [
    "bg-black", // Black for the first row
    "bg-blue-500", // Blue for the second row
    "bg-yellow-500", // Yellow for the third row
    "bg-red-500", // Red for the fourth row
    "bg-green-500", // Green for the fifth row
    "bg-purple-500", // Purple for the sixth row
  ];

  const questions = [
    "CEP sent email with login info",
    "Customer knew about their MyPCP Program",
    "Customer visits are matching the service history",
    "Customer was satisfied with the sales department",
    "Customer was satisfied with the service department",
    "Customer has ability to access web portal or app",
  ];

  const gridColors = [
    { color: "bg-black", label: "Y" },
    { color: "bg-blue-500", label: "N" },
    { color: "bg-yellow-500", label: "Y" },
    { color: "bg-red-500", label: "N" },
    { color: "bg-green-500", label: "Y" },
    { color: "bg-purple-500", label: "N" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [callNoteData, setCallNoteData] = useState(null);
  const [customerCallNoteData, setCustomerCallNoteData] = useState([]);
  const [callDate, setCallDate] = useState(null);
  const [conversationNotes, setConversationNotes] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [comment, setComment] = useState(null);
  const [vin, setVin] = useState(callNoteData?.VIN);
  const [phone1, setPhone1] = useState(
    callNoteData?.PhoneHome?.slice(0, 3) || ""
  );
  const [phone2, setPhone2] = useState(
    callNoteData?.PhoneHome?.slice(4, 7) || ""
  );
  const [responses, setResponses] = useState(Array(questions.length).fill("")); // State for storing responses

  const [phone3, setPhone3] = useState(callNoteData?.PhoneHome?.slice(8) || "");
  const [isPcpUser, setIsPcpUser] = useState("2");
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  // Define an array of color codes corresponding to each row.
  const { toggleMode, theme } = useTheme();

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value; // Update the selected value for the question at the given index
    setResponses(newResponses);
  };

  const handleSaveCallNote = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractID", contractDetails?.ContractID);
    formdata.append("call_date", formatDate(callDate));
    formdata.append("call_notes", conversationNotes);
    formdata.append("callcepp", responses[0]);
    formdata.append("callknowmypcp", responses[1]);
    formdata.append("callvisit", responses[2]);
    formdata.append("callsales", responses[3]);
    formdata.append("callservice", responses[4]);
    formdata.append("callwebapp", responses[5]);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/savecallnote", {
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
            // setCarfaxData(json?.serviceHistory);
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
  const handleCustomerSatisfactionDeck = () => {
    if (phone1.length !== 3 || phone2.length !== 3 || phone3.length !== 4) {
      toast.error("Invalid Phone");
      return; // Stop execution if validation fails
    }

    // if (phone2.length !== 3) {
    //   toast.error("Invalid Phone.");
    //   return; // Stop execution if validation fails
    // }
    // if (phone2.length !== 4) {
    //   toast.error("Invalid Phone.");
    //   return; // Stop execution if validation fails
    // }

    // Validate VIN
    if (vin.length !== 13) {
      toast.error("Invalid VIN, VIN must be exactly 13 characters.");
      return; // Stop execution if validation fails
    }
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractID", contractDetails?.ContractID);
    formdata.append("DealerID", contractDetails?.DealerID);
    formdata.append("RatingFirstName", firstName);
    formdata.append("RatingLastName", lastName);
    formdata.append("Phone1", phone1);
    formdata.append("Phone2", phone2);
    formdata.append("Phone3", phone3);
    formdata.append("RatingComments", comment);
    formdata.append("IsPcpUser", isPcpUser);
    formdata.append("VIN", vin);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/savecallnote", {
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
            // setCarfaxData(json?.serviceHistory);
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
  const fetchCallNotes = () => {
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

    fetch("https://mypcp.us/webservices/contracts/customer_note", {
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
            setCallNoteData(json?.getcontractbyid);
            setCustomerCallNoteData(json?.getcustomercallnotes);
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

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchCallNotes();
    }
  }, [GLOBAL_RESPONSE, contractDetails?.ContractID]);

  if (!callLogModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-[#061028]"
        } rounded-lg w-5/6 px-7 py-4 relative shadow-lg`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={toggleCallLogModal}
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

        {/* Modal Layout */}
        <div className="flex">
          {/* Left Section: Customer Call Log */}
          <div className="w-1/2 p-1 border-r">
            <h2 className="text-lg font-bold mb-2">Customer Call Log</h2>
            <div className="mb-4">
              <h3 className="text-green-500 text-xl font-semibold">
                {callNoteData?.ContractNo}
              </h3>
              <div className="flex justify-between">
                <p>
                  {callNoteData?.CustomerFName} {callNoteData?.CustomerLName}
                </p>
                <p className="mr-4">Plan: {callNoteData?.PlanDescription}</p>
              </div>
              <div className="flex justify-between">
                <p>
                  Expiration Date:{" "}
                  {unixTimestampToDate(callNoteData?.ValidityDate)}
                </p>
                <p className="mr-4">
                  Expiration Mileage: {callNoteData?.ValidityMileage}
                </p>
              </div>
            </div>

            {/* Call Date and Notes */}
            <div className="mb-2 mr-4">
              <label className="block text-gray-700">Call Date</label>
              <input
                type="date"
                className="border w-full p-2 mt-1 rounded-md"
                value={callDate}
                onChange={(e) => setCallDate(e.target.value)} //
              />
            </div>
            <div className="mb-2 mr-4">
              <label className="block text-gray-700">Conversation Notes</label>
              <textarea
                rows="4"
                className="border w-full p-2 mt-1 rounded-md"
                placeholder="Enter conversation notes here"
                value={conversationNotes}
                onChange={(e) => setConversationNotes(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveCallNote}
                  className="bg-yellow-500 text-white font-bold py-2 px-4 mt-2 rounded-full"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Radio Button Section with Color Indicators */}
            <div>
              <h3 className="font-semibold mb-2">Customer Responses</h3>
              <table className="w-full text-center border-gray-300 border-collapse">
                <thead>
                  <tr className=" border-gray-300">
                    <th className=" border-gray-300 p-1"></th>{" "}
                    {/* Empty header for color */}
                    <th className=" border-gray-300 p-1">YES</th>
                    <th className=" border-gray-300 p-1">NO</th>
                    <th className=" border-gray-300 p-1">N/A</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((item, index) => (
                    <tr key={index} className="border-gray-300">
                      <td className=" border-gray-300 p-1">
                        {/* Color indicator */}
                        <span
                          className={`inline-block w-4 h-4 rounded-full ${colorIndicators[index]}`}
                        ></span>
                      </td>
                      <td className=" border-gray-300 p-1">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="Y"
                          checked={responses[index] === "Y"}
                          onChange={() => handleResponseChange(index, "Y")}
                        />
                      </td>
                      <td className=" border-gray-300 p-1">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="N"
                          checked={responses[index] === "N"}
                          onChange={() => handleResponseChange(index, "N")}
                        />
                      </td>
                      <td className=" border-gray-300 p-1">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="N/A"
                          checked={responses[index] === "N/A"}
                          onChange={() => handleResponseChange(index, "N/A")}
                        />
                      </td>
                      <td className=" border-gray-300 p-1 text-sm text-left">
                        {item}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {customerCallNoteData?.length > 0 && (
              <div className="pt-4">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h3 className="font-semibold">Customer Responses</h3>
                  </div>
                  <div>
                    <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full mr-4">
                      Export
                    </button>
                  </div>
                </div>
                <table className="w-full text-center border-gray-300 border-collapse">
                  <thead>
                    <tr className="border-gray-300 bg-gray-300 ">
                      <th className="border-gray-300 p-3 rounded-tl-2xl">
                        Call Date
                      </th>
                      <th className="border-gray-300 p-3 text-left">Notes</th>
                      <th className="border-gray-300 p-3 rounded-tr-2xl text-left">
                        Response
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerCallNoteData.map((item, index) => (
                      <tr className="border-gray-300" key={index}>
                        <td className="border-gray-300 p-1">
                          {formatDate(item?.call_date)}
                        </td>
                        <td className="border-gray-300 p-1 text-left">
                          {item?.call_notes}
                        </td>
                        <td className="border-gray-300 p-2">
                          {/* Color Grid */}
                          <div className="flex justify-start">
                            {[
                              { color: "bg-black", label: item?.callcepp },
                              {
                                color: "bg-blue-500",
                                label: item?.callknowmypcp,
                              },
                              {
                                color: "bg-yellow-500",
                                label: item?.callvisit,
                              },
                              { color: "bg-red-500", label: item?.callsales },
                              {
                                color: "bg-green-500",
                                label: item?.callservice,
                              },
                              {
                                color: "bg-purple-500",
                                label: item?.callwebapp,
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className={`w-9 h-8 flex items-center justify-center ${item.color} text-white font-bold text-sm`}
                              >
                                {item.label}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Section: Customer Satisfaction Deck */}
          <div className="w-1/2 p-4">
            <h2 className="text-lg font-bold mb-4">
              Customer Satisfaction Deck
            </h2>
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">To</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border w-full p-2 mt-1 rounded-md"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="border w-full p-2 mt-1 rounded-md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label className="block text-gray-700">VIN</label>
                <input
                  type="text"
                  className="border w-full p-2 mt-1 rounded-md"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                />
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="my-2">
              <label className="block text-gray-700">Phone</label>
              <div className="flex gap-2">
                <div className="w-full">
                  <input
                    type="text"
                    className="border w-full p-2 mt-1 rounded-md"
                    value={phone1} // Use state variable here
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only digits and limit to 3 characters
                      if (/^\d{0,3}$/.test(value)) {
                        setPhone1(value);
                      }
                    }}
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    className="border w-full p-2 mt-1 rounded-md"
                    value={phone2} // Shows middle 3 digits
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,3}$/.test(value)) {
                        setPhone2(value);
                      }
                    }}
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    className="border w-full p-2 mt-1 rounded-md"
                    value={phone3} // Shows last 4 digits
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,4}$/.test(value)) {
                        // Allow up to 4 digits for the last part
                        setPhone3(value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <textarea
              rows="3"
              className="border w-full p-2 mt-1 rounded-md"
              placeholder="Enter Comment Here"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            {/* PCP User Selection */}
            <div className="mt-4">
              <label className="block text-gray-700">Is PCP User?</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    checked={isPcpUser === "1"}
                    onChange={() => setIsPcpUser("1")}
                    className=""
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    checked={isPcpUser === "2"}
                    onChange={() => setIsPcpUser("2")}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCustomerSatisfactionDeck}
                className="bg-siteBlue text-white font-bold py-2 px-4 rounded-md"
              >
                Update Phone
              </button>
              <button className="bg-siteOrange text-white font-bold py-2 px-4 rounded-md">
                Non PCP Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLogModal;
