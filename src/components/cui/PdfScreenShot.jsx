import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomButton } from "./button/CustomButton";
// html2canvas, jspdf
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SimpleModal from "./modals/SimpleModal";

const PdfScreenshotScreen = ({
  open,
  setOpen,
  Component,
  htmlContent,
  close,
}) => {
  const contentRef = useRef();

  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <SimpleModal
      open={open}
      close={close}
      title="Print Letter "
      className={"max-h-full max-w-[800px] mx-auto mt-0"}
    >
      <div className=" rounded print:w-[1050px] m-auto bg-white text-black/90 p-10  overflow-auto">
        <div className="">
          {Component && (
            <div
              ref={contentRef}
              id="print"
              className="print:w-[1050px] m-auto p-5 bg-white text-black/90"
            >
              {Component()}
            </div>
          )}
          {htmlContent && (
            <div id="print" ref={contentRef} className="">
              <div
                className=" rounded-md "
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          )}
          <div className="flex space-x-2">
            <CustomButton variant="danger" onClick={close}>
              Close
            </CustomButton>

            <CustomButton onClick={reactToPrintFn}>Print</CustomButton>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default PdfScreenshotScreen;
