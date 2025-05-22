import { fetchPostObj } from "@/utils/action/function";
import React, { useEffect, useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import TextField from "@/components/cui/textField/TextField";
import { CustomButton } from "@/components/cui/button/CustomButton";
import Image from "next/image";
const EditGlovieModal = ({
  Token,
  auth,
  open,
  close,
  fetchGlovie,
  contract,
  id,
}) => {
  const [values, setValues] = useState({
    Title: "",
    Description: "",
    file: "",
  });
  useEffect(() => {
    const getEditData = async () => {
      const data = {
        ContractID: contract?.ContractID,
        CustomerID: contract?.CustomerID,
        glovie_id: id,
      };
      const res = await fetchPostObj({
        api: "contracts/editglovie",
        auth,
        Token,
        spinner: true,
        data,
        showToast: true,
      });

      if (res) {
        setValues({
          ...res,
          Title: res?.glovie?.Title,
          Description: res?.glovie?.Description,
          file: res?.glovie_doc,
          glovie_id: id,
        });
      }
    };
    getEditData();
  }, []);
  const editGlovieSubmit = async () => {
    const data = {
      ...values,
      "file_browse[]": values?.file,
      IsGuest: contract?.IsGuest,
      ContractID: contract?.ContractID,
      CustomerID: contract?.CustomerID,
    };
    const res = await fetchPostObj({
      api: "contracts/updateglovie",
      data,
      Token,
      auth,
      showToast: true,
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
      title={"Edit Glovie"}
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
                src={
                  values.file instanceof File
                    ? URL.createObjectURL(values.file) // If it's a File object
                    : values?.file[0]?.glovie_img || values.file // If it's an existing URL
                }
                alt="Preview"
                className="object-cover border"
              />
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <CustomButton onClick={editGlovieSubmit}>Submit</CustomButton>
          <CustomButton variant="main" onClick={close}>
            Close
          </CustomButton>
        </div>
      </form>
    </SimpleModal>
  );
};

export default EditGlovieModal;
