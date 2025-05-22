"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaCar } from "react-icons/fa";
import { fetchPostObj } from "@/utils/action/function";
import { useContext } from "react";
import { GlobalContext } from "@/app/Provider";
import { formatDate } from "@/utils/helpers";
import { DashboardContext } from "../../DashboardContext";
import { jsonToExcel } from "@/utils/generateExcel";
import SpinnerLoader from "@/app/Components/SpinnerLoader";

export default function ContractsBreakdown({
  saleBreakdown = {},
  serviceBreakdown = {},
  displayDates,
}) {
  const {
    startdate,
    enddate,
    dealersetting,
    FixedDateParameter,
    breakdownLoader,
  } = useContext(DashboardContext);
  const sale =
    saleBreakdown && Object.keys(saleBreakdown).length !== 0
      ? saleBreakdown
      : { fimanagers: [{}] };

  const service =
    serviceBreakdown && Object.keys(serviceBreakdown).length !== 0
      ? serviceBreakdown
      : { fimanagers: [{}] };

  const { auth, Token } = useContext(GlobalContext);

  const exportBreakDown = async (
    FilterType,
    FIManagerName,
    controller = "salesexportbreakdown"
  ) => {
    const data = {
      DealerID: dealersetting?.dealer?.DealerID,
      FixedDateParameter,
      startdate: formatDate(startdate),
      enddate: formatDate(enddate),
      FIManagerName,
      FilterType,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      data,
      api: `dashboard/${controller}`,
      spinner: true,
    });
    if (res) {
      jsonToExcel(res.fimanagers, controller);
    }
  };

  // handle data
  const salesData = sale?.fimanagers?.map((item) => ({
    name: item?.FIManagerName ?? "",
    maintFI: {
      value: item?.manintsale ?? null,
      download: () => exportBreakDown(1, item?.FIManagerName),
      downloadLogin: () =>
        exportBreakDown(1, item?.FIManagerName, "salesloginexportbreakdown"),
      subtext: item?.manintsale_login ?? "",
    },
    loyaltyFI: {
      value: item?.loyaltysale ?? null,
      download: () => exportBreakDown(2, item?.FIManagerName),
      downloadLogin: () =>
        exportBreakDown(2, item?.FIManagerName, "salesloginexportbreakdown"),
      subtext: item?.loyaltysale_login ?? "",
    },
    gps: {
      value: item?.gps ?? null,
      download: () => exportBreakDown(3, item?.FIManagerName),
      downloadLogin: () =>
        exportBreakDown(3, item?.FIManagerName, "salesloginexportbreakdown"),
      subtext: item?.gps_login ?? "",
    },
    maintService: {
      value: item?.manintservice ?? null,
      download: () => exportBreakDown(4, item?.FIManagerName),
      downloadLogin: () =>
        exportBreakDown(4, item?.FIManagerName, "salesloginexportbreakdown"),
      subtext: item?.manintservice_login ?? "",
    },
    loyaltyService: {
      value: item?.loyaltyservice ?? null,
      download: () => exportBreakDown(5, item?.FIManagerName),
      downloadLogin: () =>
        exportBreakDown(5, item?.FIManagerName, "salesloginexportbreakdown"),
      subtext: item?.loyaltyservice_login ?? "",
    },
  }));
  const serviceData = service?.fimanagers?.map((item) => ({
    name: item?.FIManagerName,
    maintFI: {
      value: item?.manintsale,
      download: () =>
        exportBreakDown(1, item?.FIManagerName, "servicesexportbreakdown"),
      downloadLogin: () =>
        exportBreakDown(1, item?.FIManagerName, "servicesloginexportbreakdown"),
      subtext: item?.manintsale_login,
    },
    loyaltyFI: {
      value: item?.loyaltysale,
      download: () =>
        exportBreakDown(2, item?.FIManagerName, "servicesexportbreakdown"),
      downloadLogin: () =>
        exportBreakDown(2, item?.FIManagerName, "servicesloginexportbreakdown"),
      subtext: item?.loyaltysale_login,
    },
    gps: {
      value: item?.gps,
      download: () =>
        exportBreakDown(3, item?.FIManagerName, "servicesexportbreakdown"),
      downloadLogin: () =>
        exportBreakDown(3, item?.FIManagerName, "servicesloginexportbreakdown"),
      subtext: item?.gps_login,
    },
    maintService: {
      value: item?.manintservice,
      download: () =>
        exportBreakDown(4, item?.FIManagerName, "servicesexportbreakdown"),
      downloadLogin: () =>
        exportBreakDown(4, item?.FIManagerName, "servicesloginexportbreakdown"),
      subtext: item?.manintsale_login,
    },
    loyaltyService: {
      value: item?.loyaltyservice,
      download: () =>
        exportBreakDown(5, item?.FIManagerName, "servicesexportbreakdown"),
      downloadLogin: () =>
        exportBreakDown(5, item?.FIManagerName, "servicesloginexportbreakdown"),
      subtext: item?.loyaltyservice_login,
    },
  }));

  // main component
  return (
    <Card className="w-full bg-card max-h-[550px] ">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
            <BsCalculator className="h-4 w-4 text-foreground/70" />
          </div>
          <CardTitle className="text-xl font-medium">
            Sale & Service Breakdown
          </CardTitle>
        </div>
        <div className="text-sm text-muted-foreground">{displayDates}</div>
      </CardHeader>
      {breakdownLoader ? (
        <div className="w-full flex h-[400px] justify-center items-center overflow-hidden">
          {" "}
          <SpinnerLoader />
        </div>
      ) : (
        <CardContent>
          <div className="w-full overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 pb-4"></th>
                  <th className="text-center p-2 pb-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-md bg-background border border-border">
                        <BsCalculator className="h-5 w-5 text-foreground/70" />
                      </div>
                      <span className="text-xs font-normal text-muted-foreground">
                        Maint (F&I)
                      </span>
                    </div>
                  </th>
                  <th className="text-center p-2 pb-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-md bg-background border border-border">
                        <AiOutlineTrophy className="h-5 w-5 text-foreground/70" />
                      </div>
                      <span className="text-xs font-normal text-muted-foreground">
                        Loyalty (F&I)
                      </span>
                    </div>
                  </th>
                  <th className="text-center p-2 pb-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-md bg-background border border-border">
                        <GoLocation className="h-5 w-5 text-foreground/70" />
                      </div>
                      <span className="text-xs font-normal text-muted-foreground">
                        GPS
                      </span>
                    </div>
                  </th>
                  <th className="text-center p-2 pb-4">
                    <div className="w-px h-16 bg-border mx-auto"></div>
                  </th>
                  <th className="text-center p-2 pb-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-md bg-background border border-border">
                        <FaCar className="h-5 w-5 text-foreground/70" />
                      </div>
                      <span className="text-xs font-normal text-muted-foreground">
                        Maint (Service)
                      </span>
                    </div>
                  </th>
                  <th className="text-center p-2 pb-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-md bg-background border border-border">
                        <FaCar className="h-5 w-5 text-foreground/70" />
                      </div>
                      <span className="text-xs font-normal text-muted-foreground">
                        Loyalty (Service)
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <>
                  <tr>
                    <td colSpan={7} className="py-3">
                      <div className="font-semibold text-sm text-foreground">
                        SALES
                      </div>
                    </td>
                  </tr>
                  {salesData?.map((person, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-2 text-sm text-muted-foreground">
                        {person.name}
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.maintFI.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.maintFI.download}
                            >
                              {" "}
                              {person.maintFI.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                          {person.maintFI.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer "
                              onClick={
                                person.maintFI.subtext &&
                                person.maintFI.downloadLogin
                              }
                            >
                              ({person.maintFI.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.loyaltyFI.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.loyaltyFI.download}
                            >
                              {person.loyaltyFI.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                          {person.loyaltyFI.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer "
                              onClick={
                                person.loyaltyFI.subtext &&
                                person.loyaltyFI.downloadLogin
                              }
                            >
                              ({person.loyaltyFI.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.gps.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.gps.download}
                            >
                              {person.gps.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}

                          {person.gps.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer"
                              onClick={
                                person.gps.subtext && person.gps.downloadLogin
                              }
                            >
                              ({person.gps.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="w-px h-6 bg-border mx-auto"></div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.maintService.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.maintService.download}
                            >
                              {person.maintService.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                          {person.maintService.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer "
                              onClick={
                                person.maintService.subtext &&
                                person.maintService.downloadLogin
                              }
                            >
                              ({person.maintService.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.loyaltyService.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.loyaltyService.download}
                            >
                              {person.loyaltyService.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                          {person.loyaltyService.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer "
                              onClick={
                                person.loyaltyService.subtext &&
                                person.loyaltyService.downloadLogin
                              }
                            >
                              ({person.loyaltyService.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>

                <>
                  <tr>
                    <td colSpan={7} className="py-3">
                      <div className="font-semibold text-sm text-foreground">
                        SERVICE
                      </div>
                    </td>
                  </tr>

                  {serviceData?.map((person, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-2 text-sm text-muted-foreground">
                        {person.name}
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.maintFI.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.maintFI.download}
                            >
                              {person.maintFI.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                          {person.maintFI.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer "
                              onClick={
                                person.maintFI.subtext &&
                                person.maintFI.downloadLogin
                              }
                            >
                              ({person.maintFI.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.loyaltyFI.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.loyaltyFI.download}
                            >
                              {person.loyaltyFI.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                          {person.loyaltyFI.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer "
                              onClick={
                                person.loyaltyFI.subtext &&
                                person.loyaltyFI.downloadLogin
                              }
                            >
                              ({person.loyaltyFI.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.gps.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.gps.download}
                            >
                              {person.gps.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}
                          {person.gps.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer "
                              onClick={
                                person.gps.subtext && person.gps.downloadLogin
                              }
                            >
                              ({person.gps.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="w-px h-6 bg-border mx-auto"></div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.maintService.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.maintService.download}
                            >
                              {person.maintService.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}

                          {person.maintService.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer"
                              onClick={
                                person.maintService.subtext &&
                                person.maintService.downloadLogin
                              }
                            >
                              ({person.maintService.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-sky-500 font-medium">
                          {person.loyaltyService.value > 0 ? (
                            <span
                              className="cursor-pointer"
                              onClick={person.loyaltyService.download}
                            >
                              {person.loyaltyService.value}
                            </span>
                          ) : (
                            <span className="text-red-500">0</span>
                          )}

                          {person.loyaltyService.subtext && (
                            <span
                              className="text-xs text-muted-foreground ml-1 cursor-pointer"
                              onClick={
                                person.loyaltyService.subtext &&
                                person.loyaltyService.downloadLogin
                              }
                            >
                              ({person.loyaltyService.subtext})
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
