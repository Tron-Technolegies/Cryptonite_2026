import React, { useEffect } from "react";
import ContactForm from "../components/contact/ContactForm";
import SectionHeading from "../components/ui/SectionHeading";
import CompanyInformations from "../components/contact/CompanyInformations";

export default function ContactPage() {
  useEffect(() => {
window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container-x my-5 p-5">
      <h2 className="text-4xl text-center py-5 font-bold tracking-wide josefin-sans">
        {" "}
        Official <SectionHeading align="center"> Company Informations</SectionHeading>
      </h2>
      <CompanyInformations />
      <ContactForm />
    </div>
  );
}
