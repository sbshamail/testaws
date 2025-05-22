import { Toastify } from "@/utils/helpers";
import toast from "react-hot-toast";
export const initialState = {
  fname: "",
  lname: "",
  password: "",
  streetaddress: "",
  country: "226",
  city: "",
  state: "",
  email: "",
  zip: "",
  phone: "",
  dob: "",
  sendemail: "",
  sendsms: "",
  hidetestcontract: "",
};
export const validate = (contactInfoForm, setErrors) => {
  const newErrors = [];

  if (!contactInfoForm.fname) newErrors.push("First name is required");
  if (!contactInfoForm.lname) newErrors.push("Last name is required");
  if (!contactInfoForm.streetaddress)
    newErrors.push("Street address is required");
  if (!contactInfoForm.country) newErrors.push("Country is required");
  if (!contactInfoForm.city) newErrors.push("City is required");
  if (!contactInfoForm.state) newErrors.push("State is required");
  if (!contactInfoForm.zip) newErrors.push("Zip code is required");
  if (!contactInfoForm.phone) {
    newErrors.push("Phone number is required");
  } else if (!/^\d{3}-\d{3}-\d{4}$/.test(contactInfoForm.phone)) {
    newErrors.push("Phone number must be in the format 123-123-1111");
  }
  if (!contactInfoForm.email) {
    newErrors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfoForm.email)) {
    newErrors.push("Invalid email format");
  }

  setErrors(newErrors);

  newErrors.forEach((error) => Toastify("error", error));

  return newErrors.length === 0;
};
