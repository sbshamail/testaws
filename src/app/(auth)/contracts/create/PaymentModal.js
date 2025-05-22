import Image from "next/image";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const PaymentModal = ({ closeModal }) => {
  const [activeTab, setActiveTab] = useState("creditCard");

  const [creditCardData, setCreditCardData] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    card: "",
    companyName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    saveCardInfo: false,
    termsAccepted: false,
  });

  const [bankAccountData, setBankAccountData] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    title: "",
    bankName: "",
    routingNumber: "",
    saveCardInfo: false,
    termsAccepted: false,
  });
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});
  const expiryDate = `${creditCardData.expiryMonth.padStart(
    2,
    "0"
  )}/${creditCardData.expiryYear.padStart(2, "0")}`;
  const handleFocus = (e) => {
    setFocused(e.target.name);
  };

  const handleCreditCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreditCardData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    validateField(name, value);
  };

  const handleBankAccountChange = (e) => {
    const { name, value } = e.target;
    setBankAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    // Check if the input has at least one character before validating
    if (value.trim().length > 0) {
      switch (name) {
        case "cvc":
          if (!/^\d{3}$/.test(value)) {
            errorMsg = "Invalid CVC";
          }
          break;
        case "expiryMonth":
          if (
            !/^\d{2}$/.test(value) ||
            !/^[0-9]+$/.test(value) ||
            parseInt(value) < 1 ||
            parseInt(value) > 12
          ) {
            errorMsg = "Invalid month";
          }
          break;
        case "expiryYear":
          if (
            !/^\d{2}$/.test(value) ||
            !/^[0-9]+$/.test(value) ||
            parseInt(value) < 22
          ) {
            // Assuming current year is 2024
            errorMsg = "Invalid year";
          }
          break;
        case "cardNumber":
          const sanitizedCardNumber = value.replace(/\s+/g, ""); // Remove all spaces
          if (
            !/^\d{16}$/.test(sanitizedCardNumber) ||
            !/^[0-9]+$/.test(sanitizedCardNumber)
          ) {
            errorMsg = "Invalid card number";
          }
          break;
        default:
          break;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-7 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-1 ">
          <h2 className="text-2xl font-semibold text-gray-900">Payment Info</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mb-6 border-gray-200">
          <nav className="flex">
            <button
              className={`${
                activeTab === "creditCard"
                  ? "border-b-2 border-siteBlue text-siteBlue"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              } py-2 px-4 font-medium text-base transition-colors duration-300`}
              onClick={() => setActiveTab("creditCard")}
            >
              Credit Card
            </button>
            <button
              className={`${
                activeTab === "bankAccount"
                  ? "border-b-2 border-siteBlue text-siteBlue"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              } py-2 px-4 font-medium text-base transition-colors duration-300`}
              onClick={() => setActiveTab("bankAccount")}
            >
              Bank Account
            </button>
          </nav>
        </div>
        {activeTab === "creditCard" ? (
          <CreditCardForm
            formData={creditCardData}
            handleChange={handleCreditCardChange}
            expiryDate={expiryDate}
            handleFocus={handleFocus}
            setFocused={setFocused}
            focused={focused}
            errors={errors}
          />
        ) : (
          <BankAccountForm
            formData={bankAccountData}
            handleChange={handleBankAccountChange}
          />
        )}
      </div>
    </div>
  );
};

const CreditCardForm = ({
  formData,
  handleChange,
  expiryDate,
  handleFocus,
  focused,
  errors,
}) => (
  <>
    <div id="PaymentForm" className="mb-5">
      <Cards
        cvc={formData.cvc}
        expiry={expiryDate}
        focused={focused}
        name={`${formData.firstName} ${formData.lastName}`}
        number={formData.cardNumber}
      />
    </div>
    <form className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            onFocus={handleFocus}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            onFocus={handleFocus}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            onFocus={handleFocus}
            maxLength={"16"}
            className={`mt-1 block w-full p-3 border ${
              errors.cardNumber ? "border-red-500" : "border-gray-300"
            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.cardNumber && (
            <span className="text-red-500 text-sm">{errors.cardNumber}</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Expiry Date
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="expiryMonth"
              maxLength={"2"}
              placeholder="MM"
              value={formData.expiryMonth}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`mt-1 block w-1/2 p-3 border ${
                errors.expiryMonth ? "border-red-500" : "border-gray-300"
              } rounded-xl shadow-sm focus:outline-none`}
            />
            <input
              type="text"
              name="expiryYear"
              placeholder="YY"
              maxLength={"2"}
              value={formData.expiryYear}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`mt-1 block w-1/2 p-3 border ${
                errors.expiryYear ? "border-red-500" : "border-gray-300"
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>
          {errors.expiryMonth && (
            <span className="text-red-500 text-sm">{errors.expiryMonth}</span>
          )}
          &nbsp; &nbsp;
          {errors.expiryYear && (
            <span className="text-red-500 text-sm">{errors.expiryYear}</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">CVC</label>
          <input
            type="text"
            name="cvc"
            value={formData.cvc}
            maxLength={"3"}
            onChange={handleChange}
            placeholder="CVC"
            onFocus={handleFocus}
            className={`mt-1 block w-full p-3 border ${
              errors.cvc ? "border-red-500" : "border-gray-300"
            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.cvc && (
            <span className="text-red-500 text-sm">{errors.cvc}</span>
          )}
        </div>
        {/* <div>
            <label className="block text-gray-700 text-sm font-medium">
              Card Type
            </label>
            <select
              name="card"
              value={formData.card}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Card</option>
              <option value="American Express">American Express</option>
              <option value="Diner's Club">Diner's Club</option>
              <option value="Discover">Discover</option>
              <option value="JCB">JCB</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>
          </div> */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            onFocus={handleFocus}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onFocus={handleFocus}
            onChange={handleChange}
            placeholder="Address"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            onFocus={handleFocus}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            onFocus={handleFocus}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Country</option>
            {/* Add country options */}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="State"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Zip Code"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="saveCardInfo"
            checked={formData.saveCardInfo}
            onChange={handleChange}
            onFocus={handleFocus}
            className="form-checkbox h-5 w-5 text-siteBlue"
          />
          <label className="text-gray-700 text-sm">Save Card Information</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            onFocus={handleFocus}
            className="form-checkbox h-5 w-5 text-siteBlue"
          />
          <label className="text-gray-700 text-sm">
            Accept Terms and Conditions
          </label>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-2">
        <Image
          src={"/images/payment-methods.png"}
          alt="payment methods"
          width={750}
          height={750}
        />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-2 items-center">
          <Image
            src={"/images/payment-emoji.png"}
            alt="payment emoji"
            width={70}
            height={70}
          />
          <div className="text-lg font-bold">BASIC SUBSCRIPTION</div>
        </div>
        <button
          type="submit"
          className="px-20 py-3 bg-siteBlue text-white font-medium rounded-xl shadow-md hover:bg-[#44caff] focus:outline-none focus:ring-2"
        >
          Pay Now
        </button>
      </div>
    </form>
  </>
);

const BankAccountForm = ({ formData, handleChange }) => (
  <form className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 text-sm font-medium">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">
          Account Number
        </label>
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">
          Account Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Account Title"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">
          Bank Name
        </label>
        <input
          type="text"
          name="bankName"
          value={formData?.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">
          Routing Number
        </label>
        <input
          type="text"
          name="routingNumber"
          value={formData.routingNumber}
          onChange={handleChange}
          placeholder="Routing Number"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="saveCardInfo"
          checked={formData.saveCardInfo}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <label className="text-gray-700 text-sm">
          Save Account Information
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <label className="text-gray-700 text-sm">
          Accept Terms and Conditions
        </label>
      </div>
    </div>
    <div className="flex justify-between items-end">
      <div className="flex gap-2 items-center mt-4">
        <Image
          src={"/images/payment-emoji.png"}
          alt="payment emoji"
          width={70}
          height={70}
        />
        <div className="text-lg font-bold">BASIC SUBSCRIPTION</div>
      </div>
      <button
        type="submit"
        className="px-20 py-3 mt-4 bg-siteBlue text-white font-medium rounded-xl shadow-md hover:bg-[#44caff] focus:outline-none focus:ring-2"
      >
        Pay Now
      </button>
    </div>
  </form>
);

export default PaymentModal;
