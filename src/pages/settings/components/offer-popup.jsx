import React, { useRef } from "react";
import LabeledSwitch from "@/components/ui/labeled-switch";
import { DelayIcon, SalesNotificationIcon } from "@/assets/icons";
import { SettingsLabel, TimeDropdown } from "./core-comps";
import { Image, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, isNotNullOrEmpty } from "@/lib/utils";

const OfferPopup = ({
  offerPopup,
  setOfferPopup,
  offerPopupImage,
  setOfferPopupImage,
}) => {
  const hiddenFileInput = useRef(null);

  const handleImageUpload = (e) => {
    let image = e.target.files[0];
    setOfferPopupImage({ url: URL.createObjectURL(image), image });
  };

  return (
    <section className="rounded-xl border border-input">
      <LabeledSwitch
        logo={<SalesNotificationIcon />}
        name="Offer Popup"
        checked={offerPopup.status === "enabled"}
        onCheckedChange={(e) =>
          setOfferPopup({ ...offerPopup, status: e ? "enabled" : "disabled" })
        }
      />
      <TimeDropdown
        label="Delayed"
        icon={<DelayIcon size={18} />}
        labelClass="border-l"
        state={offerPopup.delayed}
        onStateChange={(obj) => setOfferPopup({ ...offerPopup, delayed: obj })}
      />
      <section className="flex">
        <SettingsLabel label="Image" icon={<Image size={19} />} />
        {isNotNullOrEmpty(offerPopupImage.url) && (
          <img
            src={offerPopupImage.url}
            alt="offer popup image"
            className="h-10 w-14 border"
          />
        )}
        <Button
          variant="outline"
          className={cn(
            "rounded-none rounded-br-xl  border-b-0 border-r-0 justify-start gap-1",
            isNotNullOrEmpty(offerPopupImage.url)
              ? "imageUploadBtn"
              : "tabularInput"
          )}
          onClick={() => hiddenFileInput.current.click()}
        >
          <input
            type="file"
            onChange={handleImageUpload}
            ref={hiddenFileInput}
            className="hidden"
          />
          <PlusIcon size={16.5} /> Add Image
        </Button>
      </section>
    </section>
  );
};

export default OfferPopup;
