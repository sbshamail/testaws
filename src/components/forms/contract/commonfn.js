import { fetchPost } from "@/utils/action/function";
import { objectToFormData } from "@/utils/helpers";
import { Textarea } from "@nextui-org/react";

//get list of modelsData, modelsNewID
export const modelAgainstMake = async ({
  auth,
  Token,
  setLoading,
  MakeID,
  DealerID,
}) => {
  setLoading(true);
  // const MakeID =
  //   pvInfoForm.make instanceof Set
  //     ? [...pvInfoForm.make][0]
  //     : pvInfoForm.make;

  const formdata = objectToFormData({
    ...auth,
    MakeID,
    DealerID,
  });
  const res = await fetchPost({
    url: "https://mypcp.us/webservices/contracts/modelagainstmake",
    token: Token,
    formdata,
    setLoading,
  });
  return res;
};

// get data according to dealer id,
// list of dealerData, plans, smlcpoints, productsellingreps, salesperson
export const dataAgainstDealerId = async ({
  auth,
  DealerID,
  Token,
  setLoading,
}) => {
  setLoading(true);
  const formdata = objectToFormData({
    ...auth,
    DealerID,
  });
  const res = await fetchPost({
    url: "https://mypcp.us/webservices/contracts/dataagainstdealerid",
    token: Token,
    formdata,
    setLoading,
  });
  return res;
};

export const serviceContractCondition = (handleInputChange, priceInfoForm) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-6">
      <p>Did you purchase a service contract?</p>
      <div className="flex items-center space-x-1 ">
        <input
          className="cursor-pointer"
          type="radio"
          onChange={(event) => handleInputChange("isServicecontract", true)}
          checked={priceInfoForm?.isServicecontract === true}
        />
        <label>Yes</label>
      </div>
      <div className="flex items-center space-x-1 ">
        <input
          className="cursor-pointer"
          type="radio"
          onChange={(event) => handleInputChange("isServicecontract", false)}
          checked={
            priceInfoForm?.isServicecontract === false ||
            !priceInfoForm?.isServicecontract
          }
        />
        <label>No</label>
      </div>
    </div>
    {priceInfoForm?.isServicecontract && (
      <div>
        <Textarea
          value={priceInfoForm?.ServiceContract || ""}
          onChange={(event) =>
            handleInputChange("ServiceContract", event.target.value || "")
          }
          minRows={"6"}
          className="max-w-xl"
          placeholder="Enter your Contract Term & Condition Here"
        />
      </div>
    )}
  </div>
);
