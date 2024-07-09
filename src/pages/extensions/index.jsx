import {
  CaptchaIcon,
  ChatBotIcon,
  TagManagerIcon,
  TwoFactorAuthIcon,
  UploadIcon,
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import ExtensionBox from "@/components/ui/extension-box";
import { isNotNullOrEmpty } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const extensionsArr = [
  {
    id: 5,
    name: "Captcha",
    logo: <CaptchaIcon />,
  },
  {
    id: 6,
    name: "Two-Factor Authentication (2FA)",
    logo: <TwoFactorAuthIcon />,
  },
  {
    id: 7,
    name: "Tag Manager",
    logo: <TagManagerIcon />,
  },
  {
    id: 8,
    name: "ChatBot",
    logo: <ChatBotIcon />,
  },
];

const Extensions = () => {
  const [extensions, setExtensions] = useState(extensionsArr);
  const [extForm, setExtForm] = useState([]);

  useEffect(() => {
    if (extensions.length !== extForm.length) {
      console.log("Itea");
      extensions.map(({ id }, ind) =>
        extForm.push({
          id,
          index: ind,
          enable: true,
          key: "",
          secretKey: "",
          edit: false,
        })
      );

      setExtForm([...extForm]);
    }
  }, []);

  useEffect(() => {
    console.log(extForm);
  }, [extForm]);

  const onStateChange = (obj) => {
    extForm[obj.index] = { ...obj, edit: true };
    setExtForm([...extForm]);
  };

  return (
    <main className="flex flex-col gap-6">
      <section className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Extensions</h3>
        </div>
        <Button
          variant="outline"
          className="text-[17px] text-gray-500 shadow-xl shadow-gray-100"
        >
          <UploadIcon size={19} className="mr-1.5" />
          Save
        </Button>
      </section>
      {isNotNullOrEmpty(extForm[0]) &&
        extensions.map((ele, ind) => (
          <ExtensionBox
            key={ind}
            extDetails={ele}
            state={extForm[ind]}
            onStateChange={onStateChange}
          />
        ))}
    </main>
  );
};

export default Extensions;
