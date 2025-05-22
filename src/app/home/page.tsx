import Layout from "@/components/layout/Layout";
import { sidebarContents } from "@/components/sidebarNavigation";
import React from "react";

const page = () => {
  return (
    <Layout
      sidebarTitle="HUI"
      sidebarContents={sidebarContents}
      type="fixed"
      position="left"
    >
      pageeee
    </Layout>
  );
};

export default page;
