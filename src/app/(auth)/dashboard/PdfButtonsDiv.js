import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { Button } from "@nextui-org/react";
import React, { useContext } from "react";
import { DashboardContext } from "./DashboardContext";

function PdfButtonsDiv() {
  const {
    dealersetting,
    startdate,
    enddate,
    FixedDateParameter,
    dealerredemption,
    reservedGraphData,
    setPdfCheck,
    pdfLoader1,
    pdfLoader2,
    pdfLoader3,
  } = useContext(DashboardContext);

  const isDisabled = !(
    dealerredemption &&
    dealersetting &&
    reservedGraphData?.result?.googledata
  );

  const handlePdf = (text) => {
    if (!isDisabled) {
      setPdfCheck(text);
    }
  };

  return (
    <div className="max-w-full w-[254px]">
      <ShadowContainer>
        <div className="flex flex-col w-full h-full space-y-8 justify-center items-center gap-[23px]">
          <div
            onClick={() => handlePdf("fetchReservesGraphPdfContext")}
            className={`flex cursor-${
              isDisabled ? "not-allowed opacity-60" : "pointer"
            } justify-center tracking-wide items-center gap-1 py-2 px-6 rounded-2xl ${
              pdfLoader1 || isDisabled
                ? "bg-gradient-to-b from-[#00B7FF] to-[#00B7FF]"
                : "bg-gradient-to-b from-[#00B7FF] to-[#00B7FF]"
            } hover:opacity-80 shadow-[0_4px_24px_rgba(0,183,255,0.20)] text-white font-bold leading-10`}
          >
            {pdfLoader1 ? "Generating..." : " Reserves + Claims"}
          </div>
          <div
            onClick={() => handlePdf("fetchReservesDetailGraphPdfContext")}
            className={`flex cursor-${
              isDisabled ? "not-allowed  opacity-60" : "pointer"
            } justify-center tracking-wide text-center py-2 px-6 rounded-2xl hover:opacity-80 ${
              pdfLoader2 || isDisabled
                ? "bg-gradient-to-b from-[#00B7FF] to-[#00B7FF]"
                : "bg-gradient-to-b from-[#00B7FF] to-[#00B7FF]"
            } shadow-[0_4px_24px_rgba(0,183,255,0.20)] text-white font-bold leading-6 whitespace-normal break-words max-w-full`}
          >
            {pdfLoader2 ? (
              "Generating..."
            ) : (
              <>
                Reserves + Claims <br /> Detailed
              </>
            )}
          </div>

          <div
            onClick={() => handlePdf("fetchReservesDetailPdfContext")}
            className={`flex cursor-${
              isDisabled ? "not-allowed  opacity-60" : "pointer"
            } justify-center tracking-wide items-center gap-1 py-2 px-6 hover:opacity-80 rounded-2xl ${
              pdfLoader3 || isDisabled
                ? "bg-gradient-to-b from-[#00B7FF] to-[#00B7FF]"
                : "bg-gradient-to-b from-[#00B7FF] to-[#00B7FF]"
            } shadow-[0_4px_24px_rgba(0,183,255,0.20)] text-white font-bold leading-10`}
          >
            {pdfLoader3 ? "Generating..." : "Reserves Breakdown"}
          </div>
        </div>
      </ShadowContainer>
    </div>
  );
}

export default PdfButtonsDiv;
