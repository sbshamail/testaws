"use client";
import React, { useState, useEffect, useContext } from "react";
import { DashboardContext } from "../../DashboardContext";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Select from "@/app/Components/Inputs/Select";

import Selector from "./Selector";
import Button from "@/app/Components/Button";

import { urls } from "../../function";
import { formatDate, objectToFormData } from "@/utils/helpers";

// google map
import ShowGoogleMap from "./ShowGoogleMap";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";
//redux
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useSelection } from "@/reduxStore/function";
import DetailWrapper from "./DetailWrapper";
import { fetchPost, fetchPostObj } from "@/utils/action/function";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
const RetentionMap = () => {
  const [key, setkey] = useState(0);

  const { auth, Token } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const dashboardReducer = setReducer("dashboard");
  const dashboardSelection = useSelection("dashboard") ?? {};
  const {
    dealersetting,
    startdate,
    enddate,
    FixedDateParameter,
    resetAll,
    dealer,
  } = useContext(DashboardContext);
  const [data, setdata] = useState(null);
  const [markerlist, setmarkerlist] = useState([]);
  const [circle1markers, setcircle1markers] = useState(0);
  const [circle2markers, setcircle2markers] = useState(0);
  const [circle3markers, setcircle3markers] = useState(0);
  const [loading, setloading] = useState(false);
  const [searchtype, setsearchtype] = useState(0);
  const [maptype, setmaptype] = useState(0);
  const [mapcircleradius, setmapcircleradius] = useState(5);
  const [all, setall] = useState(false);
  const [active, setactive] = useState(true);
  const [pending, setpending] = useState(false);
  const [cancelled, setcancelled] = useState(false);
  const [matured, setmatured] = useState(false);
  const [pendingmatured, setpendingmatured] = useState(false);
  const [subscriptions, setsubscriptions] = useState(false);
  const [marketplace, setmarketplace] = useState(false);
  const [monthssubscriptions, setmonthssubscriptions] = useState("0");
  const [monthsservices, setmonthsmonthsservices] = useState("0");

  const monthlist = Array.from({ length: 13 }, (_, i) => ({
    text: `${i} month${i > 1 ? "s" : ""}`,
    value: i.toString(),
  }));

  const handleSetAll = (cond) => {
    setall(cond);
    setactive(cond);
    setpending(cond);
    setcancelled(cond);
    setmatured(cond);
    setpendingmatured(cond);
  };
  const selectorlist = [
    { value: all, setvalue: () => handleSetAll(!all), text: "All" },
    { value: active, setvalue: setactive, text: "Active" },
    { value: pending, setvalue: setpending, text: "Pending" },
    { value: cancelled, setvalue: setcancelled, text: "Cancelled" },
    { value: matured, setvalue: setmatured, text: "Matured" },
    {
      value: pendingmatured,
      setvalue: setpendingmatured,
      text: "Pending Matured",
    },
  ];
  useEffect(() => {
    setdata(dashboardSelection.retentionmap);
  }, []);
  const getPostData = (more) => {
    let formdata = new FormData();
    const FromDate = formatDate(startdate);
    const ToDate = formatDate(enddate);
    const data = {
      ...auth,
      DealerID: dealersetting?.dealer?.DealerID,
      FromDate,
      ToDate,
      FixedDateParameter,
      monthbefore: monthssubscriptions,
      submonthbefore: monthsservices,
      // mapview: maptype,
      graphoption: maptype,
      AllContractStatus: all ? "1" : "0",
      IsSubscription: subscriptions ? "1" : "0",
      IsMarketPlace: marketplace ? "1" : "0",
      SearchType: searchtype,
      ...more,
    };
    if (active) {
      formdata.append("ContractStatus[]", "L");
      formdata.append("ContractStatus[]", "S");
    }
    if (pending) {
      formdata.append("ContractStatus[]", "I");
    }
    if (cancelled) {
      formdata.append("ContractStatus[]", "C");
    }
    if (pendingmatured) {
      formdata.append("ContractStatus[]", "P");
    }
    if (matured) {
      formdata.append("ContractStatus[]", "M");
    }
    const formData = objectToFormData(data, formdata);
    return formData;
  };
  const fetchRetensionMapData = async () => {
    setloading(true);
    setdata(null);
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    const formdata = getPostData();

    fetch(urls.retentionmap, {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setloading(false);
        if (res.success == "1") {
          const mapInfo = {
            IsSubscription: subscriptions ? "1" : "0",
            IsMarketPlace: marketplace ? "1" : "0",
            monthbefore: monthssubscriptions,
            submonthbefore: monthsservices,
            AllContractStatus: all ? "1" : "0",
          };
          const contractStatus = {
            active: active ? "L" : "",
            pending: pending ? "I" : "",
            cancelled: cancelled ? "C" : "",
            pendingmatured: pendingmatured ? "P" : "",
            matured: matured ? "M" : "",
          };
          const responseData = { ...res, mapInfo, contractStatus };
          setdata(responseData);
          dispatch(
            dashboardReducer({
              retentionmap: responseData,
            })
          );
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Map Data err3");
        console.log(error);
      });
  };
  useEffect(() => {
    if (dealersetting) {
      fetchRetensionMapData();
    }
  }, [dealersetting]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setkey(!key);
    }, 2000);

    // Cleanup function to clear the timer in case the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [data, maptype]);

  useEffect(() => {
    if (data) {
      let templist = [];
      data?.json?.myPlaces?.map((marker, i) => {
        templist.push({
          id: marker.data.ID,
          title: marker.data.title,
          column_name: marker.data.column_name,
          type: marker.data.type,
          lat: parseFloat(marker.lat),
          lng: parseFloat(marker.lng),
          icon: marker.options
            ? marker.options.icon
            : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        });
      });
      setmarkerlist(templist);
    }
  }, [data]);

  const changeRadius = async () => {
    const formdata = getPostData({ rad: mapcircleradius });
    const res = await fetchPost({
      formdata,
      token: Token,
      api: "dashboard/changeradius",
      setLoading: setloading,
    });
    console.log(res);
    if (res) {
      setcircle1markers(res.rad_circle1);
      setcircle2markers(res.rad_circle2);
      setcircle3markers(res.rad_circle3);
    }
  };

  useEffect(() => {
    if (data) {
      changeRadius();
    }
  }, [mapcircleradius, data]);
  useEffect(() => {
    if (dealer) {
      setdata(null);
    }
  }, [resetAll]);

  return (
    <div className="w-full">
      <ShadowContainer>
        <SpinnerCenterScreen loading={loading} />
        <div className="flex flex-col lg:flex-row flex-wrap gap-5 lg:justify-between lg:items-center">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label className="text-sm">Ongoing Subscriptions</label>
              <div className="flex items-center gap-1">
                <div>
                  <BsCircleFill className="text-yellow-300 text-2xl" />
                </div>
                <Select
                  placeholder={"Ongoing Subscriptions"}
                  value={monthssubscriptions?.toString()}
                  setvalue={setmonthssubscriptions}
                  options={monthlist}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Contracts with unused services</label>
              <div className="flex items-center gap-1">
                <div className="w-8">
                  <Image
                    src="/images/dollar.png"
                    alt="dollar"
                    height={"100"}
                    width={"100"}
                    className="bg-transparent"
                  />
                </div>
                <Select
                  placeholder="Contracts with unused services"
                  value={monthsservices?.toString()}
                  setvalue={setmonthsmonthsservices}
                  options={monthlist}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Selector
              unique
              value={searchtype}
              setvalue={setsearchtype}
              text="Redemption"
              text2="Contracts Sold"
            />
            <Selector
              unique
              value={maptype}
              setvalue={setmaptype}
              text="Advanced View"
              text2="Normal View"
            />
            <Button
              text="Search"
              onClick={fetchRetensionMapData}
              bg="green-500"
            ></Button>
          </div>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6  gap-2 mb-2 mt-10">
          {selectorlist.map((item, i) => (
            <Selector
              key={i}
              value={item.value}
              setvalue={item.setvalue}
              text={item.text}
            />
          ))}
        </div>
        <div className="flex ms-20 items-center space-x-2 ">
          <Selector
            value={subscriptions}
            setvalue={setsubscriptions}
            text={"Subscriptions"}
          />
          <Selector
            value={marketplace}
            setvalue={setmarketplace}
            text={"Marketplace"}
          />
        </div>
        <ShowGoogleMap
          loading={loading}
          markerlist={markerlist}
          data={data}
          maptype={maptype}
          mapcircleradius={mapcircleradius}
        />
        <div>
          {(maptype === 0 || maptype === 1) && data && (
            <>
              {maptype === 1 && (
                <div className="mt-5">
                  <input
                    id="default-range"
                    type="range"
                    value={mapcircleradius}
                    onChange={(event) =>
                      setmapcircleradius(Number(event.target.value))
                    }
                    min={5}
                    max={50}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="text-xl font-bold text-center mt-5">
                    {mapcircleradius}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-5 mt-10" key={data}>
                <DetailWrapper
                  mapcircleradius={mapcircleradius}
                  circle1markers={circle1markers}
                  circle2markers={circle2markers}
                  circle3markers={circle3markers}
                  data={data}
                  monthlist={monthlist}
                  monthssubscriptions={monthssubscriptions}
                  monthsservices={monthsservices}
                  subscriptions={subscriptions}
                  marketplace={marketplace}
                  searchtype={searchtype}
                  all={all}
                  active={active}
                  pending={pending}
                  cancelled={cancelled}
                  pendingmatured={pendingmatured}
                  matured={matured}
                  maptype={maptype}
                />
              </div>
            </>
          )}
        </div>
      </ShadowContainer>
    </div>
  );
};

export default RetentionMap;
