import { ContentManage } from "@/api/endpoints";
import { Field } from "@/components/common/common-form";
import Loader from "@/components/common/loader";
import { Switch } from "@/components/ui/switch";
import useGet from "@/hooks/use-get";
import useUpdate from "@/hooks/use-update";
import { Contact, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContentDetails = () => {
  // Contents API Call
  const {
    data: { data: contentsData = {} } = {},
    isLoading: detailsLoading,
    refetch: DetailsRefetch,
  } = useGet({
    key: "fetchDetails",
    endpoint: ContentManage.FetchContentDetails,
  });

  const [status, setStatus] = useState({
    status: false,
    contactStatus: false,
    emailStatus: false,
    addressStatus: false,
  });

  useEffect(() => {
    if (contentsData?.contactDetails) {
      setStatus({
        status: contentsData.contactDetails.status || false,
        contactStatus: contentsData.contactDetails.contact?.status || false,
        emailStatus: contentsData.contactDetails.email?.status || false,
        addressStatus: contentsData.contactDetails.address?.status || false,
      });
    }
  }, [contentsData]);

  // Update Content API
  const { mutateAsync: detailsMutation } = useUpdate({
    isMultiPart: false,
    endpoint: ContentManage.ActiveContentDetails,
  });

  const handleUpdateDetails = async (
    newStatus,
    newContact,
    newEmail,
    newAddress
  ) => {
    try {
      const res = await detailsMutation({
        status: newStatus,
        contact: {
          status: newContact,
          value: contentsData?.contactDetails?.contact?.value,
        },
        email: {
          status: newEmail,
          value: contentsData?.contactDetails?.email?.value,
        },
        address: {
          status: newAddress,
          value: contentsData?.contactDetails?.address?.value,
        },
      });

      if (res?.status === 200) {
        DetailsRefetch();
        toast.success(res?.data || "Status is updated!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMainStatusChange = (checked) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      status: checked,
    }));
    handleUpdateDetails(
      checked,
      status.contactStatus,
      status.emailStatus,
      status.addressStatus
    );
  };

  const handleContactStatusChange = (checked) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      contactStatus: checked,
    }));
    handleUpdateDetails(
      status.status,
      checked,
      status.emailStatus,
      status.addressStatus
    );
  };

  const handleEmailStatusChange = (checked) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      emailStatus: checked,
    }));
    handleUpdateDetails(
      status.status,
      status.contactStatus,
      checked,
      status.addressStatus
    );
  };

  const handleAddressStatusChange = (checked) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      addressStatus: checked,
    }));
    handleUpdateDetails(
      status.status,
      status.contactStatus,
      status.emailStatus,
      checked
    );
  };

  if (detailsLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="">
        <div className="flex px-4 py-3 border-t border-l border-r rounded-t-lg justify-start space-x-2">
          <Contact />
          <h3 className="text-[17px] px-2 font-[500] ">Contact Details</h3>

          <Switch
            checked={status?.status}
            className="data-[state=checked]:bg-[#34C759] "
            onCheckedChange={handleMainStatusChange}
          />
        </div>
        <Field
          icon={<Phone width={25} className="text-gray-700 text-3xl h-12" />}
          value={
            <div className="w-full flex  justify-between px-4">
              <h2>{contentsData?.contactDetails?.contact?.value || "N/A"}</h2>
              <Switch
                checked={status?.contactStatus}
                className="data-[state=checked]:bg-[#34C759] "
                onCheckedChange={handleContactStatusChange}
              />
            </div>
          }
          className={"border border-b-0"}
          className3={"min-w-16"}
        />
        <Field
          icon={<Mail width={25} className="text-gray-700 text-3xl h-12" />}
          value={
            <div className="w-full flex  justify-between px-4">
              <h2>{contentsData?.contactDetails?.email?.value || "N/A"}</h2>
              <Switch
                checked={status?.emailStatus}
                className="data-[state=checked]:bg-[#34C759] "
                onCheckedChange={handleEmailStatusChange}
              />
            </div>
          }
          className={"border border-b-0"}
          className3={"min-w-16"}
        />
        <Field
          icon={<MapPin width={25} className="text-gray-700 text-3xl h-12" />}
          value={
            <div className="w-full flex  justify-between px-4">
              <h2>{contentsData?.contactDetails?.address?.value || "N/A"}</h2>
              <Switch
                checked={status?.addressStatus}
                className="data-[state=checked]:bg-[#34C759] "
                onCheckedChange={handleAddressStatusChange}
              />
            </div>
          }
          className={"border border-b rounded-b-lg"}
          className3={"min-w-16"}
        />
      </div>
    </>
  );
};

export default ContentDetails;
