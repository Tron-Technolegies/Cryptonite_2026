import React, { useEffect } from "react";

const CoinTicker = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#111",
        padding: "10px 0",
        overflow: "hidden",
      }}
    >
      <gecko-coin-price-marquee-widget
        locale="en"
        dark-mode="true"
        outlined="true"
        coin-ids="bitcoin,ethereum,tether,plasma,binancecoin,aster-2,sui,chainopera-ai"
        initial-currency="usd"
      ></gecko-coin-price-marquee-widget>
    </div>
  );
};

export default CoinTicker;
