import React, { useState } from "react";

// Components
import YoutubePopup from "./components/youtube-popup";
import SalesNotification from "./components/sales-notification";
import EmailVerification from "./components/email-verfication";
import OfferPopup from "./components/offer-popup";
import Header from "@/components/common/header";
import { UploadIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import data from "./data/sample-data.json";

const Settings = () => {
  const [youtubePopup, setYoutubePopup] = useState(data.youtubePopup);
  const [salesNotification, setSalesNotification] = useState(
    data.salesNotification
  );
  const [emailVerification, setEmailVerification] = useState(true);
  const [offerPopup, setOfferPopup] = useState(true);

  return (
    <main className="flex flex-col gap-6">
      <section className="flex justify-between items-center">
        <Header title="Settings" className="m-0" />
        <Button
          variant="outline"
          className="text-[17px] text-gray-500 shadow-xl shadow-gray-100"
        >
          <UploadIcon size={19} className="mr-1.5" />
          Save
        </Button>
      </section>
      <YoutubePopup
        youtubePopup={youtubePopup}
        setYoutubePopup={setYoutubePopup}
      />
      <SalesNotification
        salesNotification={salesNotification}
        setSalesNotification={setSalesNotification}
      />
      <EmailVerification
        emailVerification={emailVerification}
        setEmailVerification={setEmailVerification}
      />
      <OfferPopup offerPopup={offerPopup} setOfferPopup={setOfferPopup} />
    </main>
  );
};

export default Settings;
