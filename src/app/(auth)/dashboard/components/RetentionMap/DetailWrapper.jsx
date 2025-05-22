import React from "react";
import Details from "./Details";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { IoChatboxOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";

const DetailWrapper = ({
  mapcircleradius,
  circle1markers,
  circle2markers,
  circle3markers,
  data,
  monthlist,
  monthssubscriptions,
  monthsservices,
  subscriptions,
  marketplace,
  searchtype,
  all,
  active,
  pending,
  cancelled,
  pendingmatured,
  matured,
  maptype,
}) => {
  const detailsData = [
    ...(maptype === 1
      ? [
          {
            text: `Contracts between 0 and ${mapcircleradius}`,
            value: circle1markers,
            Icon: <IoIosRadioButtonOn />,
            export_type: "9",
            reportName: `rad_circle1`,
          },
          {
            text: `Contracts between ${mapcircleradius} and ${
              2 * mapcircleradius
            }`,
            value: circle2markers,
            Icon: <IoIosRadioButtonOn />,
            export_type: "10",
            reportName: `rad_circle1`,
          },
          {
            text: `Contracts between ${2 * mapcircleradius} and ${
              3 * mapcircleradius
            }`,
            value: circle3markers,
            Icon: <IoIosRadioButtonOn />,
            export_type: "11",
            reportName: `rad_circle1`,
          },
        ]
      : []),
    {
      text: "Customers who have used at least 1 service",
      value: data?.used_services,
      Icon: <IoIosRadioButtonOn className="text-green-500" />,
      export_type: "1",
      reportName: "retentionUsedServices",
    },
    {
      text: "Customers who have used no service",
      value: data?.unused_services,
      Icon: <IoIosRadioButtonOn className="text-red-500" />,
      export_type: "5",
      reportName: "retentionContracts",
    },
    {
      text: `Customers that have rated ${data?.DealerTitle} on Google Through PCP`,
      value: data?.google_rating,
      Icon: <FcGoogle />,
      export_type: "21",
      reportName: "google_rating_export",
    },
    {
      text: "Customers that have used CEP Chat",
      value: data?.used_chat,
      Icon: <IoChatboxOutline />,
      export_type: "3",
      reportName: "chat_user_export",
    },
    {
      text: "Customers that have called through App",
      value: data?.used_app,
      Icon: <FaWhatsapp />,
      export_type: "4",
      reportName: "mobile_tel_user_export",
    },
    {
      text: "Customers that have Logged on to App or Web Portal",
      value: data?.app_web,
      Icon: <MdPhoneIphone />,
      export_type: "7",
      reportName: "retentionContracts",
    },
  ];

  // Conditionally add the optional Detail with `monthbefore_no_service_used`
  if (data?.monthbefore_no_service_used) {
    detailsData.push({
      text: `Customers that have only been in the system for less than ${monthlist[monthssubscriptions]?.text}`,
      value: data?.monthbefore_no_service_used,
      Icon: <IoIosRadioButtonOn className="text-yellow-500" />,
      export_type: "8",
      reportName: "retentionContracts",
    });
  }
  return detailsData.map((detail, index) => (
    <Details
      key={index}
      text={detail.text}
      value={detail.value}
      Icon={detail.Icon}
      reportName={detail.reportName}
      export_type={detail.export_type}
      monthbefore={monthssubscriptions}
      submonthbefore={monthsservices}
      IsSubscription={subscriptions ? "1" : "0"}
      IsMarketPlace={marketplace ? "1" : "0"}
      SearchType={searchtype}
      AllContractStatus={all ? "1" : "0"}
      ContractStatus={{
        active,
        pending,
        cancelled,
        pendingmatured,
        matured,
      }}
    />
  ));
};

export default DetailWrapper;
