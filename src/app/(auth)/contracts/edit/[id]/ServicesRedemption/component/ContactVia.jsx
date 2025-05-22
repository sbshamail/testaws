import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import React, { useContext, useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { fetchPost } from "@/utils/action/function";
import { objectToFormData, Toastify } from "@/utils/helpers";
import { EditContractContext } from "../../page";
import Input from "@/app/Components/Inputs/Input";
import { GlobalContext } from "@/app/Provider";
import InputPhone from "@/app/Components/Inputs/InputPhone";

const ContactVia = () => {
  const { email, params, dealer, contract } = useContext(EditContractContext);

  const { auth, Token } = useContext(GlobalContext);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [value, setValue] = useState({
    ManualEmailAddress: email,
    ManualEmailSubjectLine: "",
    ManualEmailtextarea: "",
    Message_Type: "", //Email||SMS
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    contract?.GetRedemmedContractById?.map((item) =>
      formData.append("CouponIDs[]", item.CouponID)
    );

    const data = {
      ...value,

      Message_Type: selectedOption,
      ContractID: params?.id,
      DealerID: dealer,
      ...auth,
    };
    const formdata = objectToFormData(data, formData);
    const res = await fetchPost({
      api: "contracts/sendmanualemail",
      formdata,
      token: Token,
      isValue: true,
    });
    if (res.success === 1 || res.msg === 1) {
      setFormVisible(false);
      setValue({});
      return Toastify("success", res.message || res?.text);
    } else {
      Toastify("error", res?.message || res?.text);
    }
  };

  const handleInputEvent = (event) => {
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (type) => {
    setFormVisible(true);
    if (type === "SMS") {
      setSelectedOption("SMS");
      setValue({ ...value, ManualEmailAddress: "1222232234" });
    } else if (type === "Email") {
      setSelectedOption("Email");
      setValue({ ...value, ManualEmailAddress: email });
    }
  };

  const handleClose = () => {
    setFormVisible(false);
    setSelectedOption("");
    setValue({ phone: "", email: "" });
  };

  const selectIconButton = (cond, color) => (
    <div
      className={`rounded-lg p-4 shadow bg-secondary/80 hover:bg-secondary cursor-pointer text-secondary-foreground font-bold text-xl flex flex-col items-center border border-border  ${
        selectedOption === cond && `border border-${color} `
      }`}
      onClick={() => handleButtonClick(cond)}
    >
      <div className={`${selectedOption === cond ? `text-${color}` : ""} `}>
        Contact via {cond}
      </div>
      <AiOutlineMail
        size={37}
        className={`${
          selectedOption === cond ? `text-${color}` : "text-[#51565B]"
        } `}
      />
    </div>
  );
  return (
    <div className="w-full mt-4">
      <ShadowContainer>
        <div className="w-full">
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-around">
            {selectIconButton("Email", "siteOrange")}
            {selectIconButton("SMS", "siteOrange")}
          </div>

          {/* Form */}
          {formVisible && (
            <ShadowContainer>
              <div className=" p-4  rounded-lg relative">
                <div className="mb-2 ">
                  <Input
                    placeholder={
                      selectedOption === "SMS" ? "Enter SMS" : "Enter Email"
                    }
                    type="text"
                    value={value.ManualEmailAddress}
                    onChange={handleInputEvent}
                    name={"ManualEmailAddress"}
                  />
                </div>
                <div className="mb-2">
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-2 py-3 rounded"
                  >
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
                <div className="mb-2">
                  <Input
                    value={value.ManualEmailSubjectLine}
                    name="ManualEmailSubjectLine"
                    onChange={handleInputEvent}
                    type="text"
                    placeholder="Subject Line"
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    value={value.ManualEmailtextarea}
                    onChange={handleInputEvent}
                    name="ManualEmailtextarea"
                    rows="4"
                    placeholder="Message"
                    className="border border-gray-200 focus:border-gray-300 outline-none w-full px-2 py-3 rounded"
                  ></textarea>
                </div>
                <div className="flex w-full gap-3 justify-end">
                  <div
                    className="w-1/3 cursor-pointer bg-red-500 rounded-xl text-white flex justify-center items-center py-3 text-lg font-extrabold"
                    onClick={handleClose}
                  >
                    Cancel
                  </div>
                  <div
                    onClick={handleSubmit}
                    className="w-1/3 cursor-pointer bg-siteBlue rounded-xl text-white flex justify-center items-center py-3 text-lg font-extrabold"
                  >
                    Send Message
                  </div>
                </div>
              </div>
            </ShadowContainer>
          )}
        </div>{" "}
      </ShadowContainer>
    </div>
  );
};

export default ContactVia;
