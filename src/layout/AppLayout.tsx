import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.tsx";
import Footer from "../components/footer/Footer.tsx";

const AppLayout = () => {
  return (
    <div className={"w-full"}>
      <Header />
      <div className={"px-8 py-24"}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
