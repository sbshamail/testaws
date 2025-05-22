import React from "react";
import PdfScreenshotScreen from "../cui/PdfScreenShot";
import Image from "next/image";
const PrintSelectedServices = ({ content, setModal, modal, close }) => {
  const printContent = () => (
    <div className="bg-white m-auto  space-y-8 " id="printMessageBox">
      {/* for user */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex">
            <Image
              src="/images/print/cdjr.png"
              alt="cdjr"
              width={200}
              height={200}
            />
            <div>
              <table className=" w-full  ">
                <tr>
                  <td>Customer Name :</td>
                  <td>
                    {content?.dealer_data?.CustomerFName}
                    &nbsp;
                    {content?.dealer_data?.CustomerLName}
                  </td>
                </tr>
                <tr>
                  <td>Contract # :</td>
                  <td>{content?.dealer_data?.ContractNo}</td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td>{content?.dealer_data?.pass}</td>
                </tr>
              </table>
            </div>
          </div>
          <Image
            src="/images/print/badge.png"
            alt="cdjr"
            width={200}
            height={200}
          />
        </div>
        <div className="flex justify-between items-center">
          <p>Dealership Phone :</p>
          <p> {content?.dealer_data?.ContPersonPhone}</p>
          <p>Dealership Email : </p>
          <p> {content?.dealer_data?.ContPersonEmail}</p>
        </div>
        <div className="w-full h-full ">
          <table className="w-full ">
            <thead className=" m-0 p-6 text-white bg-siteBlue">
              <tr>
                <th>ID</th>
                <th className="">Service(s) Performed</th>
                <th>RO</th>
                <th>OP Code</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {content?.services?.map((service) => {
                return (
                  <tr key={service?.CouponID}>
                    <td>{service?.CouponID}</td>
                    <td>{service?.CouponTitle}</td>
                    <td>{service?.RepairOrderNo}</td>
                    <td>{service?.OpCode}</td>
                    <td>{service?.RecievedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          Customer Signature
          ______________________________________________________
        </div>
        <Image
          src="/images/print/trident.png"
          alt="cdjr"
          width={200}
          height={200}
        />
        <div>
          <p className="m-0 p-0">
            Your App login is the same as your web login as displayed below
          </p>
          <p className="m-0 p-0">
            Your can log into your Preferred Customer Program at any time by
            visiting
          </p>
          <p>https://mypcp.us/login</p>
          <div className="flex justify-between mt-2">
            <p>User Name: D0439678</p>
            <p>Password: 345678</p>
          </div>
        </div>
      </div>
      {/* Next Page */}
      {/* Page Break */}
      <div className="break-after-page print:break-after-always"></div>
      <div className="">
        <div>
          <h1 className="text-red-500 text-center font-bold text-2xl">
            DEALERSHIP INTERNAL USE ONLY
          </h1>
        </div>
        {/* for dealer */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex">
              <Image
                src="/images/print/cdjr.png"
                alt="cdjr"
                width={200}
                height={200}
              />
              <div>
                <table className=" w-full  ">
                  <tr>
                    <td>Customer Name :</td>
                    <td>
                      {content?.dealer_data?.CustomerFName}
                      &nbsp;
                      {content?.dealer_data?.CustomerLName}
                    </td>
                  </tr>
                  <tr>
                    <td>Contract # :</td>
                    <td>{content?.dealer_data?.ContractNo}</td>
                  </tr>
                  <tr>
                    <td>Password:</td>
                    <td>{content?.dealer_data?.pass}</td>
                  </tr>
                </table>
              </div>
            </div>
            <Image
              src="/images/print/badge.png"
              alt="cdjr"
              width={200}
              height={200}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Dealership Phone :</p>
            <p> {content?.dealer_data?.ContPersonPhone}</p>
            <p>Dealership Email : </p>
            <p> {content?.dealer_data?.ContPersonEmail}</p>
          </div>
          <div className="w-full h-full ">
            <table className="w-full ">
              <thead className=" m-0 p-6 text-white bg-siteBlue">
                <tr>
                  <th>ID</th>
                  <th>Service(s) Performed</th>
                  <th>Price</th>
                  <th>RO</th>
                  <th>OP Code</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {content?.services?.map((service) => {
                  return (
                    <tr key={service?.CouponID}>
                      <td>{service?.CouponID}</td>
                      <td>{service?.CouponTitle}</td>
                      <td>${service?.CouponValue}</td>
                      <td>{service?.RepairOrderNo}</td>
                      <td>{service?.OpCode}</td>
                      <td>{service?.RecievedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            Customer Signature
            ______________________________________________________
          </div>

          <div>
            <h4 className="m-0 p-0 font-bold">
              Keep Track of all your services
            </h4>
            <p className="m-0 p-0">
              Download your <span className="font-bold">TRIDENT AUTO</span>{" "}
              iPhone App or Android App now! Keep track of your service history
              and receive quick specials that you can share with your friends
              and family on Facebook.
            </p>
            <p className="mt-4 m-0 p-0">
              Your App login is the same as your web login as displayed below
            </p>
            <p className=" m-0 p-0">
              Your can log into your Preferred Customer Program at any time by
              visiting
            </p>
            <p className=" m-0 p-0">https://mypcp.us/login</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <PdfScreenshotScreen
        open={modal}
        setOpen={setModal}
        close={close}
        Component={printContent}
      />
    </div>
  );
};

export default PrintSelectedServices;
