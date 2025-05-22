import React, { useState } from "react";
import FileUpload from "@/app/Components/FileUpload";
import Input from "@/app/Components/Inputs/Input";
import Button from "@/app/Components/Button";
const Tab1 = () => {
  const [image, setimage] = useState(null);
  return (
    <div className="w-full flex gap-5">
      <div className="flex flex-col gap-5 w-1/3">
        <FileUpload uploadedfile={image} setuploadedfile={setimage} />
        <Input
          label="Subscription Plan"
          placeholder="Subscription Plan"
          type="text"
          bgcolor={"gray-200"}
        />
        <Input
          label="Predicted Launch Date"
          placeholder="Predicted Launch Date"
          type="text"
          bgcolor={"gray-200"}
        />
        <Input
          label="Service DMS Name"
          placeholder="Service DMS Name"
          type="text"
          bgcolor={"gray-200"}
        />
        <Input label="REV" placeholder="REV" type="text" bgcolor={"gray-200"} />
      </div>
      <div className="flex flex-col gap-5 w-2/3">
        <div className="w-full flex gap-5">
          <Input
            label="Account Name"
            placeholder="Account Name"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="Telephone"
            placeholder="Telephone"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="Website"
            placeholder="Website"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>

        <div className="w-full flex gap-5">
          <Input
            label="Address"
            placeholder="Address"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="Point of Contact"
            placeholder="Point of Contact"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>
        <div className="w-full flex gap-5 items-end">
          <Input
            label="Country"
            placeholder="Country"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="Timezone"
            placeholder="Timezone"
            type="text"
            bgcolor={"gray-200"}
          />
          <div className="w-full h-10">
            <Button text="Set Open Hours" bg="siteBlue" />
          </div>
        </div>

        <div className="w-full flex gap-5">
          <Input
            label="City"
            placeholder="City"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="ZIP Code"
            placeholder="ZIP Code"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>
        <h6 className="font-semibold text-lg">Map Coordinates</h6>
        <div className="w-full flex gap-5">
          <Input
            label="Latitude"
            placeholder="Latitude"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="Longitude"
            placeholder="Longitude"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>

        <h4 className="font-semibold text-lg mt-5">Account Goals</h4>
        <div className="w-full flex gap-5">
          <Input
            label="Vehicles Sold"
            placeholder="Vehicles Sold"
            type="number"
            bgcolor={"gray-200"}
          />
          <Input
            label="Product Penetration"
            placeholder="Product Penetration"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>
        <div className="w-full flex gap-5">
          <Input
            label="Product Sold"
            placeholder="Product Sold"
            type="number"
            bgcolor={"gray-200"}
          />
          <Input
            label="Upsell Amount"
            placeholder="Upsell Amount"
            type="number"
            bgcolor={"gray-200"}
          />
        </div>

        <div className="w-full flex gap-5">
          <Input
            label="Google Feedback Title"
            placeholder="Google Feedback Title"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="Google Feedback URL"
            placeholder="Google Feedback URL"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>
      </div>
    </div>
  );
};

export default Tab1;
