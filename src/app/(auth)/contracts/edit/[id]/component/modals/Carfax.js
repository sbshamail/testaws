import Input from "@/app/Components/Inputs/Input";
import { GlobalContext } from "@/app/Provider";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import toast from "react-hot-toast";

const Carfax = ({ isOpen, onClose, contractDetails }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [vin, setVin] = useState(contractDetails?.VIN);
  const [carfaxData, setCarfaxData] = useState("");

  // State to manage displayed history entries
  const [displayedHistory, setDisplayedHistory] = useState([]);
  const [page, setPage] = useState(0);
  const historyRef = useRef(null);
  const [displayedHistory2, setDisplayedHistory2] = useState([]);
  const [page2, setPage2] = useState(0);
  const historyRef2 = useRef(null);
  // Load initial entries

  // Scroll event handler
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = historyRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Load initial entries

  // Scroll event handler
  const handleScroll2 = () => {
    const { scrollTop, scrollHeight, clientHeight } = historyRef2.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage2((prevPage) => prevPage + 1);
    }
  };

  const fetchCarfaxData = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE || {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("VIN", vin);
    formdata.append("ContractID", contractDetails?.ContractID);
    formdata.append("ContractNo", contractDetails?.ContractNo);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/carfaxvindetail", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("Raw response:", response);
        return response.text(); // Log the raw text response to check if it's valid JSON
      })
      .then((text) => {
        try {
          const json = JSON.parse(text);
          if (json.success === 1) {
            setCarfaxData(json?.serviceHistory);
          } else if (json.success === 0) {
            toast.error(json?.message);
          }
        } catch (error) {
          console.error("JSON parsing error:", error);
          toast.error("Failed to parse server response.");
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
    fetchCarfaxData();
  }, []);
  useEffect(() => {
    const loadMoreEntries = () => {
      const newEntries = carfaxData?.serviceCategories?.slice(
        page2 * 20,
        (page2 + 1) * 20
      );

      if (newEntries && newEntries.length > 0) {
        setDisplayedHistory(newEntries);
      }
    };

    loadMoreEntries();
  }, [page2, carfaxData]);

  useEffect(() => {
    const loadMoreEntries = () => {
      const newEntries = carfaxData?.displayRecords?.slice(
        page2 * 20,
        (page2 + 1) * 20
      );

      if (newEntries && newEntries.length > 0) {
        setDisplayedHistory2(newEntries);
      }
    };

    loadMoreEntries();
  }, [page2, carfaxData]);

  // console.log("displayedHistory2", displayedHistory2);

  const services = [
    { heading: "VIN", values: carfaxData?.vin },
    { heading: "Make", values: carfaxData?.make },
    { heading: "Model", values: carfaxData?.model },
    { heading: "Year", values: carfaxData?.year },
    {
      heading: "Body Type Description	",
      values: carfaxData?.bodyTypeDescription,
    },
    { heading: "Engine Information", values: carfaxData?.engineInformation },
    { heading: "Drive Line", values: carfaxData?.driveline },
    {
      heading: "Number of Service",
      values: carfaxData?.numberOfServiceRecords,
    },
    // Add more services if needed
  ];
  if (!isOpen) return null; // If modal is not open, don't render it

  return (
    <SimpleModal
      title={
        <span className="flex items-center">
          Vehicle Detail &nbsp; &nbsp;
          <Image
            src="/images/carfax-icon.png"
            width={170}
            height={100}
            alt="carfax icon"
            className="object-contain cursor-pointer"
          />
        </span>
      }
      open={isOpen}
      close={onClose}
      className={"mt-auto max-w-[1100px] m-auto"}
    >
      <div>
        <div className="flex justify-center w-full mt-4">
          <div className="w-2/4">
            <Input
              value={vin}
              setvalue={setVin}
              placeholder="VIN"
              type="text"
              bgcolor="gray-100"
              className={"pr-16 z-10 "}
              suffix={() => (
                <div
                  onClick={fetchCarfaxData}
                  className="z-0  overflow-hidden p-1 mr-1 hover:bg-secondary Transition 
                      flex items-center justify-center  rounded-lg border border-gray-500
                      text-xs text-gray-500 "
                >
                  DECODE
                </div>
              )}
              loading={loading}
              width={"full"}
            />
            {/* <Input
              placeholder="VIN"
              type="text"
              value={vin}
              setvalue={setVin}
              image={"/images/decode.svg"}
              onImageClick={fetchCarfaxData}
              loading={loading}
              width={"full"}
            /> */}
          </div>
        </div>
        <div className="flex p-4 my-2">
          {/* Services Table */}
          {carfaxData?.vin && (
            <div className="w-1/2 mr-4">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold">Vehicle Information</h3>
              </div>
              <table className="min-w-full border">
                {/* <thead className="bg-secondary">
                <tr>
                  <th className="py-2 px-4 border text-left">Service Name</th>
                  <th className="py-2 px-4 border text-left">Points</th>
                </tr>
              </thead> */}
                <tbody>
                  {services.map((service, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">{service.heading}</td>
                      <td className="py-2 px-4 border">{service.values}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* History Table */}
          <div className="flex flex-col w-full">
            {displayedHistory?.length > 0 && (
              <div className="full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-bold">Service Categories</h3>
                </div>

                {/* History Table with scrolling */}
                <div
                  className="overflow-y-auto max-h-72"
                  ref={historyRef}
                  onScroll={handleScroll}
                >
                  <table className="min-w-full border">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="py-2 px-4 border text-left">Sr.#</th>
                        <th className="py-2 px-4 border text-left">Date</th>
                        <th className="py-2 px-4 border text-left">
                          Service Name
                        </th>
                        <th className="py-2 px-4 border text-left">Mileage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedHistory.map((entry, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border">{index + 1}</td>
                          <td className="py-2 px-4 border">
                            {entry.dateOfLastService}
                          </td>
                          <td className="py-2 px-4 border">
                            {entry.serviceName}
                          </td>
                          <td className="py-2 px-4 border">
                            {entry.odometerOfLastService}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {displayedHistory2?.length > 0 && (
              <div className="full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-bold">Service History</h3>
                </div>

                {/* History Table with scrolling */}
                <div
                  className="overflow-y-auto max-h-72"
                  ref={historyRef2}
                  onScroll={handleScroll2}
                >
                  <table className="min-w-full border">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="py-2 px-4 border text-left">Sr.</th>
                        <th className="py-2 px-4 border text-left">Date</th>
                        <th className="py-2 px-4 border text-left">Type</th>
                        <th className="py-2 px-4 border text-left">Name</th>
                        <th className="py-2 px-4 border text-left">Mileage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedHistory2.map((entry, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border">{index + 1}</td>
                          <td className="py-2 px-4 border">
                            {entry.displayDate}
                          </td>
                          <td className="py-2 px-4 border">{entry.type}</td>
                          <td className="py-2 px-4 border">
                            {
                              entry?.text && entry.text.length > 0
                                ? entry.text.map((textItem, idx) => (
                                    <React.Fragment key={idx}>
                                      {textItem}
                                      <br />
                                    </React.Fragment>
                                  ))
                                : "N/A" // Fallback if text array is empty or undefined
                            }
                          </td>
                          <td className="py-2 px-4 border">
                            {entry?.odometer}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default Carfax;
