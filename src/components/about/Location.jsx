import React from "react";

const Location = () => {
  return (
    <section className=" text-black py-20 px-6 md:px-16">
      <h2 className="text-3xl  md:text-4xl text-center font-bold tracking-wide josefin-sans">
        OUR LOCATION
      </h2>
      <div className="max-w-5xl mx-auto  rounded-xl p-4 md:p-6">
        {/* Google Map */}
        <div className="w-full h-[350px] md:h-[450px] overflow-hidden rounded-lg">
          <iframe
            title="dummy-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.402812204925!2d54.383032275401845!3d24.47149627818524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6744cff56319%3A0x2eef9c6dfc10a3e6!2sTron%20Digital!5e0!3m2!1sen!2sin!4v1763358665846!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="text-center mt-8">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-(--primary-color) text-black font-medium rounded-lg hover:bg-green-600 transition"
        >
          View us on Google
        </a>
      </div>
    </section>
  );
};

export default Location;
