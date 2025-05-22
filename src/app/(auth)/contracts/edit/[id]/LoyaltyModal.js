import React, { useState, useEffect, useRef } from "react";

const LoyaltyModal = ({ isOpen, onClose }) => {
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

  // Scroll event handler
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = historyRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  if (!isOpen) return null; // If modal is not open, don't render it

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Redemption Service (XP Points)</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="flex">
          <div className=" w-2/5 "></div>
          <div className="w-3/5">
            <div className="bg-siteBlue text-white p-3 w-1/6">
              <h2 className="text-xl font-semibold">Authenticom LP</h2>
            </div>

            <div className="border border-gray-200 rounded-b-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                    History
                  </button>
                  <button className="px-4 py-2 bg-siteBlue text-white rounded-md hover:bg-siteBlue/80">
                    Redemption
                  </button>
                  <button className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70">
                    + Award Point
                  </button>
                  <button className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70">
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
                    <th className="border p-2 text-left">VIN</th>
                    <th className="border p-2 text-left">Deal #</th>
                    <th className="border p-2 text-left">Reason</th>
                    <th className="border p-2 text-left">Date</th>
                    <th className="border p-2 text-left">Ro</th>
                    <th className="border p-2 text-left">Action</th>
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
  );
};

export default LoyaltyModal;
