import { Toastify } from "@/utils/helpers";
export const handleUpdatePassword = ({
  setIsLoading,
  username,
  password,
  resetPassword,
  resetPassScore,
}) => {
  if (username !== password) {
    Toastify("error", "Password and Confirm Password doesn't match.");
    return;
  }
  if (password.length <= 4) {
    Toastify("error", "Password must be greater than 4 characters.");
    return;
  }
  if (resetPassScore === 0) {
    Toastify("error", "Password must be strong.");
    return;
  }
  const formdata = new FormData();
  formdata.append("confpassword", username);
  formdata.append("password", password);
  formdata.append("ResetToken", resetPassword);
  setIsLoading(true);
  fetch("https://mypcp.us/react/login/passwordresetlink", {
    method: "POST",
    body: formdata,
  })
    .then((response) => {
      let res = response.json();
      return res;
    })
    .then((res) => {
      if (res["success"] == 1) {
        Toastify("success", res?.message);
      } else {
        Toastify("error", res["message"]);
      }
      setIsLoading(false);
    })
    .catch((error) => {
      Toastify("error", "Can't Update Password err3");
      console.log(error);
      setIsLoading(false);
    });
};

export const handleRecoveryPassword = ({ password, setIsLoading }) => {
  if (typeof window !== "undefined") {
    const formdata = new FormData();
    const domain = window.location.hostname;
    formdata.append("username", password);
    formdata.append("site_url", domain);
    setIsLoading(true);
    fetch("https://mypcp.us/react/login/forgetpassword", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        Toastify("success", res["message"]);
        setIsLoading(false);
      })
      .catch((error) => {
        Toastify("error", "Can't Recovery Password err3");
        console.log(error);
        setIsLoading(false);
      });
  }
};
