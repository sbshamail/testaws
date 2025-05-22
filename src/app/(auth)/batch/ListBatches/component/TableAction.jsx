import { GlobalContext } from "@/app/Provider";
import MouseTooltip from "@/components/cui/tooltip/MouseTooltip";
import { fetchPost, fetchPostObj } from "@/utils/action/function";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { BsEnvelopeFill } from "react-icons/bs";
import { FaEdit, FaHandshake } from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import {
  MdDelete,
  MdLocalPrintshop,
  MdModeEditOutline,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

import Print from "./Print";
import { jsonToExcel } from "@/utils/generateExcel";
import PaidoutModal from "@/app/Components/PaidoutModal";
import PrintInvoice from "./PrinInvoice";

const TableAction = ({ row, setOffSet, setLoading }) => {
  const { auth, Token } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const [printInvoiceData, setPrintInvoiceData] = useState(null);

  const [printRemitData, setPrintRemitData] = useState(null);
  const [printInvoiceModal, setPrintInvoiceModal] = useState(false);
  const [printRemitModal, setPrintRemitModal] = useState(false);
  const [paidModal, setPaidModal] = useState(false);

  const handlePrint = async (batchId) => {
    const data = {
      BatchID: batchId,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "batch/printinvoice",
      data,
      showToast: true,
    });
    if (res) {
      setPrintInvoiceData(res);
      setPrintInvoiceModal(true);
      const getUser = await fetchPost({
        token: Token,
        api: `batch/preparedby?CreatedBy=${res?.GetBatchStatus?.CreatedBy}`,
        method: "get",
      });
      setUser(getUser?.user);
    }
  };

  const handlePrintRemit = async (batchId) => {
    const data = {
      BatchID: batchId,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "batch/printinvoice",
      data,
      showToast: true,
    });

    if (res) {
      setPrintRemitData(res);
      setPrintRemitModal(true);
      const getUser = await fetchPost({
        token: Token,
        api: `batch/preparedby?CreatedBy=${res?.GetBatchStatus?.CreatedBy}`,
        method: "get",
      });
      setUser(getUser?.user);
    }
  };
  const handleExportRecievedBatch = async (batchId) => {
    const data = {
      BatchID: batchId,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "batch/batchexport",
      data,
    });

    if (res) {
      const data = res.batchexport;
      jsonToExcel(data, "listbatch");
    }
  };
  const handleSaveBatchPaymentModal = (batchId) => {
    setPaidModal(true);
  };
  const handleDeleteBatch = async () => {
    const data = { BatchID: row.Batchid };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "batch/deletebatch",
      data,
      showToast: true,
      setLoading,
    });
    if (res) {
      setOffSet("0");
    }
  };
  return (
    <>
      <div className="flex justify-start gap-3 items-center">
        <div className="flex gap-3">
          {(row.Status === "p" || row.Status === "P") && (
            <MouseTooltip content="Delete">
              <div
                onClick={() => handleDeleteBatch(row?.Batchid)}
                className="relative group cursor-pointer "
              >
                <MdDelete className="text-xl hover:scale-125" />
              </div>
            </MouseTooltip>
          )}
          {(row.Status === "p" || row.Status === "P") && (
            <Link
              className="text-[#4081EC] hover:underline"
              href={`/batch/ListBatches/RemitBatch/id=${row?.Batchid}`}
            >
              <MouseTooltip content="Remit Batch">
                <div className="relative group cursor-pointer">
                  <FaEdit className="text-xl hover:scale-125" />
                </div>
              </MouseTooltip>
            </Link>
          )}
          <MouseTooltip content="Print Invoice">
            <div
              onClick={() => handlePrint(row.Batchid)}
              className="relative group cursor-pointer"
            >
              <MdLocalPrintshop className="text-xl hover:scale-125" />
            </div>
          </MouseTooltip>
          <MouseTooltip content="Print Remit">
            <div
              onClick={() => handlePrintRemit(row.Batchid)}
              className="relative group cursor-pointer"
            >
              <IoIosPrint className="text-xl hover:scale-125" />
            </div>
          </MouseTooltip>
          <Link
            className=""
            href={`/batch/ListBatches/GetUsersToEmailInvoice/id=${row?.Batchid}`}
          >
            <MouseTooltip content="Email">
              <div className="relative group cursor-pointer">
                <BsEnvelopeFill className="w-5 h-5" />
              </div>
            </MouseTooltip>
          </Link>
          <Link
            className=""
            href={`/batch/ListBatches/ListContractsUnderBatch/id=${row?.Batchid}`}
          >
            <MouseTooltip content="View">
              <div className="relative group cursor-pointer">
                <MdOutlineRemoveRedEye className="text-xl hover:scale-125" />
              </div>
            </MouseTooltip>
          </Link>
          {(row.Status === "r" || row.Status === "R") && (
            <MouseTooltip content=" Export Recieved Batch">
              <div
                onClick={() => handleExportRecievedBatch(row.Batchid)}
                className="relative group cursor-pointer"
              >
                <RiFileExcel2Fill className="text-xl hover:scale-125 text-[#20A164]" />
              </div>
            </MouseTooltip>
          )}
          {(row.Status === "r" || row.Status === "R") && (
            <>
              {row.Status === "r" ||
              (row.Status === "R" &&
                !row.ReceivedDate &&
                !row.MoneyTransferredtoReserves) ? (
                <MouseTooltip content="Paidout Date">
                  <div
                    onClick={() => handleSaveBatchPaymentModal(row.Batchid)}
                    className="relative group cursor-pointer"
                  >
                    <BsEnvelopeFill className="text-xl hover:scale-125 text-green-400" />
                  </div>
                </MouseTooltip>
              ) : (
                <>
                  {row.ReceivedDate &&
                  row.MoneyTransferredtoReserves === null ? (
                    <MouseTooltip content="Payment Received Date">
                      <div className="relative group cursor-pointer">
                        <LuCalendarDays className="text-xl hover:scale-125 text-[#127899]" />
                      </div>
                    </MouseTooltip>
                  ) : row.ReceivedDate !== "" &&
                    row.MoneyTransferredtoReserves !== "" ? (
                    <div className="relative group cursor-pointer">
                      <FaHandshake className="text-xl hover:scale-125" />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {printInvoiceModal && (
        <PrintInvoice
          res={printInvoiceData}
          auth={auth}
          user_name={user?.Name}
          close={() => setPrintInvoiceModal(false)}
          open={printInvoiceModal}
        />
      )}
      {printRemitModal && (
        <Print
          res={printRemitData}
          auth={auth}
          user_name={user?.Name}
          close={() => setPrintRemitModal(false)}
          open={printRemitModal}
        />
      )}
      {paidModal && (
        <PaidoutModal
          open={paidModal}
          close={() => setPaidModal(false)}
          batchId={row?.Batchid}
          auth={auth}
          Token={Token}
          setOffSet={setOffSet}
        />
      )}
    </>
  );
};

export default TableAction;
