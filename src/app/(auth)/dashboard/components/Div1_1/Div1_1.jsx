import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import React, { useContext } from "react";
import StatusCard from "./StatusCard";
import { DashboardContext } from "../../DashboardContext";
import Image from "next/image";
import { MdAutoGraph } from "react-icons/md";
import { GlobalContext } from "@/app/Provider";

const Div1_1 = () => {
  const { dealersetting } = useContext(DashboardContext);
  const { GLOBAL_RESPONSE, auth } = useContext(GlobalContext);

  const statuslist = [
    {
      src: "gearicon-new.png",
      text: "Active Features",
      // available: dealersetting
      //   ? dealersetting?.dealer?.AppFeature?.xp_enable
      //   : "0",
    },
    {
      src: "maint-new.png",
      text: "Maintenance (Subscription)",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.xp_enable
        : "0",
      category: "Maintenance Policies",
    },
    {
      src: "maint-new.png",

      text: "Maintenance (Pre-Paid)",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.EnableClaimProduct
        : "0",
      category: "Maintenance Policies",
    },
    {
      src: "maint-new.png",
      text: "Maintenance (Pre-Load)",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.EnableLoyaltyCash
        : "0",
      category: "Maintenance Policies",
    },
    {
      src: "stopwatch-new.png",
      text: "Maintenance (Express)",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.ServiceVideoEnable
        : "0",
      category: "Maintenance Policies",
    },
    {
      src: "maint-new.png",
      text: "Maintenance (Web)",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.EnableValueTrade
        : "0",
      category: "Maintenance Policies",
    },
    {
      src: "sellmycar-new.png",
      text: "Sell My Car",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.SellMyCar
        : "0",
      category: "App Features",
    },
    {
      src: "gps-new.png",
      text: "GPS - Telematics",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.GPSTelematics
        : "0",
      category: "App Features",
    },
    {
      src: "lp-new.png",
      text: "LP - Loyalty Points",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.LoyaltyPoints
        : "0",
      category: "App Features",
    },
    {
      src: "calendar-new.png",
      text: "Schedule an Appointment",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.ScheduleAppointmen
        : "0",
      category: "App Features",
    },
    {
      src: "glovie-new.png",
      text: "Glovie",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.Glovie
        : "0",
      category: "App Features",
    },
    {
      src: "dashboard-new.png",
      text: "View All",
      available: "1",
    },
    {
      src: "User_fill_new.png",
      text: "Customer Profile",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.CustomerProfile
        : "0",
      category: "App Features",
    },
    {
      src: "comment_fill-1_new.png",
      text: "Concierge Chat",
      available: dealersetting ? dealersetting?.dealer?.AppFeature?.Chat : "0",
      category: "App Features",
    },
    {
      src: "calendar-new.png",
      text: "Procarma Scheduler",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.EnableGifted
        : "0",
      category: "App Features",
    },
    {
      src: "Layer_1_new.png",
      text: "Digital Referral Program",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.DigitalReferralProgram
        : "0",
      category: "App Features",
    },
    {
      src: "Credit card_fill_new.png",
      text: "Digital Gift Card",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.DigitalGiftCard
        : "0",
      category: "App Features",
    },
    {
      src: "lp-new.png",
      text: "XP - Experience Points",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.XPExperiencePoints
        : "0",
      category: "App Features",
    },
    {
      src: "lp-new.png",
      text: "Retention Mapping",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.RetentionMapping
        : "0",
      category: "App Features",
    },
    {
      src: "lp-new.png",
      text: "Coverage Points",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.CoveragePoints
        : "0",
      category: "App Features",
    },
    {
      src: "Pin_alt_fill_new.png",
      text: "AVARE - Tracker",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.AVARETracker
        : "0",
      category: "App Features",
    },
    {
      src: "Box_fill_new.png",
      text: "Service Gifting",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.ServiceGifting
        : "0",
      category: "App Features",
    },
    {
      src: "Shop_new.png",
      text: "Marketplace",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.Marketplace
        : "0",
      category: "App Features",
    },
    {
      src: "Gamepad_new.png",
      text: "Game Center",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.GameCenter
        : "0",
      category: "App Features",
    },
    {
      src: "Paper_alt_fill_new.png",
      text: "Affirmations",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.Affirmations
        : "0",
      category: "App Features",
    },
    {
      src: "sellmycar-new.png",
      text: "Push Notifications",
      available: dealersetting
        ? dealersetting?.dealer?.DigitalMarketing?.PushNotifications
        : "0",
      category: "Digital Marketing",
    },
    {
      src: "User_fill_new.png",
      text: "Email Broadcasts",
      available: dealersetting
        ? dealersetting?.dealer?.DigitalMarketing?.EmailBroadcasts
        : "0",
      category: "Digital Marketing",
    },
    {
      src: "comment_fill-1_new.png",
      text: "Ringless Voicemails",
      available: dealersetting
        ? dealersetting?.dealer?.DigitalMarketing?.RinglessVoicemails
        : "0",
      category: "Digital Marketing",
    },
    {
      src: "calendar-new.png",
      text: "SMS Notifications",
      available: dealersetting
        ? dealersetting?.dealer?.DigitalMarketing?.SMSNotifications
        : "0",
      category: "Digital Marketing",
    },
    {
      src: "sellmycar-new.png",
      text: "Maintenance Services",
      available: dealersetting
        ? dealersetting?.dealer?.TeleMatrictVehicleHealth?.MaintenanceServices
        : "0",
      category: "Telematics + Vehicle Health",
    },
    {
      src: "Layer_1-1-new.png",
      text: "Protective Coverages",
      available: dealersetting
        ? dealersetting?.dealer?.TeleMatrictVehicleHealth?.ProtectiveCoverages
        : "0",
      category: "Telematics + Vehicle Health",
    },
    {
      src: "calendar-new.png",
      text: "OEM Service Schedule Info",
      available: dealersetting
        ? dealersetting?.dealer?.TeleMatrictVehicleHealth
            ?.OEMServiceScheduleInfo
        : "0",
      category: "Telematics + Vehicle Health",
    },
    {
      src: "Layer_1-1-new.png",
      text: "OEM Warranty Graph Info",
      available: dealersetting
        ? dealersetting?.dealer?.TeleMatrictVehicleHealth?.OEMWarrantyGraphInfo
        : "0",
      category: "Telematics + Vehicle Health",
    },
    {
      src: "ITO_fill_new.png",
      text: "DTC - Diagnostic Trouble Code",
      available: dealersetting
        ? dealersetting?.dealer?.TeleMatrictVehicleHealth?.DTC
        : "0",
      category: "Telematics + Vehicle Health",
    },
    {
      src: "Alarm_fill_new.png",
      text: "Recall Notice",
      available: dealersetting
        ? dealersetting?.dealer?.TeleMatrictVehicleHealth?.RecallNotice
        : "0",
      category: "Telematics + Vehicle Health",
    },
  ];

  const statuslist2 = [
    {
      src: "setting.png",
      text: "Maintenance",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.xp_enable
        : "0",
    },

    {
      src: "gps-new.png",
      text: "GPS",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.GPSTelematics
        : "0",
      category: "App Features",
    },
    {
      src: "lp-new.png",
      text: "Loyalty",
      available: dealersetting
        ? dealersetting?.dealer?.AppFeature?.LoyaltyPoints
        : "0",
      category: "App Features",
    },
  ];
  const handleClick = () => {
    if (typeof Tawk_API !== "undefined") {
      // eslint-disable-next-line no-undef
      Tawk_API.toggle();
    }
  };
  return (
    <div className="w-full grid grid-cols-12 gap-6">
      <div className="xlg:col-span-3 col-span-7 order-2 xlg:order-1">
        <ShadowContainer>
          <div className="flex flex-col mt-2 mb-2 gap-9">
            <div className="flex gap-4">
              <div className="bg-card rounded-[10px]">
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40.2759" height="40" rx="10" fill="#F2F5F5" />
                  <path
                    d="M18.032 14.6414H21.258M18.032 18.3282H24.0232M18.032 22.0151H24.0232"
                    stroke="#99B2C6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.0113 22.8099C29.0926 22.0113 29.0926 21.0114 29.0926 19.7493L29.0926 17.1469C29.0928 16.181 29.0929 15.5581 28.9249 14.9685C28.8327 14.6453 28.7037 14.3338 28.5403 14.0401C28.2422 13.5044 27.8017 13.064 27.1185 12.3811L26.9748 12.2374C26.2919 11.5543 25.8515 11.1137 25.3158 10.8156C25.0221 10.6522 24.7106 10.5232 24.3874 10.4311C23.7979 10.263 23.1749 10.2632 22.209 10.2633L21.0275 10.2634V10.2654C20.1654 10.2705 19.4397 10.2891 18.8274 10.3554C17.9562 10.4498 17.2327 10.6476 16.6106 11.0995C16.2389 11.3696 15.9121 11.6964 15.642 12.0681C15.3542 12.4642 15.1695 12.9015 15.0489 13.3919L14.2932 13.5944C11.9576 14.2202 10.5715 16.6209 11.1974 18.9565L13.2251 26.5242C13.8509 28.8598 16.2517 30.2458 18.5873 29.62L23.9292 28.1887C24.9494 27.9153 25.7884 27.3033 26.3577 26.506C26.6377 26.4083 26.8996 26.2817 27.1468 26.1165C27.6248 25.7971 28.0353 25.3866 28.3547 24.9086C28.7539 24.3111 28.9281 23.6281 29.0113 22.8099ZM22.2201 11.646L22.1074 11.6459C20.7233 11.646 19.738 11.6474 18.9763 11.7299C18.2227 11.8116 17.7704 11.9659 17.4233 12.2181C17.169 12.4028 16.9453 12.6265 16.7606 12.8808C16.5084 13.2279 16.3541 13.6802 16.2725 14.4338C16.1894 15.2003 16.1885 16.1932 16.1885 17.5911V19.711C16.1885 21.0199 16.1893 21.9496 16.2626 22.67C16.3347 23.3788 16.4712 23.808 16.6933 24.1404C16.9119 24.4675 17.1927 24.7484 17.5198 24.9669C17.8522 25.1891 18.2814 25.3255 18.9903 25.3977C19.7107 25.4709 20.6403 25.4718 21.9492 25.4718C23.2581 25.4718 24.1878 25.4709 24.9082 25.3977C25.617 25.3255 26.0462 25.1891 26.3787 24.9669C26.7057 24.7484 26.9866 24.4675 27.2051 24.1404C27.4273 23.808 27.5638 23.3788 27.6359 22.67C27.7091 21.9496 27.71 21.0199 27.71 19.711V17.4067C27.71 16.9527 27.7085 16.6817 27.6824 16.4874C27.6704 16.3984 27.6563 16.3539 27.6481 16.3338C27.6462 16.3291 27.6447 16.3261 27.6437 16.3243L27.6425 16.3221L27.6402 16.3208C27.6385 16.3199 27.6354 16.3184 27.6307 16.3165C27.6107 16.3082 27.5661 16.2941 27.4771 16.2821C27.2829 16.256 27.0119 16.2546 26.5578 16.2546L25.5949 16.2546C25.1959 16.2546 24.8302 16.2546 24.5326 16.2146C24.205 16.1706 23.8586 16.0669 23.5738 15.7821C23.289 15.4973 23.1853 15.151 23.1413 14.8233C23.1013 14.5258 23.1013 14.16 23.1014 13.7611L23.1014 12.6138C23.1014 12.2527 23.1004 12.0375 23.0834 11.8803C23.0734 11.7878 23.0606 11.7499 23.0559 11.7389C23.0425 11.7209 23.0265 11.7049 23.0084 11.6914C22.9974 11.6867 22.9595 11.6739 22.867 11.6639C22.7228 11.6483 22.5297 11.6462 22.2201 11.646ZM23.5978 26.846C23.1146 26.8544 22.5799 26.8544 21.9875 26.8544H21.9109C20.6489 26.8544 19.6489 26.8544 18.8503 26.7731C18.0322 26.6899 17.3491 26.5157 16.7517 26.1165C16.2736 25.7971 15.8632 25.3866 15.5437 24.9086C15.1445 24.3111 14.9703 23.6281 14.8871 22.8099C14.8059 22.0114 14.8059 21.0114 14.8059 19.7494V17.55C14.8059 16.4982 14.8059 15.6168 14.8496 14.8766L14.651 14.9298C13.053 15.358 12.1046 17.0006 12.5328 18.5987L14.5606 26.1663C14.9888 27.7644 16.6314 28.7127 18.2294 28.2846L23.5713 26.8532C23.5802 26.8508 23.589 26.8484 23.5978 26.846ZM27.3321 14.7123C27.3643 14.7701 27.3945 14.8289 27.4227 14.8885C27.1764 14.8719 26.897 14.8719 26.5991 14.872L25.6361 14.872C25.1821 14.872 24.9111 14.8705 24.7168 14.8444C24.6278 14.8324 24.5833 14.8183 24.5632 14.8101C24.5585 14.8082 24.5555 14.8067 24.5537 14.8057L24.5515 14.8045L24.5502 14.8022C24.5493 14.8004 24.5478 14.7974 24.5459 14.7927C24.5376 14.7727 24.5235 14.7281 24.5115 14.6391C24.4854 14.4449 24.484 14.1739 24.484 13.7198L24.484 12.5812C24.484 12.3491 24.484 12.1309 24.4738 11.9363C24.5313 11.9637 24.5879 11.9928 24.6436 12.0238C24.9898 12.2164 25.2895 12.5074 26.069 13.2869C26.8485 14.0664 27.1395 14.3661 27.3321 14.7123Z"
                    fill="#99B2C6"
                  />
                </svg>
              </div>
              <div className=" flex justify-start items-center font-bold text-xl text-muted-foreground">
                Available Policies
              </div>
            </div>

            {statuslist2?.map((item, i) => (
              <StatusCard key={i} item={item} statuslist={statuslist2} />
            ))}
          </div>
        </ShadowContainer>
      </div>
      <div className="xlg:col-span-7 col-span-12 order-1 xlg:order-2">
        <ShadowContainer>
          <div className="w-full flex flex-col">
            <div className="flex justify-end">
              <svg
                width="17"
                height="4"
                viewBox="0 0 17 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="2.01379"
                  cy="2"
                  rx="2.01379"
                  ry="2"
                  fill="#99B2C6"
                />
                <ellipse
                  cx="8.05517"
                  cy="2"
                  rx="2.01379"
                  ry="2"
                  fill="#99B2C6"
                />
                <path
                  d="M16.1103 2C16.1103 3.10457 15.2087 4 14.0966 4C12.9844 4 12.0828 3.10457 12.0828 2C12.0828 0.89543 12.9844 0 14.0966 0C15.2087 0 16.1103 0.89543 16.1103 2Z"
                  fill="#99B2C6"
                />
              </svg>
            </div>
            {/* active features status card */}
            <div className="grid grid-cols-3 gap-10 w-full">
              {statuslist.slice(0, 12).map((item, i) => (
                <StatusCard key={i} item={item} statuslist={statuslist} />
              ))}
            </div>
          </div>
        </ShadowContainer>
      </div>
      <div className="xlg:col-span-2 col-span-5 h-full flex flex-col justify-between space-y-6 order-2 xlg:order-3">
        <div className="h-full flex flex-col space-y-4">
          <ShadowContainer className={"flex-1"}>
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src={
                  dealersetting
                    ? dealersetting?.dealer?.DealerLogo
                    : "/images/procarmalogo.png"
                }
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "65%", height: "auto" }}
                alt="procarma logo"
                className="flex justify-center items-center"
              />
            </div>
          </ShadowContainer>
          {auth?.role_id !== "5" && dealersetting?.dealer?.DealerID && (
            <div className="h-1/2">
              <a
                href={`https://performance.mypcp.us/?u=${GLOBAL_RESPONSE?.UID}&d=${dealersetting?.dealer?.DealerID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="relative w-full h-full py-6 text-lg font-semibold rounded-3xl shadow-lg flex items-center justify-center gap-3 overflow-hidden transition-all group bg-gradient-to-l from-primary/20 to-siteOrange/20 hover:from-primary hover:to-siteOrange/60 text-primary hover:text-white">
                  <span className="absolute inset-0 z-0 transition-all duration-500 ease-out bg-primary scale-0 group-hover:scale-150 rounded-full opacity-20"></span>

                  <span className="flex flex-col justify-center items-center transition-transform group-hover:scale-105 z-10">
                    <MdAutoGraph className="text-3xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 " />
                    Performance Report
                  </span>
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Div1_1;
