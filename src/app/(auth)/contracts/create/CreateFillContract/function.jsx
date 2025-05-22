// Function to handle "Next" button click
export const handle_Contact_PV_Info = (
  contactInfoForm,
  pvInfoForm,
  setFillContractData
) => {
  // console.log("pvInfo", pvInfo);

  const contactInfo = {
    CustomerFName: contactInfoForm.fname,
    CustomerLName: contactInfoForm.lname,
    CustomerAddressLine1: contactInfoForm.streetaddress,
    CustomerAddressLine2: contactInfoForm.CustomerAddressLine2,
    dob: contactInfoForm.dob,
    Email: contactInfoForm.email,
    PhoneHome: contactInfoForm.phone,
    CityName: contactInfoForm.city,
    StateID: contactInfoForm.state,
    CountryID: contactInfoForm.country,
    CustomerZIP: contactInfoForm.zip,
    SendEmail: contactInfoForm.sendemail,
    HideTestContract: contactInfoForm.hidetestcontract,
    SendSms: contactInfoForm.sendsms,
  };
  const pvInfo = {
    VIN: pvInfoForm.vin,
    DealerID: pvInfoForm?.dealer,
    PlanID: pvInfoForm?.plan,
    MakeID: pvInfoForm?.make,
    ModelID: pvInfoForm?.model,
    VehYear: pvInfoForm?.year,
    VehicleType: pvInfoForm?.vehicletype,
    Mileage: pvInfoForm?.mileage,
    SellingRep: pvInfoForm?.productsellingrep,
    SaleDate: pvInfoForm?.saledate,
    ValidityDate: pvInfoForm?.expNew,
    Loyalty_Map: pvInfoForm?.loyaltyCash
      ? 1
      : pvInfoForm?.loyaltyPointsNew
      ? 1
      : 0,
    LoyaltyCashEnable: pvInfoForm?.loyaltyPoints ? 1 : 0,
    EnableWelcomeSms: pvInfoForm?.welcomeSms ? 1 : 0,
    DealNo: pvInfoForm?.deal,
    StockDealNo: pvInfoForm?.stock,
    LoyaltyID: pvInfoForm?.smlcPointsSelect,
    new_Contract_Number: pvInfoForm?.contractno,
    SIManagerID: pvInfoForm?.salesperson,
    RO: pvInfoForm?.RO,
  };
  setFillContractData({ contactInfo, pvInfo });
};
