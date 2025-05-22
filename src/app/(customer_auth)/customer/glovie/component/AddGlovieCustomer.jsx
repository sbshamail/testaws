import { fetchPostObj } from "@/utils/action/function";
import React, { useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import TextField from "@/components/cui/textField/TextField";
import { CustomButton } from "@/components/cui/button/CustomButton";
import Image from "next/image";
const AddGlovieCustomer = ({
  Token,
  auth,
  open,
  close,
  contract,
  fetchGlovie,
  CustomerID,
  ContractID,
  IsGuest,
}) => {
  const [values, setValues] = useState({
    ContractID,
    CustomerID,
    Title: "",
    Description: "",
    IsGuest: contract?.IsGuest ?? "0",
    file: "",
  });
  const addGlovieSubmit = async () => {
    const data = { ...values, "file_browse[]": values?.file };
    const res = await fetchPostObj({
      api: "customer/saveglovie",
      data,
      Token,
      spinner: true,
      auth,
      showToast: true,
      IsGuest,
    });
    if (res) {
      await fetchGlovie();
      close();
    }
  };
  const handleFileChange = (e) => {
    setValues({ ...values, file: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <SimpleModal
      open={open}
      close={close}
      className={"max-w-[600px]"}
      title={"Add Glovie"}
    >
      <form className="flex flex-col gap-2">
        <TextField
          placeholder={"Title"}
          name="Title"
          value={values.Title}
          onChange={handleChange}
        />
        <TextField
          placeholder={"Description"}
          name="Description"
          value={values.Description}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-1">
          <TextField
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />

          {values.file && (
            <div>
              <Image
                width={50}
                height={50}
                src={URL.createObjectURL(values.file)}
                alt="Preview"
                className="object-cover border "
              />
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <CustomButton onClick={addGlovieSubmit}>Submit</CustomButton>
          <CustomButton variant="main" onClick={close}>
            Close
          </CustomButton>
        </div>
      </form>
    </SimpleModal>
  );
};

export default AddGlovieCustomer;
