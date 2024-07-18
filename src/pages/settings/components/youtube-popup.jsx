import React from "react";
import LabeledSwitch from "@/components/ui/labeled-switch";
import { Youtube } from "lucide-react";
import { TabularInput } from "@/components/ui/data-entry-comps";

const YoutubePopup = ({ youtubePopup, setYoutubePopup }) => (
  <section className="rounded-xl border border-input">
    <LabeledSwitch
      logo={<Youtube />}
      name="Youtube Video Popup"
      checked={youtubePopup.enable}
      onCheckedChange={(e) => setYoutubePopup({ ...youtubePopup, enable: e })}
    />
    <TabularInput
      label="Title"
      value={youtubePopup.title}
      onChange={(e) =>
        setYoutubePopup({ ...youtubePopup, title: e.target.value })
      }
    />
    <TabularInput
      label="Link"
      value={youtubePopup.link}
      onChange={(e) =>
        setYoutubePopup({ ...youtubePopup, link: e.target.value })
      }
    />
  </section>
);

export default YoutubePopup;
