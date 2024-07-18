import React from "react";
import LabeledSwitch from "@/components/ui/labeled-switch";
import { SalesNotificationIcon } from "@/assets/icons";

const OfferPopup = ({ offerPopup, setOfferPopup }) => {
  return (
    <section className="rounded-xl border border-input">
      <LabeledSwitch
        logo={<SalesNotificationIcon />}
        name="Offer Popup"
        checked={offerPopup}
        onCheckedChange={(e) => setOfferPopup(e)}
      />
    </section>
  );
};

export default OfferPopup;
