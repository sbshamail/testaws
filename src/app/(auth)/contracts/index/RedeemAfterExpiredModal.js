import { GlobalContext } from "@/app/Provider";
import React, { useState, useEffect, useRef, useContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const RedeemAfterExpiredModal = ({
  isOpen,
  onClose,
  contractId,
  actualStatus,
  updateRedeemStatus,
}) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [redeemAfterExpire, setRedeemAfterExpire] = useState(null);
  const isReasonValid = reason.length >= 20;
  // console.log("actualStatus", actualStatus);

  const tableData = [
    {
      id: 1,
      date: "2024-10-10",
      reason: "Request extension due to system error",
      status: "Pending",
    },
    {
      id: 2,
      date: "2024-10-15",
      reason: "Customer delayed submission",
      status: "Approved",
    },
  ];

  const handleRedeemAfterExpireData = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractID", contractId);
    formdata.append("ActualStatus", actualStatus);
    formdata.append("Reason", reason);
    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/afterexpiredredeemallow", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("Raw response:", response);
        return response.text(); // Get raw XML text
      })
      .then((text) => {
        try {
          // Parse the XML response
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");

          // Extract values from XML
          const success =
            xmlDoc.getElementsByTagName("success")[0]?.textContent;
          const message = xmlDoc.getElementsByTagName("msg")[0]?.textContent;

          if (success === "1") {
            setLoading(false);
            updateRedeemStatus(actualStatus === 1 ? 0 : 1);
            onClose();
            setReason("");
            toast.success("Redeem After Expired Enabled Successfully");
          } else if (success === "0") {
            onClose();
            setReason("");

            updateRedeemStatus(actualStatus === 1 ? 0 : 1);

            toast.error(message || "An error occurred");
            setLoading(false);
          }
        } catch (error) {
          console.error("XML parsing error:", error);
          setLoading(false);
          toast.error("An error occurred while parsing the response.");
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirmClick = () => {
    // Trigger SweetAlert confirmation modal
    Swal.fire({
      title: "Are you sure?",
      text:
        actualStatus == 1
          ? "Do you want to enable redeem services after expiry?"
          : "Do you want to disable redeem services after expiry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with the data handling function
        handleRedeemAfterExpireData();
      }
    });
  };
  const fetchRedeemAfterExpireData = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractID", contractId);
    formdata.append("ActualStatus", actualStatus);
    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/allredeemafterexpired", {
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
            setRedeemAfterExpire(json?.pause_reason);
            setLoading(false);
          } else if (json.success === 0) {
            toast.error(json?.message);
            setLoading(false);
          }
        } catch (error) {
          console.error("JSON parsing error:", error);
          toast.error("Failed to parse server response.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // console.log("setRedeemAfterExpire", redeemAfterExpire);
  useEffect(() => {
    fetchRedeemAfterExpireData();
  }, [actualStatus]);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleCancel = () => {
    setReason("");
    close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Redeem After Expired
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Warning message */}
        <div className="p-4 bg-red-100 text-red-700 rounded-md mx-6 my-4">
          <p className="text-center font-semibold">
            {actualStatus == 1
              ? "Are you sure you want to Enabled redeem services after expired?"
              : "Are you sure you want to Disabled redeem services after expired?"}
          </p>
        </div>

        {/* Input Reason */}
        <div className="px-6">
          <label className="block text-gray-700 font-medium mb-2">
            Enter Reason
          </label>
          <textarea
            value={reason}
            onChange={handleReasonChange} // Update reason on change
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="REASON..."
            rows="3"
          />
          <p className="text-red-500 text-sm mt-1">
            * Reason. Minimum 20 characters.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 px-6 my-7">
          <button
            onClick={handleConfirmClick}
            disabled={!isReasonValid} // Disable if reason is less than 20 characters
            className={`bg-siteBlue text-white font-bold py-2 px-8 rounded-md hover:bg-siteBlue/80 ${
              !isReasonValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white font-bold py-2 px-8 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                  Sr.#
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                  Date
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                  Reason
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {redeemAfterExpire?.length > 0 ? (
                redeemAfterExpire.map((row, index) => (
                  <tr key={row.id}>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      {new Date(row.DateAdded).toLocaleDateString("en-US")}
                    </td>

                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      {row?.Reason}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      <span
                        className={`px-3 py-[6px] rounded ${
                          row.ActualStatus == 1
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {row.ActualStatus == 1 ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-200 px-4 py-2 text-center text-gray-700"
                    colSpan="4"
                  >
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Close button */}
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white font-bold py-2 px-8 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedeemAfterExpiredModal;
