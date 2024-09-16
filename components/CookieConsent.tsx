 "use client"
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="z-50 fixed rounded-2xl bottom-4 mx-auto md:max-w-[500px] right-4 left-4 shadow-xl bg-stone-100 text-stone-800 p-4 flex justify-between items-center">  
      <p><span className="font-bold mr-2">We use cookies to improve your experience on our site.</span>The protection of your personal data is extremely important to us, learn more about our data management on our website.</p>
      <button onClick={handleAccept} className="bg-stone-800 text-stone-200 px-4 py-2 m-4 rounded">
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;