"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Input from "@/app/Components/Inputs/Input";
import TextField from "@/components/cui/textField/TextField";
import { FiMail } from "react-icons/fi";
import { CustomButton } from "@/components/cui/button/CustomButton";
import ProfilePictureUpload from "@/components/cui/imageInput/ProfilePictureUpload";
import { MdAttachFile } from "react-icons/md";
const MessageForm = () => {
  const [values, setValues] = useState({});
  const handleSelectValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send message to your service provider</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" autoComplete="off">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              TITLE:
            </label>
            <Input
              id="title"
              name={"message"}
              onChange={handleSelectValue}
              placeholder="Enter message title"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              MESSAGE:
            </label>
            <TextField
              textarea={true}
              id="message"
              name={"message"}
              onChange={handleSelectValue}
              placeholder="Please type your message here"
              rows={4}
            />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-dashed p-4">
            <div className="flex items-center gap-2">
              <ProfilePictureUpload
                selectedFile={selectedFile}
                onFileChange={setSelectedFile}
                Icon={MdAttachFile}
                width="w-14"
                height="h-14"
                id="message-attachment"
              />
              <p className="text-sm text-gray-500">
                Please type your message or upload image from your phone
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <CustomButton variant="primary">Post Message</CustomButton>
      </CardFooter>
    </Card>
  );
};

export default MessageForm;
