import React, { useState, useEffect, useRef, useContext } from "react";
import RedeemAuthenticomLp from "./xpModal/PasswordFieldKaminsky/RedeemAuthenticomLp";
import SaleServicePoint from "./xpModal/PasswordFieldKaminsky/SaleServicePoint";
import AwardPoint from "./xpModal/PasswordFieldKaminsky/AwardPoint";
import { GlobalContext } from "@/app/Provider";
import RedemptionRewards from "./xpModal/xpEnableAwardPoint/RedemptionRewards";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

import { HiQuestionMarkCircle } from "react-icons/hi";

import toast from "react-hot-toast";
import EnrollNewCar from "../../EnrollNewCar";
import AwardPointVehicleCoverage from "./xpModal/EnableVehicleCoverageLP/AwardPointVehicleCoverage";
import RedeemAuthenticomLpVehicleCoverage from "./xpModal/EnableVehicleCoverageLP/RedeemAuthenticomLpVehicleCoverage";
import SaleServicePointVehicleCoverage from "./xpModal/EnableVehicleCoverageLP/SaleServicePointVehicleCoverage";
import RedeemCashAward from "../../RedeemCashAward";
import AwardCash from "../../AwardCash";

const XpModal = ({ isOpen, onClose, contractDetails }) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [isActiveTab, setActiveTab] = useState("LP"); // Default active tab
  const [redeemAuthenticomLpModal, setRedeemAuthenticomLpModal] =
    useState(false);
  const [redeemAuthenticomCashLpModal, setRedeemAuthenticomCashLpModal] =
    useState(false);
  const [
    redeemAuthenticomLpVehicleCoverageModal,
    setRedeemAuthenticomLpVehicleCoverageModal,
  ] = useState(false);
  const [awardModal, setAwardModal] = useState(false);
  const [awardCashModal, setAwardCashModal] = useState(false);
  const [awardVehicleCoverageModal, setAwardVehicleCoverageModal] =
    useState(false);

  const [saleServiceModal, setSaleServiceModal] = useState(false);
  const [saleServiceVehicleCoverageModal, setSaleServiceVehicleCoverageModal] =
    useState(false);
  const [enrollNewCar, setEnrollNewCar] = useState(false);
  const [redemptionModal, setRedemptionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerXpPoints, setCustomerXpPoints] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [switchTab, setSwitchTab] = useState("LCA");
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv")
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Invalid file format. Please select a .xlsx or .csv file.");
    }
  };
  // Sample data arrays
  const services = [
    { name: "Customer Refers Another", points: "30,000" },
    { name: "Service During Tournament", points: "50,000" },
    { name: "Test Drive", points: "75,000" },
    // Add more services if needed
  ];

  const history = [
    { name: "Chats From App", date: "10/08/2024", points: 5 },
    { name: "Re-logging In", date: "10/07/2024", points: 1 },
    { name: "Staying Logged In", date: "10/06/2024", points: 2 },
    { name: "Sharing An Idea", date: "10/02/2024", points: 1 },
    { name: "Idea Submission", date: "10/01/2024", points: 1 },
    { name: "Re-logging In", date: "09/30/2024", points: 1 },
    { name: "Re-logging In", date: "09/20/2024", points: 1 },
    { name: "Chats From App", date: "09/18/2024", points: 5 },
    { name: "Staying Logged In", date: "09/17/2024", points: 2 },
    { name: "Re-logging In", date: "09/15/2024", points: 2 },
    { name: "Chats From App", date: "10/08/2024", points: 5 },
    { name: "Re-logging In", date: "10/07/2024", points: 1 },
    { name: "Staying Logged In", date: "10/06/2024", points: 2 },
    { name: "Sharing An Idea", date: "10/02/2024", points: 1 },
    { name: "Idea Submission", date: "10/01/2024", points: 1 },
    { name: "Re-logging In", date: "09/30/2024", points: 1 },
    { name: "Re-logging In", date: "09/20/2024", points: 1 },
    { name: "Chats From App", date: "09/18/2024", points: 5 },
    { name: "Staying Logged In", date: "09/17/2024", points: 2 },
    { name: "Re-logging In", date: "09/15/2024", points: 2 },
    { name: "Chats From App", date: "10/08/2024", points: 5 },
    { name: "Re-logging In", date: "10/07/2024", points: 1 },
    { name: "Staying Logged In", date: "10/06/2024", points: 2 },
    { name: "Sharing An Idea", date: "10/02/2024", points: 1 },
    { name: "Idea Submission", date: "10/01/2024", points: 1 },
    { name: "Re-logging In", date: "09/30/2024", points: 1 },
    { name: "Re-logging In", date: "09/20/2024", points: 1 },
    { name: "Chats From App", date: "09/18/2024", points: 5 },
    { name: "Staying Logged In", date: "09/17/2024", points: 2 },
    { name: "Re-logging In", date: "09/15/2024", points: 2 },
    { name: "Chats From App", date: "10/08/2024", points: 5 },
    { name: "Re-logging In", date: "10/07/2024", points: 1 },
    { name: "Staying Logged In", date: "10/06/2024", points: 2 },
    { name: "Sharing An Idea", date: "10/02/2024", points: 1 },
    { name: "Idea Submission", date: "10/01/2024", points: 1 },
    { name: "Re-logging In", date: "09/30/2024", points: 1 },
    { name: "Re-logging In", date: "09/20/2024", points: 1 },
    { name: "Chats From App", date: "09/18/2024", points: 5 },
    { name: "Staying Logged In", date: "09/17/2024", points: 2 },
    { name: "Re-logging In", date: "09/15/2024", points: 2 },
    { name: "Chats From App", date: "10/08/2024", points: 5 },
    { name: "Re-logging In", date: "10/07/2024", points: 1 },
    { name: "Staying Logged In", date: "10/06/2024", points: 2 },
    { name: "Sharing An Idea", date: "10/02/2024", points: 1 },
    { name: "Idea Submission", date: "10/01/2024", points: 1 },
    { name: "Re-logging In", date: "09/30/2024", points: 1 },
    { name: "Re-logging In", date: "09/20/2024", points: 1 },
    { name: "Chats From App", date: "09/18/2024", points: 5 },
    { name: "Staying Logged In", date: "09/17/2024", points: 2 },
    { name: "Re-logging In", date: "09/15/2024", points: 2 },
    // Add more history entries if needed
  ];

  // State to manage displayed history entries
  const [displayedHistory, setDisplayedHistory] = useState([]);
  const [page, setPage] = useState(0);
  const historyRef = useRef(null);

  // Load initial entries
  useEffect(() => {
    const loadMoreEntries = () => {
      const newEntries = history.slice(page * 20, (page + 1) * 20);
      setDisplayedHistory((prevEntries) => [...prevEntries, ...newEntries]);
    };
    loadMoreEntries();
  }, [page]);

  const fetchCustomerXpPoints = () => {
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

    fetch("https://mypcp.us/webservices/contracts/customer_xppoints", {
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
            setCustomerXpPoints(json);
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
      });
  };
  const handleAwardCustomerXpPoints = (xpPoints, xpName, xpId, xpDealer) => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractID", customerXpPoints?.ContractID);
    formdata.append("xp_points", xpPoints);
    formdata.append("name", xpName);
    formdata.append("id", xpId);
    formdata.append("DealerID", xpDealer);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/customer_xppoints", {
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
            setCustomerXpPoints(json);
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
      });
  };

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchCustomerXpPoints();
    }
  }, [contractDetails]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Scroll event handler
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = historyRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (!isOpen) return null; // If modal is not open, don't render it

  return (
    <div>
      {/* Rewards One Modal Left and Right  */}
      {contractDetails?.xp_enable == 1 && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12">
            <div className="px-4 py-3 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Redemption Service (XP Points)
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            {loading ? (
              <div className="w-full flex justify-center items-center my-4">
                <SpinnerLoader />
              </div>
            ) : (
              <div className="flex p-4 my-4">
                <div className="w-1/2 mr-4">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold">Services</h3>
                    <button
                      onClick={() => setRedemptionModal(true)}
                      className="bg-siteBlue text-white font-bold py-2 px-5 rounded-full hover:bg-siteBlue/70 focus:outline-none"
                    >
                      Redemption Rewards
                    </button>
                  </div>
                  <table className="min-w-full border">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4 border text-left">
                          Service Name
                        </th>
                        <th className="py-2 px-4 border text-left">Points</th>
                        <th className="py-2 px-4 border text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerXpPoints?.servicelist?.map((xp, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border">{xp.xp_key}</td>
                          <td className="py-2 px-4 border">{xp.xp_value}</td>
                          <td className="py-2 px-4 border">
                            <button
                              onClick={() =>
                                handleAwardCustomerXpPoints(
                                  xp.xp_value,
                                  xp.xp_key,
                                  xp.xp_point_id,
                                  xp.DealerID
                                )
                              }
                              className="bg-[#5cb85c] text-white px-2 py-1 rounded text-sm"
                            >
                              + Award Points
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-2/3">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold">History</h3>
                    <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
                      Points :
                      <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                        {customerXpPoints?.xp_count?.toLocaleString()}
                      </span>
                    </button>
                  </div>
                  <div
                    className="overflow-y-auto max-h-96"
                    ref={historyRef}
                    onScroll={handleScroll}
                  >
                    <table className="min-w-full border">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="py-2 px-4 border text-left">
                            Service Name
                          </th>
                          <th className="py-2 px-4 border text-left">Date</th>
                          <th className="py-2 px-4 border text-left">Points</th>
                          <th className="py-2 px-4 border text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerXpPoints?.servicelistredeem?.map(
                          (entry, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border">{entry.Name}</td>
                              <td className="py-2 px-4 border">
                                {formatDate(entry.pointdate)}{" "}
                              </td>
                              <td className="py-2 px-4 border">
                                {entry.xp_point}
                              </td>
                              <td className="py-2 px-4 border">-</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <RedemptionRewards
        isOpen={redemptionModal}
        onClose={() => setRedemptionModal(false)}
        contractDetails={contractDetails}
      />
      {/* Password Fields one  */}
      {contractDetails?.EnableLoyaltyCash == 1 &&
        contractDetails?.EnableKaminskyLoyaltyProgram == 1 &&
        contractDetails.xp_enable == 0 && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Redemption Service (XP Points)
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="flex">
                <div className=" w-2/5"></div>
                <div className="w-3/5">
                  <div className="flex gap-2">
                    <div
                      className={`flex-none text-center px-5 py-5 rounded-t-lg ${
                        isActiveTab === "LP"
                          ? "bg-siteBlue text-white"
                          : "bg-gray-100 text-gray-600"
                      } cursor-pointer transition duration-200`}
                      onClick={() => setActiveTab("LP")}
                    >
                      <h2 className="text-base font-semibold">
                        Authenticom LP
                      </h2>
                    </div>
                    <div
                      className={`flex-none text-center px-5 py-5 rounded-t-lg ${
                        isActiveTab === "XP"
                          ? "bg-siteBlue text-white"
                          : "bg-gray-100 text-gray-600"
                      } cursor-pointer transition duration-200`}
                      onClick={() => setActiveTab("XP")}
                    >
                      <h2 className="text-base font-semibold">
                        Authenticom XP
                      </h2>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-b-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-x-2">
                        <button className="px-4 py-2">History</button>
                        <button
                          onClick={() => setRedeemAuthenticomLpModal(true)}
                          className="px-4 py-2 bg-siteBlue text-white rounded-md hover:bg-siteBlue/80"
                        >
                          Redemption
                        </button>
                        <button
                          onClick={() => setAwardCashModal(true)}
                          className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
                        >
                          + Award Point
                        </button>
                        <button
                          onClick={() => setSaleServiceModal(true)}
                          className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
                        >
                          + Add Sale/Service Point
                        </button>
                      </div>
                      <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
                        Current Points :
                        <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                          4545454
                        </span>
                      </button>
                    </div>

                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border  py-1 px-4 text-left">VIN</th>
                          <th className="border  py-1 px-4 text-left">
                            Deal #
                          </th>
                          <th className="border  py-1 px-4 text-left">
                            Reason
                          </th>
                          <th className="border  py-1 px-4 text-left">Date</th>
                          <th className="border  py-1 px-4 text-left">Ro</th>
                          <th className="border  py-1 px-4 text-left">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border py-1 px-4">4682364835</td>
                          <td className="border py-1 px-4"></td>
                          <td className="border py-1 px-4">Pts Sales</td>
                          <td className="border py-1 px-4">10/05/2024</td>
                          <td className="border py-1 px-4">572349543</td>
                          <td className="border py-1 px-4">
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value="2,000.00"
                                className="w-24 bg-white border rounded px-2 py-1"
                                readOnly
                              />
                              <select className="border rounded px-2 py-1 w-full">
                                <option value="pts-service">
                                  PTS SERVICE - SERVICE (250.00)
                                </option>
                              </select>
                              <button className="px-4 bg-siteBlue text-white rounded hover:bg-siteBlue/80">
                                ✓
                              </button>
                              <button className="px-4 bg-red-500 text-white rounded hover:bg-red-600">
                                ✕
                              </button>
                            </div>
                            <div className="relative mt-2">
                              <input
                                type="password"
                                placeholder="Password"
                                className="pl-8 w-full border rounded px-2 py-1"
                              />
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                🔒
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-4 flex justify-end">
                      <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        <span className="mr-2">🖨️</span>
                        Print Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      <RedeemAuthenticomLp
        isOpen={redeemAuthenticomLpModal}
        onClose={() => setRedeemAuthenticomLpModal(false)}
      />
      <AwardPoint
        isOpen={awardCashModal}
        onClose={() => setAwardCashModal(false)}
      />
      <SaleServicePoint
        isOpen={saleServiceModal}
        onClose={() => setSaleServiceModal(false)}
      />

      {/* My Car Modal  */}
      {contractDetails?.EnableLoyaltyCashPoint == 1 &&
        contractDetails?.EnableLoyaltyCash == 1 && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Redemption Service (XP Points)
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="flex">
                <div className=" w-2/5"></div>
                <div className="w-3/5">
                  <div className="flex gap-2 justify-between">
                    <div className="flex">
                      <div
                        className={`flex-none text-center px-5 py-5 rounded-t-lg ${
                          switchTab === "LCA"
                            ? "bg-siteBlue text-white"
                            : "bg-gray-100 text-gray-600"
                        } cursor-pointer transition duration-200`}
                        onClick={() => setSwitchTab("LCA")}
                      >
                        <h2 className="text-base font-semibold">
                          Loyalty Cash Award
                        </h2>
                      </div>
                      <div
                        className={`flex-none text-center px-5 py-5 rounded-t-lg ${
                          switchTab === "CAR"
                            ? "bg-siteBlue text-white"
                            : "bg-gray-100 text-gray-600"
                        } cursor-pointer transition duration-200`}
                        onClick={() => setSwitchTab("CAR")}
                      >
                        <h2 className="text-base font-semibold">My Car</h2>
                      </div>
                    </div>
                    {switchTab === "CAR" && (
                      <div
                        onClick={() => setEnrollNewCar(true)}
                        className="px-5 py-1 flex justify-center items-center rounded-xl bg-siteOrange text-white m-3 cursor-pointer"
                      >
                        Enroll New Car
                      </div>
                    )}
                  </div>
                  {switchTab === "LCA" ? (
                    <div className="border border-gray-200 rounded-b-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="space-x-2">
                          <button className="px-4 py-2">History</button>
                          <button
                            onClick={() =>
                              setRedeemAuthenticomCashLpModal(true)
                            }
                            className="px-4 py-2 bg-siteBlue text-white rounded-md hover:bg-siteBlue/80"
                          >
                            Redemption
                          </button>
                          <button
                            onClick={() => setAwardModal(true)}
                            className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
                          >
                            + Award Cash
                          </button>
                        </div>
                        <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
                          Current Balance :
                          <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                            4545454
                          </span>
                        </button>
                      </div>

                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border  py-1 px-4 text-left">VIN</th>
                            <th className="border  py-1 px-4 text-left">
                              Reason
                            </th>
                            <th className="border  py-1 px-4 text-left"></th>
                            <th className="border  py-1 px-4 text-left">
                              Date
                            </th>
                            <th className="border  py-1 px-4 text-left">Ro</th>
                            <th className="border  py-1 px-4 text-left">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border flex gap-1 items-center py-1 px-4">
                              4682364835
                              <div
                                className="relative flex items-center"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                              >
                                <HiQuestionMarkCircle className="cursor-pointer text-siteBlue" />
                                {showTooltip && (
                                  <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-gray-700 text-white rounded shadow-lg whitespace-nowrap">
                                    PREVIOUS REPAIR HISTORY Dummy
                                  </div>
                                )}
                              </div>{" "}
                            </td>
                            <td className="border py-1 px-4">Service</td>
                            <td className="border py-1 px-4">Service</td>
                            <td className="border py-1 px-4">10/05/2024</td>
                            <td className="border py-1 px-4">572349543</td>
                            <td className="border py-1 px-4">+$55.55</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="mt-4 flex justify-end">
                        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                          <span className="mr-2">🖨️</span>
                          Print Receipt
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-b-lg p-4">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border  py-1 px-4 text-left">
                              VIN#
                            </th>
                            <th className="border  py-1 px-4 text-left">
                              Make
                            </th>
                            <th className="border  py-1 px-4 text-left">
                              Model
                            </th>
                            <th className="border  py-1 px-4 text-left">
                              Year
                            </th>
                            <th className="border  py-1 px-4 text-left">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border flex gap-1 items-center py-1 px-4">
                              5J6RT6H50NL009895
                            </td>
                            <td className="border py-1 px-4">HONDA</td>
                            <td className="border py-1 px-4">Civic</td>
                            <td className="border py-1 px-4">2022</td>
                            <td className="border py-1 px-4">
                              <FaThumbsUp className="text-siteBlue" />
                            </td>
                          </tr>
                          <tr>
                            <td className="border flex gap-1 items-center py-1 px-4">
                              5J6RT6H50NL009895
                            </td>
                            <td className="border py-1 px-4">HONDA</td>
                            <td className="border py-1 px-4">Civic</td>
                            <td className="border py-1 px-4">2022</td>
                            <td className="border py-1 px-4">
                              <FaThumbsDown className="text-siteOrange" />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="mt-4 flex justify-end">
                        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                          <span className="mr-2">🖨️</span>
                          Print Receipt
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      {/* modal */}
      <RedeemCashAward
        isOpen={redeemAuthenticomCashLpModal}
        onClose={() => setRedeemAuthenticomCashLpModal(false)}
      />
      {/* modal */}
      <AwardCash isOpen={awardModal} onClose={() => setAwardModal(false)} />
      {/* modal */}
      <EnrollNewCar
        isOpen={enrollNewCar}
        onClose={() => setEnrollNewCar(false)}
      />

      {/* Authenticom LP Program Statement */}
      {contractDetails?.EnableLoyaltyPointStatement == 1 &&
        contractDetails?.EnableKaminskyLoyaltyProgram == 1 &&
        contractDetails?.EnableLoyaltyCash == 1 && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Redemption Service (XP Points)
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="flex">
                <div className=" w-2/5"></div>
                <div className="w-3/5">
                  <div className="flex gap-2 justify-between">
                    <div className="flex">
                      <div
                        className={`flex-none text-center px-5 py-5 rounded-t-lg bg-siteBlue text-white`}
                      >
                        <h2 className="text-base font-semibold">
                          Authenticom LP
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-b-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-x-2">
                        <button className="px-4 py-2">History</button>
                      </div>
                      <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
                        Current Points :
                        <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                          4545454
                        </span>
                      </button>
                    </div>

                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border  py-1 px-4 text-left">VIN</th>
                          <th className="border  py-1 px-4 text-left">
                            Deal #
                          </th>
                          <th className="border  py-1 px-4 text-left">
                            Reason
                          </th>
                          <th className="border  py-1 px-4 text-left">Date</th>
                          <th className="border  py-1 px-4 text-left">Ro</th>
                          <th className="border  py-1 px-4 text-left">
                            Action
                          </th>
                          <th className="border  py-1 px-4 text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border flex gap-1 items-center py-1 px-4">
                            4682364835
                            <div
                              className="relative flex items-center"
                              onMouseEnter={() => setShowTooltip(true)}
                              onMouseLeave={() => setShowTooltip(false)}
                            >
                              <HiQuestionMarkCircle className="cursor-pointer text-siteBlue" />
                              {showTooltip && (
                                <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-gray-700 text-white rounded shadow-lg whitespace-nowrap">
                                  PREVIOUS REPAIR HISTORY Dummy
                                </div>
                              )}
                            </div>{" "}
                          </td>
                          <td className="border py-1 px-4 text-center">
                            Service
                          </td>
                          <td className="border py-1 px-4 text-center">
                            5000 Sale Points
                          </td>
                          <td className="border py-1 px-4 text-center">
                            10/05/2024
                          </td>
                          <td className="border py-1 px-4 text-center">
                            572349543
                          </td>
                          <td className="border py-1 px-4 text-center">
                            +$55.55
                          </td>
                          <td className="border py-1 px-3 text-center ">
                            <FaTrashAlt className="text-red-500 w-full text-center" />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-4 flex justify-end gap-3">
                      <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        <span className="mr-2">🖨️</span>
                        Print Receipt
                      </button>
                      <button className="flex bg-siteBlue text-white items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-siteBlue/80">
                        Program Statement
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Authenticom LP  */}
      {contractDetails?.EnableLoyaltyCash == 1 &&
        contractDetails?.EnableKaminskyLoyaltyProgram == 1 &&
        contractDetails?.EnableLoyaltyPointStatement == 0 && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Redemption Service (XP Points)
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="flex">
                <div className=" w-2/5"></div>
                <div className="w-3/5">
                  <div className="flex gap-2 justify-between">
                    <div className="flex">
                      <div
                        className={`flex-none text-center px-5 py-5 rounded-t-lg bg-siteBlue text-white`}
                      >
                        <h2 className="text-base font-semibold">
                          Authenticom LP
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-b-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-x-2">
                        <button className="px-4 py-2">History</button>
                      </div>
                      <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
                        Current Points :
                        <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                          4545454
                        </span>
                      </button>
                    </div>

                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border  py-1 px-4 text-left">VIN</th>
                          <th className="border  py-1 px-4 text-left">
                            Deal #
                          </th>
                          <th className="border  py-1 px-4 text-left">
                            Reason
                          </th>
                          <th className="border  py-1 px-4 text-left">Date</th>
                          <th className="border  py-1 px-4 text-left">Ro</th>
                          <th className="border  py-1 px-4 text-left">
                            Action
                          </th>
                          <th className="border  py-1 px-4 text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border flex gap-1 items-center py-1 px-4">
                            4682364835
                            <div
                              className="relative flex items-center"
                              onMouseEnter={() => setShowTooltip(true)}
                              onMouseLeave={() => setShowTooltip(false)}
                            >
                              <HiQuestionMarkCircle className="cursor-pointer text-siteBlue" />
                              {showTooltip && (
                                <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-gray-700 text-white rounded shadow-lg whitespace-nowrap">
                                  PREVIOUS REPAIR HISTORY Dummy
                                </div>
                              )}
                            </div>{" "}
                          </td>
                          <td className="border py-1 px-4 text-center">
                            Service
                          </td>
                          <td className="border py-1 px-4 text-center">
                            5000 Sale Points
                          </td>
                          <td className="border py-1 px-4 text-center">
                            10/05/2024
                          </td>
                          <td className="border py-1 px-4 text-center">
                            572349543
                          </td>
                          <td className="border py-1 px-4 text-center">
                            +$55.55
                          </td>
                          <td className="border py-1 px-3 text-center ">
                            <FaTrashAlt className="text-red-500 w-full text-center" />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-4 flex justify-end">
                      <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        <span className="mr-2">🖨️</span>
                        Print Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Authenticom LP With History Options and Documents*/}
      {contractDetails?.EnableVehicleCoverageLP == 1 && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12">
            <div className="px-4 py-3 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Redemption Service (XP Points)
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="flex">
              <div className=" w-2/5"></div>
              <div className="w-3/5">
                <div className="flex gap-2">
                  <div
                    className={`flex-none text-center px-5 py-5 rounded-t-lg ${
                      isActiveTab === "LP"
                        ? "bg-siteBlue text-white"
                        : "bg-gray-100 text-gray-600"
                    } cursor-pointer transition duration-200`}
                    onClick={() => setActiveTab("LP")}
                  >
                    <h2 className="text-base font-semibold">
                      Vehicle Coverage LP
                    </h2>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-b-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-x-2">
                      <button className="px-4 py-2">History</button>
                      <button
                        onClick={() =>
                          setRedeemAuthenticomLpVehicleCoverageModal(true)
                        }
                        className="px-4 py-2 bg-siteBlue text-white rounded-md hover:bg-siteBlue/80"
                      >
                        Redemption
                      </button>
                      <button
                        onClick={() => setAwardVehicleCoverageModal(true)}
                        className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
                      >
                        + Award Point
                      </button>
                      <button
                        onClick={() => setSaleServiceVehicleCoverageModal(true)}
                        className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
                      >
                        + Add Sale/Service Point
                      </button>
                    </div>
                    <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
                      Current Points :
                      <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                        4545454
                      </span>
                    </button>
                  </div>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border  py-1 px-4 text-left">VIN</th>
                        <th className="border  py-1 px-4 text-left">Reason</th>
                        <th className="border  py-1 px-4 text-left">Date</th>
                        <th className="border  py-1 px-4 text-left">Ro</th>
                        <th className="border  py-1 px-4 text-left">Action</th>
                        <th className="border  py-1 px-4 text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border flex gap-1 items-center py-1 px-4">
                          4682364835
                          <div
                            className="relative flex items-center"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                            <HiQuestionMarkCircle className="cursor-pointer text-siteBlue" />
                            {showTooltip && (
                              <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-gray-700 text-white rounded shadow-lg whitespace-nowrap">
                                PREVIOUS REPAIR HISTORY Dummy
                              </div>
                            )}
                          </div>{" "}
                        </td>{" "}
                        <td className="border py-1 px-4">New Reason </td>
                        <td className="border py-1 px-4">10/05/2024</td>
                        <td className="border py-1 px-4">412641268</td>
                        <td className="border py-1 px-4">+$55.20</td>
                        <td className="border py-1 px-3 text-center ">
                          <FaTrashAlt className="text-red-500 w-full text-center" />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-4 flex justify-end">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                      <span className="mr-2">🖨️</span>
                      Print Receipt
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-full">
                      <label className="block text-gray-700">
                        Document Type
                      </label>
                      <div className="w-full flex flex-col">
                        <select className="border p-[9.5px] rounded-md w-full bg-gray-100">
                          <option value="nothing">Nothing Selected</option>
                          <option value="passport">Passport</option>
                          <option value="driver_license">
                            Driver&rsquo;s License
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 my-2">
                    <div className="w-full flex items-center bg-gray-100 rounded-md">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center gap-2 bg-siteBlue text-white font-bold px-4 py-2 rounded-md cursor-pointer shadow hover:opacity-70 transition-colors duration-300"
                      >
                        <GrGallery />
                        Choose
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        // accept=".xlsx,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {selectedFile && (
                        <span className="ml-4 text-gray-700 font-medium truncate">
                          {selectedFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 mt-5">
                    <button className="bg-siteOrange text-white px-8 py-2 rounded-md">
                      Save
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-red-500 text-white px-8 py-2 rounded-md"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modals */}
      <RedeemAuthenticomLpVehicleCoverage
        isOpen={redeemAuthenticomLpVehicleCoverageModal}
        onClose={() => setRedeemAuthenticomLpVehicleCoverageModal(false)}
      />
      <AwardPointVehicleCoverage
        isOpen={awardVehicleCoverageModal}
        onClose={() => setAwardVehicleCoverageModal(false)}
      />
      <SaleServicePointVehicleCoverage
        isOpen={saleServiceVehicleCoverageModal}
        onClose={() => setSaleServiceVehicleCoverageModal(false)}
      />
    </div>
  );
};

export default XpModal;
