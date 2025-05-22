"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Shadow from "@/components/tag/Shadow";
import Border from "@/components/tag/Border";
import HButton from "@/components/button/HButton";
import HTextField from "@/components/dataEntry/HTextField";
import HIdSelectField from "@/components/select/HIdSelectField";
import MultiSelection from "@/components/select/MultiSelection";

import InputDatePicker from "@/components/popOver/datePicker/InputDatePicker";
import Calender from "@/components/popOver/datePicker/Calender";
import IconDropdown from "@/components/popOver/dropDown/IconDropdown";
import SimpleModal from "@/components/modals/SimpleModel";
import HDrawer from "@/components/drawer/HDrawer";
import Layout from "@/components/layout/Layout";
import { sidebarContents } from "@/components/sidebarNavigation";
import ResizeDiv from "@/components/tag/ResizeDiv";
import HSearchField from "@/components/dataEntry/HSearchField";
const HomePage = () => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpens, setDrawerOpens] = useState(false);

  return (
    <Layout
      sidebarTitle="HUI"
      sidebarContents={sidebarContents}
      type="fixed"
      position="left"
    >
      <div>
        <Navbar />
        <div className="space-y-10">
          {/* Paragraph */}
          <div id="paragraph" className="space-y-4">
            <h1 className="text-shadow">Paragraph</h1>
            <ResizeDiv>
              <>
                <Shadow space="1" className=" shadow-lg space-y-4 ">
                  <h2>Paragraph Shadow Lg</h2>
                  <p className="">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Nulla consequat massa quis enim.
                    Donec pede justo, fringilla vel, aliquet nec, vulputate
                    eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                    venenatis vitae, justo. Nullam dictum felis eu pede mollis
                    pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
                    semper nisi. Aenean vulputate eleifend
                  </p>
                </Shadow>
                <Shadow space="1" className="shadow-md space-y-4 ">
                  <h2>Paragraph Shadow Md</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Nulla consequat massa quis enim.
                    Donec pede justo, fringilla vel, aliquet nec, vulputate
                    eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                    venenatis vitae, justo. Nullam dictum felis eu pede mollis
                    pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
                    semper nisi. Aenean vulputate eleifend
                  </p>
                </Shadow>
                <Shadow className=" shadow space-y-4">
                  <h2>Paragraph Shadow</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Nulla consequat massa quis enim.
                    Donec pede justo, fringilla vel, aliquet nec, vulputate
                    eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                    venenatis vitae, justo. Nullam dictum felis eu pede mollis
                    pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
                    semper nisi. Aenean vulputate eleifend
                  </p>
                </Shadow>
              </>
              <Border space="1" className="space-y-4">
                <h2>Paragraph Border</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                  In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                  justo. Nullam dictum felis eu pede mollis pretium. Integer
                  tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                  vulputate eleifend
                </p>
              </Border>
            </ResizeDiv>
          </div>
          {/* Button */}
          <div id="button" className="space-y-4 ">
            <h1 className="text-shadow">Button</h1>
            <div className="gap-4 md:space-y-0 md:gap-2 flex flex-wrap ">
              <div>
                <HButton>Primary</HButton>
              </div>
              <div>
                <HButton className="secondary">Secondary</HButton>
              </div>
              <div>
                {" "}
                <HButton className="danger">Danger</HButton>
              </div>
              <div>
                <HButton className="success">Success</HButton>
              </div>
              <div>
                <HButton className="warning">Warning</HButton>
              </div>
              <div>
                <HButton size="1">Primary Size 1</HButton>
              </div>

              <div>
                <HButton size="2">Primary Size 2</HButton>
              </div>
            </div>
          </div>
          {/* Input Field */}
          <div id="input" className="space-y-4 relative">
            <h1 className="text-shadow">Input Fields</h1>
            <div className="gap-4 md:space-y-0 md:gap-2 flex flex-wrap">
              <HTextField label={"xs"} inputSize="0" />
              <HTextField label={"Small"} inputSize="1" />
              <HTextField label={"Standard"} />
              <HTextField label={"Large"} inputSize="3" />
              <HSearchField />
            </div>
          </div>
          {/* TextArea Field */}
          <div id="textarea" className="space-y-4 ">
            <h1 className="text-shadow">Text Area Fields</h1>
            <div className="gap-4 md:space-y-0 md:gap-2 flex flex-wrap">
              <HTextField label={"xs"} rows={2} textarea={true} inputSize="0" />
              <HTextField
                label={"Small"}
                rows={3}
                textarea={true}
                inputSize="1"
              />
              <HTextField label={"Standard"} textarea={true} />
              <HTextField
                label={"Large"}
                rows={5}
                textarea={true}
                inputSize="3"
              />
            </div>
          </div>
          {/* Select Field */}
          <div id="select" className="space-y-4  ">
            <h1 className="text-shadow">Select Fields</h1>
            <div className="gap-4 md:space-y-0 md:gap-2 flex flex-wrap">
              <HIdSelectField value={value} setValue={setValue} />

              <MultiSelection values={values} setValues={setValues} />
              <IconDropdown />
            </div>
          </div>
          {/* Pop Over Dates*/}
          <div id="popover" className="space-y-4 ">
            <h1>Pop Over</h1>
            <div className="gap-4 md:space-y-0 md:gap-2 flex flex-wrap">
              <div className="flex items-center">
                Choose Calender:
                <Calender />
              </div>
              <div className="flex items-center">
                <span className="me-2">Input Date:</span>
                <InputDatePicker />
              </div>
            </div>
          </div>

          {/* Modals and Drawer*/}
          <div id="modal" className="space-y-4 relative ">
            <h1>Modals & Drawer</h1>
            <div className="gap-4 md:space-y-0 md:gap-2 flex flex-wrap">
              <div className="flex items-center">
                Modals:
                <div
                  onClick={() => setModalOpen(true)}
                  className="ms-2 cursor-pointer"
                >
                  <HButton>Open Modal</HButton>
                </div>
                <SimpleModal
                  open={modalOpen}
                  close={setModalOpen}
                ></SimpleModal>
              </div>
              <div className="flex items-center relative">
                Drawer:
                <div
                  onClick={() => setDrawerOpen(true)}
                  className="ms-2 cursor-pointer"
                >
                  <HButton>Open Drawer</HButton>
                </div>
                <HDrawer
                  position="right"
                  open={drawerOpen}
                  size="2"
                  close={setDrawerOpen}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setDrawerOpens(true);
                    }}
                    className="ms-2 cursor-pointer"
                  >
                    <HButton>Open Nested Drawer</HButton>
                  </div>

                  <HDrawer
                    position="left"
                    open={drawerOpens}
                    close={setDrawerOpens}
                  ></HDrawer>
                </HDrawer>
              </div>
            </div>
          </div>
          {/* Sidebar*/}
          <div id="sidebar" className="space-y-4 ">
            <h1>Sidebar</h1>
            <div className="w-full gap-4 md:space-y-0 md:gap-2 flex flex-wrap">
              <div className="w-full flex items-center ">
                <div className=" relative overflow-hidden border border-ring  shadow-lg h-96 w-full">
                  <Layout sidebarContents={sidebarContents} open={true}>
                    <div className="mt-5">Content</div>
                  </Layout>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
