import { fetchPostObj } from "@/utils/action/function";

export const handleFieldValue = (field, value, setValue, setFormErrors) => {
  if (value instanceof Set) {
    value = [...value][0];
  }
  setValue((prevData) => ({
    ...prevData,
    [field]: value,
  }));
  if (setFormErrors) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "", // Clear error message on change
    }));
  }
};

export const getUserTitlebyDealerId = async ({ DealerID }) => {
  const res = await fetchPostObj({
    api: "users/usertitlesbydealerid",
    data: { DealerID },
    isValue: true,
  });

  return res;
};
