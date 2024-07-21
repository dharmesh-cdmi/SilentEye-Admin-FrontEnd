import React, { useEffect, useState } from "react";

// Components
import YoutubePopup from "./components/youtube-popup";
import SalesNotification from "./components/sales-notification";
import EmailVerification from "./components/email-verfication";
import OfferPopup from "./components/offer-popup";
import Header from "@/components/common/header";
import { UploadIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ADMIN_BASE_URL } from "@/api/adminAPI";
import { getApiHeaders, handleApiError, isNotNullOrEmpty } from "@/lib/utils";

const offerPopupImageObj = {
  url: "",
  image: {},
};

const Settings = () => {
  const [youtubePopup, setYoutubePopup] = useState({});
  const [salesNotification, setSalesNotification] = useState({});
  const [emailVerification, setEmailVerification] = useState({});
  const [offerPopup, setOfferPopup] = useState({});
  const [offerPopupImage, setOfferPopupImage] = useState(offerPopupImageObj);
  let count = 0;

  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/setting/fetch-settings`,
        getApiHeaders()
      );

      // update states
      let ext = response.data.settings;
      setYoutubePopup(ext.youTubeVideoPopUp);
      setSalesNotification(ext.salesNotification);
      setEmailVerification(ext.emailVerification);
      setOfferPopup(ext.offerPopUp);

      let image = ext.offerPopUp.image;
      isNotNullOrEmpty(image) &&
        setOfferPopupImage({
          ...offerPopupImage,
          url: ADMIN_BASE_URL + ext.offerPopUp.image,
        });
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (count === 0) {
      fetchSettings();
      count++;
    }
  }, []);

  const jsonToFormData = () => {
    const formData = new FormData();
    isNotNullOrEmpty(offerPopupImage.image.name) &&
      formData.append("offerPopUpImage", offerPopupImage.image);
    formData.append("youTubeVideoPopUp", JSON.stringify(youtubePopup));
    formData.append("salesNotification", JSON.stringify(salesNotification));
    formData.append("emailVerification", JSON.stringify(emailVerification));
    formData.append(
      "offerPopUp",
      JSON.stringify({ delayed: offerPopup.delayed, status: offerPopup.status })
    );
    return formData;
  };

  const saveSettings = async () => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/setting/update-settings`,
        jsonToFormData(),
        getApiHeaders({ "Content-Type": "multipart/form-data" })
      );

      alert("Settings saved successfully.");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <main className="flex flex-col gap-6">
      <section className="flex justify-between items-center">
        <Header title="Settings" className="m-0" />
        <Button
          variant="outline"
          className="text-[17px] text-gray-500 shadow-xl shadow-gray-100"
          onClick={saveSettings}
        >
          <UploadIcon size={19} className="mr-1.5" />
          Save
        </Button>
      </section>
      {isNotNullOrEmpty(youtubePopup.status) && (
        <YoutubePopup
          youtubePopup={youtubePopup}
          setYoutubePopup={setYoutubePopup}
        />
      )}
      {isNotNullOrEmpty(salesNotification.status) && (
        <SalesNotification
          salesNotification={salesNotification}
          setSalesNotification={setSalesNotification}
        />
      )}
      {isNotNullOrEmpty(emailVerification.status) && (
        <EmailVerification
          emailVerification={emailVerification}
          setEmailVerification={setEmailVerification}
        />
      )}
      {isNotNullOrEmpty(offerPopup.status) && (
        <OfferPopup
          offerPopup={offerPopup}
          setOfferPopup={setOfferPopup}
          offerPopupImage={offerPopupImage}
          setOfferPopupImage={setOfferPopupImage}
        />
      )}
    </main>
  );
};

export default Settings;
