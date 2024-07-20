import { ADMIN_BASE_URL } from "@/api/adminAPI";
import {
  CaptchaIcon,
  ChatBotIcon,
  TagManagerIcon,
  TwoFactorAuthIcon,
  UploadIcon,
} from "@/assets/icons";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import ExtensionBox from "@/components/ui/extension-box";
import { getApiHeaders, handleApiError, isNotNullOrEmpty } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TagManager from "./components/tag-manager";

const extensionsArr = [
  {
    key: "captcha",
    name: "Captcha",
    logo: <CaptchaIcon />,
  },
  {
    key: "twoFA",
    name: "Two-Factor Authentication (2FA)",
    logo: <TwoFactorAuthIcon />,
  },
  {
    key: "tagManager",
    name: "Tag Manager",
    logo: <TagManagerIcon />,
  },
  {
    key: "chatBot",
    name: "ChatBot",
    logo: <ChatBotIcon />,
  },
];

const Extensions = () => {
  const [extensions, setExtensions] = useState({});
  let count = 0;

  const fetchExtensions = async () => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/extension/fetch-extensions`,
        getApiHeaders()
      );
      let ext = response.data.extensions;
      setExtensions({
        captcha: ext.captcha,
        twoFA: ext.twoFA,
        tagManager: ext.tagManager,
        chatBot: ext.chatBot,
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (count === 0) {
      fetchExtensions();
      count++;
    }
  }, []);

  const saveExtensions = async () => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/extension/update-extensions`,
        extensions,
        getApiHeaders()
      );
      alert("Extensions saved successfully.");
    } catch (error) {
      handleApiError(error);
    }
  };

  const onStateChange = (obj, key) => {
    setExtensions({ ...extensions, [key]: obj });
  };

  return (
    <main className="flex flex-col gap-6">
      <section className="flex justify-between items-center">
        <Header title="Extensions" className="m-0" />
        <Button
          variant="outline"
          onClick={saveExtensions}
          className="text-[17px] text-gray-500 shadow-xl shadow-gray-100"
        >
          <UploadIcon size={19} className="mr-1.5" />
          Save
        </Button>
      </section>
      {isNotNullOrEmpty(extensions.captcha) &&
        extensionsArr.map((ele, ind) => {
          if (ele.key !== "tagManager") {
            return (
              <ExtensionBox
                key={ind}
                extDetails={ele}
                state={extensions[ele.key]}
                onStateChange={onStateChange}
              />
            );
          }

          return (
            <TagManager
              key={ind}
              extDetails={ele}
              state={extensions[ele.key]}
              onStateChange={onStateChange}
            />
          );
        })}
    </main>
  );
};

export default Extensions;
