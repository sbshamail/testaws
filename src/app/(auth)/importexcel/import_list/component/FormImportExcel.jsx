"use client";
import React from "react";
import Input from "@/app/Components/Inputs/Input";

import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchImportExport } from "./function";
import { SimpleFilterableSelect } from "@/components/cui/select/SimpleFilterableSelect";

import { formatDate } from "@/utils/helpers";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import FixedDateParameterButton from "@/components/FixedDateParameterButton";

const FormImportExcel = ({
  dispatch,
  selector,
  setLoading,
  auth,
  Token,
  values,
  setValues,
  FixedDateParameter,
  setFixedDateParameter,
  admindealeroptions,
}) => {
  const handleInputValues = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = ({ showDate, dateParameter }) => {
    let FromDate = "";
    let ToDate = "";
    let fixedDateParameter = dateParameter ? dateParameter : "";
    if (showDate) {
      FromDate = formatDate(values.FromDate);
      ToDate = formatDate(values.ToDate);
    } else {
      setValues({ ...values, FromDate: "", ToDate: "" });
    }
    const data = { ...values, FromDate, ToDate, fixedDateParameter };
    setFixedDateParameter(fixedDateParameter);
    fetchImportExport({
      dispatch,
      selector,
      setLoading,
      values,
      auth,
      Token,
      data,
    });
  };

  return (
    <ShadowContainer>
      <div className="w-full flex items-center justify-between gap-6 flex-wrap ">
        <div className="flex gap-4 items-center flex-wrap lg:flex-nowrap w-full lg:w-auto">
          <SimpleFilterableSelect
            placeholder="Select Dealer"
            value={values.DealerID}
            setvalue={(value) => handleInputValues("DealerID", value)}
            options={admindealeroptions}
            className="flex-1"
          />
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Input
              value={values.FromDate}
              setvalue={(value) => handleInputValues("FromDate", value)}
              type="date"
              className="p-2 w-full"
            />
            <Input
              value={values.ToDate}
              setvalue={(value) => handleInputValues("ToDate", value)}
              type="date"
              className="p-2 w-full"
            />
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-4 lg:flex-nowrap w-full lg:w-auto">
          <div className="flex gap-2 items-center flex-wrap">
            <div className="min-w-72">
              <FixedDateParameterButton
                action={handleSubmit}
                FixedDateParameter={FixedDateParameter}
              />
            </div>
          </div>
          <CustomButton
            className="w-full lg:w-max"
            onClick={() => handleSubmit({ showDate: true })}
          >
            Search
          </CustomButton>
        </div>
      </div>
    </ShadowContainer>
  );
};

export default FormImportExcel;
