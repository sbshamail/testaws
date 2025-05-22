"use client";
import React, { useState, useEffect, useContext, Suspense } from "react";
import { AiOutlineUser } from "react-icons/ai";

import { IoEyeOutline } from "react-icons/io5";
import { PiPassword } from "react-icons/pi";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

import BackgroundSlider from "./BackgroundSlider";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { GlobalContext } from "../../Provider";
import InputContainer from "../../Components/containers/InputContainer";
import Input from "../../Components/Inputs/Input";
import { Transition } from "@headlessui/react";

import PasswordStrengthBar from "react-password-strength-bar";

import { HiOutlineMail } from "react-icons/hi";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { useQuery } from "@/lib/hooks";
import { handleRecoveryPassword, handleUpdatePassword } from "../function";
import { Toastify } from "@/utils/helpers";
import Support from "../component/Support";
import { useTheme } from "@/utils/theme/themeProvider";
import SendEmail from "../component/SendEmail";

const Page = ({ params }) => {
  const [logoSrc, setLogoSrc] = useState("/images/procarmamergelogo.png");
  const [domain, setDomain] = useState(null);
  const { theme } = useTheme();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const getDomain = window.location.hostname;
      setDomain(getDomain);
      const logoPath = getDomain.startsWith("bda.procarma")
        ? "/images/BL-Logo-250.png"
        : "/images/procarmamergelogo.png";

      console.log("Logo Path:", logoPath);
      setLogoSrc(logoPath);
    }
  }, []);

  const {
    SET_GLOBAL_RESPONSE,
    SET_GLOBAL_MENUS_INFO,
    SET_GLOBAL_DEALERS_INFO,
    SET_TOKEN,
    SET_AUTH,
    setGlobalLoader,
  } = useContext(GlobalContext);

  const router = useRouter();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reCAPTCHA, setreCAPTCHA] = useState(null);
  const [buttonText, setButtonText] = useState("Log in");
  const [response, setResponse] = useState(null);
  const [menus, setMenus] = useState(null);
  const [dealers, setDealers] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(null);
  const [resetPassScore, setResetPassScore] = useState(0);

  // const [subject, setSubject] = useState("Send Enquiry");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { getQuery } = useQuery("redirectTo");
  const toggleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
    setResetPassword(null);
  };
  const toggleSendEmail = () => {
    setSendEmail(!sendEmail);
  };

  let captcha;

  const handleRecaptcha = (token) => {
    // This function is called when the user successfully completes the reCAPTCHA challenge
    // console.log("Captcha token:", token);
    setreCAPTCHA(token);
  };

  const handleLogin = () => {
    if (reCAPTCHA === null) {
      toast.error("Please complete the reCAPTCHA challenge.");
      return;
    }
    setIsLoading(true); // Set loading state to true
    setButtonText("Logging in");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("g-recaptcha-response", reCAPTCHA);
    fetch("https://mypcp.us/webservices/loginreactcopy/check_login", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setIsLoading(false);
        if (res.success === "success") {
          Toastify("success", "Successfully Logged In");
          setResponse(res);
          setMenus(res.menu);
          setDealers(res.dealers);
          fetchgetuserinfo(res.Token);
          handleStorage(res.menu, res.dealers, res);
          captcha.reset();
          setButtonText("Login");
        } else {
          setButtonText("Login");
          if (res.success === "error") {
            toast.error(res.msg);
            captcha.reset();
          }
        }
        // Navigation to dashboard here
      })
      .catch((error) => {
        toast.error("can't validate login err3");
        console.log(error);
        setButtonText("Login");
        captcha.reset();
        setIsLoading(false); // Set loading state to false on error
      });
  };

  const fetchgetuserinfo = (token) => {
    const headers = new Headers();
    headers.append("AUTHORIZATION", token);
    fetch("https://mypcp.us/webservices/loginreactcopy/getuserinfo", {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        Toastify("success", "Successfully Fetched User Info");
      })
      .catch((error) => {
        toast.error("Can't Get User Info err3");
        console.log(error);
      });
  };
  useEffect(() => {
    setGlobalLoader(false);

    // console.log('param length: ', params)
    if ("slug" in params) {
      if (params.slug[1] !== undefined) {
        setResetPassword(params.slug[1]);
        setForgotPassword(true);
      }
    }
  }, []);
  const query = getQuery();
  const handleStorage = (menus, dealers, response) => {
    if (response) {
      localStorage.setItem("GLOBAL_RESPONSE", JSON.stringify(response));
      SET_GLOBAL_RESPONSE(response);
      let authUser = {
        pcp_user_id: response?.pcp_user_id,
        role_id: response?.user_cizacl_role_id,
        user_id: response?.user_id,
      };
      if (response.customer_id) {
        authUser = {
          ...authUser,
          user_id_customer: response?.user_id_customer,
          customer_role_id: response.customer_cizacl_role_id,
        };
      }

      SET_AUTH(authUser);
      SET_TOKEN(response?.Token);
      const auth = JSON.stringify(authUser);
      // ✅ Set cookies on the client-side
      document.cookie = `Token=${response?.Token}; path=/; `;
      document.cookie = `auth=${auth}; path=/; `;
      if (response.customer_id) {
        setButtonText("Logged In");
        router.push("/customer");
      }
    }
    if (menus && dealers) {
      localStorage.setItem("GLOBAL_MENUS_INFO", JSON.stringify(menus));
      localStorage.setItem("GLOBAL_DEALERS_INFO", JSON.stringify(dealers));

      SET_GLOBAL_MENUS_INFO(menus);
      SET_GLOBAL_DEALERS_INFO(dealers);

      const url = query;
      setButtonText("Logged In");
      router.push(url ? url : "/dashboard");
    }
  };

  const setCaptchaRef = (ref) => {
    if (ref) {
      captcha = ref;
      return (captcha = ref);
    }
  };

  return (
    <Suspense
      fallback={<SpinnerCenterScreen loading={isLoading} center={true} />}
    >
      <div className="overflow-hidden">
        <SpinnerCenterScreen loading={isLoading} center={true} />
        <Toaster
          toastOptions={{
            style: {
              color: "white",
            },
            success: {
              style: {
                background: "rgba(0,255,0,0.6)",
              },
            },
            error: {
              style: {
                background: "#FF5555",
              },
            },
          }}
        />
        <div className="flex h-screen overflow-hidden justify-between">
          <div className="z-50 bg-card py-4 px-10 flex flex-col gap-3 items-center drop-shadow-md w-full h-screen lg:max-w-[48%] xl:max-w-[33.33%]">
            <Transition
              show={!sendEmail}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="h-full flex flex-col justify-center gap-6"
            >
              <div className="w-full  flex flex-col justify-center items-center">
                <Image
                  src={logoSrc}
                  width={200}
                  height={200}
                  alt={`procarma logo ${new Date().getTime()}`}
                />
                {domain?.startsWith("bda.procarma") ? null : (
                  <h2
                    className="text-sm text-card-foreground/80 mt-10
                   "
                  >
                    Preferred Customer Program
                  </h2>
                )}
              </div>
              <div className="flex flex-col w-full gap-4 items-center justify-center ">
                {!forgotPassword ? (
                  <div className="flex flex-col  items-center justify-center gap-4">
                    <Input
                      value={username}
                      setvalue={setUsername}
                      placeholder="Enter Username"
                      type="text"
                      width={96}
                      className={"w-full "}
                      suffix={() => <AiOutlineUser size={20} />}
                    />
                    {/* <div className="p-2 rounded-full bg-gray-100 flex mr-2 items-center">
                        <AiOutlineUser size={20} />
                      </div> */}

                    <Input
                      value={password}
                      setvalue={setPassword}
                      placeholder="Enter password"
                      type="password"
                      width={96}
                    />

                    <div className="flex justify-between flex-row w-full">
                      <div className="text-siteBlue flex">
                        <input
                          type="checkbox"
                          className="mr-2 border-siteBlue"
                          value={"remember"}
                        />
                        <label className="whitespace-nowrap">Remember me</label>
                      </div>
                      <button
                        className="text-card-foreground/80"
                        onClick={toggleForgotPassword}
                      >
                        Forgot password
                      </button>
                    </div>
                    <div className="flex flex-row justify-center w-full ">
                      <ReCAPTCHA
                        ref={(r) => setCaptchaRef(r)}
                        sitekey="6Lf2-H4bAAAAAHJ_CkUvSoElvh4HxI2fzOjrPTtC"
                        onChange={handleRecaptcha}
                        theme={theme}
                        size="normal"
                      />
                    </div>
                    <CustomButton onClick={handleLogin}>
                      {buttonText}
                    </CustomButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 w-5/6">
                    {resetPassword === null ? (
                      <>
                        <Input
                          value={password}
                          setvalue={setPassword}
                          placeholder="Enter email/contract number"
                          type="text"
                          width={96}
                          suffix={() => <HiOutlineMail size={20} />}
                        />

                        <p className="text-card-foreground/80 text-sm">
                          Will be sent to User’s Email Address
                        </p>
                      </>
                    ) : (
                      <>
                        <InputContainer>
                          <div className="flex items-center border rounded-3xl p-1 pl-3">
                            <Input
                              value={password}
                              setvalue={setPassword}
                              placeholder="New Password"
                              type={showPassword ? "text" : "password"}
                              width={96}
                              bgcolor={"transparent"}
                            />
                            <div className="p-2 rounded-full bg-secondary flex justify-center items-center">
                              {!showPassword ? (
                                <IoEyeOutline
                                  size={20}
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                />
                              ) : (
                                <PiPassword
                                  size={20}
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </InputContainer>
                        <PasswordStrengthBar
                          password={password}
                          onChangeScore={(score, feedback) =>
                            setResetPassScore(score)
                          }
                        />
                        <InputContainer>
                          <div className="flex items-center border rounded-3xl p-1 pl-3">
                            <Input
                              value={username}
                              setvalue={setUsername}
                              placeholder="Confirm New Password"
                              type={showConfirmPassword ? "text" : "password"}
                              width={96}
                              bgcolor={"transparent"}
                            />
                            <div className="p-2 rounded-full bg-secondary flex justify-center items-center">
                              {!showConfirmPassword ? (
                                <IoEyeOutline
                                  size={20}
                                  onClick={() => {
                                    setShowConfirmPassword(
                                      !showConfirmPassword
                                    );
                                  }}
                                />
                              ) : (
                                <PiPassword
                                  size={20}
                                  onClick={() => {
                                    setShowConfirmPassword(
                                      !showConfirmPassword
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </InputContainer>
                        <p className="text-card-foreground/80 text-sm">
                          All your contract(s) password will be updated.
                        </p>
                      </>
                    )}
                    <div className="flex justify-between">
                      <CustomButton
                        variant="white"
                        onClick={toggleForgotPassword}
                      >
                        Back to Login
                      </CustomButton>
                      {isLoading === true ? (
                        <div></div>
                      ) : (
                        <>
                          {resetPassword === null ? (
                            <CustomButton
                              variant="main"
                              onClick={() =>
                                handleRecoveryPassword({
                                  password,
                                  setIsLoading,
                                })
                              }
                            >
                              Send Email
                            </CustomButton>
                          ) : (
                            <CustomButton
                              variant="main"
                              onClick={() =>
                                handleUpdatePassword({
                                  setIsLoading,
                                  username,
                                  password,
                                  resetPassword,
                                  resetPassScore,
                                })
                              }
                            >
                              Update Password
                            </CustomButton>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Questions /support us */}
              <Support toggleSendEmail={toggleSendEmail} />
              {/* <div className="flex flex-col pt-4 gap-5">
              <p className="text-card-foreground/80 text-sm tracking-tighter text-center">
                KEEP TRACK OF YOUR VEHICLE’S MAINTENANCE ON ANY DIGITAL PLATFORM
              </p>
              <div className="grid grid-cols-4">
                <div className="flex flex-col justify-center text-center items-center gap-y-2 leading-4">
                  <Image
                    src={"/images/track.png"}
                    width={60}
                    height={60}
                    alt="Track"
                  />
                  <p className="text-card-foreground/80 text-sm tracking-tight pt-4">
                    TRACK
                    <br /> SERVICES
                  </p>
                </div>
                <div className="flex flex-col justify-center text-center items-center gap-y-2 leading-4">
                  <Image
                    src={"/images/specials.png"}
                    width={60}
                    height={60}
                    alt="Track"
                  />
                  <p className="text-card-foreground/80 text-sm tracking-tight pt-4">
                    IN-APP
                    <br /> SPECIALS
                  </p>
                </div>
                <div className="flex flex-col justify-center text-center items-center gap-y-2 leading-4">
                  <Image
                    src={"/images/in-app-chat.png"}
                    width={60}
                    height={60}
                    alt="Track"
                  />
                  <p className="text-card-foreground/80 text-sm tracking-tight pt-4">
                    IN-APP CHAT & APPOINTMENTS
                  </p>
                </div>
                <div className="flex flex-col justify-center text-center items-center gap-y-2 leading-4">
                  <Image
                    src={"/images/digital.png"}
                    width={60}
                    height={60}
                    alt="Track"
                  />
                  <p className="text-card-foreground/80 text-sm tracking-tight pt-4">
                    DIGITAL GLOVEBOX
                  </p>
                </div>
              </div>
            </div> */}
            </Transition>

            <SendEmail
              sendEmail={sendEmail}
              setIsLoading={setIsLoading}
              toggleSendEmail={toggleSendEmail}
            />
          </div>
          <div className="flex flex-1 bg-cover bg-center relative invisible lg:visible">
            <BackgroundSlider />
          </div>
        </div>
        {/* {isLoading ? (
        <div className="absolute w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      ) : null} */}
      </div>
    </Suspense>
  );
};

export default Page;
