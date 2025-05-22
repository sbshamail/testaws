import React, { useContext, useState } from "react";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { GlobalContext } from "@/app/Provider";
import { DashboardContext } from "../../DashboardContext";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
const BottomActionGeneratePdf = ({
  reservedGraphRef,
  redemptionGraphRef,
  UUID,
  reactToPrintFn,
}) => {
  const { GLOBAL_RESPONSE, Token } = useContext(GlobalContext);
  const { pcp_user_id, user_cizacl_role_id, user_id } = GLOBAL_RESPONSE;
  const {
    dealersetting,
    dealerredemption,
    reservedGraphData,
    startdate,
    enddate,
    FixedDateParameter,
    engDate,
    drawtrendline,
    contractChart,
  } = useContext(DashboardContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fetchReservesDetailGraphPdf = async () => {
    if (!dealerredemption || !dealersetting || !reservedGraphData) {
      return toast.error(
        "dealerredemption, dealersetting, reservedGraphData required "
      );
    }
    try {
      setLoading(true);

      const generateBase64Images = async () => {
        const reservedCanvas = await html2canvas(reservedGraphRef.current);
        const redemptionCanvas = await html2canvas(redemptionGraphRef.current);

        const reservedBase64 = reservedCanvas.toDataURL("image/png");
        const redemptionBase64 = redemptionCanvas.toDataURL("image/png");

        return { reservedBase64, redemptionBase64 };
      };

      const { reservedBase64, redemptionBase64 } = await generateBase64Images();

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("AUTHORIZATION", Token);

      const requestBody = {
        pcp_user_id,
        role_id: user_cizacl_role_id,
        user_id,
        DealerID: dealersetting?.dealer?.DealerID,
        FomDate: startdate,
        ToDate: enddate,
        FixedDateParameter,
        UUID: UUID,
        Reserved: reservedBase64,
        Redemption: redemptionBase64,
        FutureMaturedBalance:
          dealerredemption?.ReserveGraph?.FutureMaturedBalance,
        ContractMaturedBalance:
          dealerredemption?.ReserveGraph?.maturedcontracttotalCost,
        dateprint: `${engDate.start} ${engDate.end}`,
        DealerTitle: dealersetting?.dealer?.DealerTitle,
        AgencyLogo: dealerredemption?.ReserveGraph?.AgencyLogo,
        TotalContracts: dealerredemption?.ReserveGraph?.total,
        result: reservedGraphData?.result,
        cancelledreservedgraph: reservedGraphData?.cancelledreservedgraph,
        ServicePaidouttostore: reservedGraphData?.ServicePaidouttostore,
        MaturedContract: dealerredemption?.row1?.maturedcontract,
        drawtrenline: drawtrendline,
        trend: reservedGraphData?.drawtrendline?.trend,
        contractChart: contractChart,
      };

      const response = await fetch(
        "https://mypcp.us/webservices/dashboard/pdf_reserved_graph",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        }
      );

      // Check if the HTTP response is OK
      if (response.ok) {
        const responseData = await response.json();

        // Check if the response indicates success
        if (responseData.success === 1) {
          // Ensure responseData.pdf is a URL or handle as required
          if (responseData.pdf) {
            window.open(responseData.pdf, "_blank");
          } else {
            console.error("PDF URL not found in response.");
          }
        } else {
          console.error("Response success flag is not set.");
        }
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error(`Error details: ${errorText}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error in sending graph data");
    } finally {
      setLoading(false);
    }
  };

  const fetchReservesDetailPdf = async () => {
    try {
      setLoading2(true);

      // Define headers
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("AUTHORIZATION", Token);

      const requestBody = {
        pcp_user_id,
        role_id: user_cizacl_role_id,
        user_id,
        DealerID: dealersetting?.dealer?.DealerID,
        FomDate: startdate,
        ToDate: enddate,
        FixedDateParameter,
        UUID: UUID,
      };

      const response = await fetch(
        "https://mypcp.us/webservices/dashboard/reservedgraphdetailpdf",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        // Check if the response indicates success
        if (responseData.success === 1) {
          // Ensure responseData.pdf is a URL or handle as required
          if (responseData.pdf) {
            window.open(responseData.pdf, "_blank");
          } else {
            console.error("PDF URL not found in response.");
          }
        } else {
          console.error("Response success flag is not set.");
        }
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text(); // or response.json() if it's JSON
        console.error(`Error details: ${errorText}`);
      }
    } catch (error) {
      // Ensure loading state is reset in case of error
      setLoading2(false);
      console.error("Fetch error:", error);
      //   toast.error("Error in sending graph data");
    } finally {
      // Ensure toolbar is visible again regardless of success or failure

      setLoading2(false);
    }
  };

  return (
    <div className=" mb-3 flex flex-wrap gap-4 items-center justify-center">
      <DancingLoadingButton variant="main" onClick={reactToPrintFn} size="sm">
        RESERVES & CLAIMS
      </DancingLoadingButton>
      <DancingLoadingButton
        variant="main"
        onClick={fetchReservesDetailGraphPdf}
        size="sm"
        loading={loading}
      >
        RESERVES & CLAIMS (Detailed)
      </DancingLoadingButton>
      <DancingLoadingButton
        variant="main"
        onClick={fetchReservesDetailPdf}
        size="sm"
        loading={loading2}
      >
        RESERVE BREAKDOWN
      </DancingLoadingButton>
    </div>
  );
};

export default BottomActionGeneratePdf;
