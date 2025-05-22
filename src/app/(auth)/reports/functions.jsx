import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
const responseStateChecker = (responseState) => {
  if (!responseState) {
    return false;
  } else if (responseState?.length === 0) {
    return false;
  }
  // else if (responseState.success === 0) {
  //   return false;
  // }
  return true;
};

//  : (
//   !responseStateChecker(responseState) && (
//     <div className="flex justify-center max-w-full container-max-width bg-white shadow-md my-3 p-4 rounded-3xl">
//       Reports Not Found
//     </div>
//   )
// );

export const tableDataNotFound = (THead, title = "Data Not Found") =>
  THead && (
    <div className="shadow bg-card text-card-foreground rounded-2xl">
      <table className="table-auto rounded min-w-full border-collapse border border-card-foreground/10 text-sm ">
        {THead()}
        <tbody>
          <tr>
            <td colSpan="100%" className="relative h-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg text-muted-foreground">{title}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

export const printPdfHeader = (title, dealer) => (
  <div className="printContent">
    <div className="flex justify-between items-center">
      <Image
        src={"/images/print/badge.png"}
        alt="Authenticom Points"
        className="h-60 "
        height={100}
        width={100}
      />
      <div>
        <h1 className="font-bold text-2xl uppercase text-center">{title}</h1>
        <h2 className="font-bold text-xl uppercase text-center">{dealer}</h2>
      </div>
      <Image
        src={"/images/print/badge.png"}
        alt="Authenticom Points"
        className="h-52 "
        height={100}
        width={100}
      />
    </div>
  </div>
);

export const loadMoreButton = (
  responseState,
  fetchReports,
  loading,
  url = "https://mypcp.us/webservices/reports/newreport"
) =>
  responseState?.offset && (
    <p
      className="printNone w-full text-center p-2 font-bold bg-card rounded text-primary/80 hover:text-primary hover:underline hover:underline-offset-4 Transition cursor-pointer "
      onClick={() =>
        fetchReports({
          offset: responseState?.offset,
          url: url,
        })
      }
    >
      {loading ? <Spinner /> : "Load More"}
    </p>
  );
