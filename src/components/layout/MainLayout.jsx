import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

import WhatsAppFloat from "../common/WhatsAppFloat";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <WhatsAppFloat />
      <Footer />
    </>
  );
}
