import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Info, Package, Plus } from "lucide-react";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { cn, isEmptyObject } from "@/lib/utils";
import * as Yup from "yup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const validationSchema = Yup.object({
  status: Yup.string().default("test").required("Order mode is required"),
  name: Yup.string().required("Name is required"),
  key: Yup.string().required("Key is required"),
  saltKey: Yup.string().required("Salt is required"),
  icon: Yup.mixed().required("Icon is required"),
});

const fetchImageAsFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

const PaymentGatewayForm = ({
  trigger,
  children,
  initialValues = {},
  onSubmit,
}) => {
  const [iconPreview, setIconPreview] = useState(null);

  useEffect(() => {
    const initializeIcon = async () => {
      if (initialValues.icon && initialValues.icon instanceof File) {
        try {
          const preview = URL.createObjectURL(initialValues.icon);
          setIconPreview(preview);
        } catch (error) {
          setIconPreview(null);
        }
      } else if (typeof initialValues.icon === "string") {
        try {
          const file = await fetchImageAsFile(initialValues.icon, "icon.png");
          const preview = URL.createObjectURL(file);
          setIconPreview(preview);
        } catch (error) {
          setIconPreview(null);
        }
      }
    };

    initializeIcon();
  }, [initialValues.icon]);

  const formik = useFormik({
    initialValues: {
      status: initialValues.status || "test",
      name: initialValues.name || "",
      key: initialValues.key || "",
      saltKey: initialValues.saltKey || "",
      icon: initialValues.icon || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleIconChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("icon", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setIconPreview(null);
    }
  };

  const inputFieldClass = "rounded-none rounded-none outline-none h-12";
  const inputBoxClass = cn("border-none", inputFieldClass);

  return (
    <TooltipProvider>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-2xl p-0 !rounded-xl">
          <DialogHeader className="flex flex-row gap-5 p-4 border-b">
            <DialogClose asChild>
              <Button className="w-12 h-10 p-3 bg-white text-black hover:bg-gray-200 border shadow">
                <ArrowLeft />
              </Button>
            </DialogClose>
            <div>
              <DialogTitle className="flex items-center gap-3">
                <Package />
                {isEmptyObject(initialValues)
                  ? "Add New Payment Gateway"
                  : "Edit Payment Gateway"}
              </DialogTitle>
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="px-4">
            <div className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
              <div className="flex divide-x-[1.5px]">
                <div className="min-w-20 flex items-center text-nowrap px-5">
                  Order
                </div>
                <div className="w-full flex divide-x-[1.5px]">
                  <div className="h-12 w-full inline-flex items-center gap-2.5 px-4 text-nowrap">
                    <Input
                      inputBoxClass={cn(inputBoxClass, "px-0 h-5 w-5")}
                      className={cn(inputFieldClass, "px-0 h-5 w-5")}
                      type="radio"
                      name="status"
                      id="test"
                      value="test"
                      checked={formik.values.status === "test"}
                      onChange={formik.handleChange}
                    />
                    <label className="cursor-pointer" htmlFor="test">
                      Test Mode
                    </label>
                  </div>

                  <div className="h-12 w-full inline-flex items-center gap-2.5 px-4 text-nowrap">
                    <Input
                      inputBoxClass={cn(inputBoxClass, "px-0 h-5 w-5")}
                      className={cn(inputFieldClass, "px-0 h-5 w-5")}
                      type="radio"
                      name="status"
                      id="live"
                      value="live"
                      checked={formik.values.status === "live"}
                      onChange={formik.handleChange}
                    />
                    <label className="cursor-pointer" htmlFor="live">
                      Live Mode
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex divide-x-[1.5px]">
                <div className="min-w-20 flex items-center text-nowrap px-5">
                  Name
                </div>
                <div className="relative w-full flex items-center">
                  <input
                    className={cn(
                      "h-12 w-full px-5 outline-none",
                      formik.touched.name &&
                        formik.errors.name &&
                        "border border-red-400"
                    )}
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Payment Gateway Name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <Tooltip>
                      <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="border-none bg-rose-50 text-rose-500">
                        {formik.errors.name}
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                </div>
              </div>

              <div className="flex divide-x-[1.5px]">
                <div className="min-w-20 flex items-center text-nowrap px-5">
                  Icon
                </div>
                <div className="h-12 w-full">
                  <div
                    className={cn(
                      "relative h-full flex items-center",
                      formik.touched.icon &&
                        formik.errors.icon &&
                        "border border-red-500"
                    )}
                  >
                    <div className="h-full w-14 flex items-center justify-center border-r-[1.5px]">
                      {iconPreview ? (
                        <img
                          src={iconPreview}
                          alt="Icon Preview"
                          className="h-12 w-14 object-fill aspect-square p-1"
                        />
                      ) : (
                        <Package />
                      )}
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="w-full flex items-center gap-2 py-2.5 cursor-pointer px-3">
                        <Plus size={18} />
                        <input
                          type="file"
                          name="icon"
                          id="icon"
                          className="hidden"
                          onChange={handleIconChange}
                          accept="image/*"
                        />
                        <label htmlFor="icon" className="w-full cursor-pointer">
                          Add Icon
                        </label>
                      </div>
                    </div>

                    {formik.touched.icon && formik.errors.icon ? (
                      <Tooltip>
                        <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                          <Info size={20} />
                        </TooltipTrigger>
                        <TooltipContent className="border-none bg-rose-50 text-rose-500">
                          {formik.errors.icon}
                        </TooltipContent>
                      </Tooltip>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex divide-x-[1.5px]">
                <div className="min-w-20 flex items-center text-nowrap px-5">
                  Key
                </div>
                <div className="relative w-full flex flex-col">
                  <input
                    className={cn(
                      "h-12 w-full px-5 outline-none",
                      formik.touched.key &&
                        formik.errors.key &&
                        "border border-red-400"
                    )}
                    name="key"
                    value={formik.values.key}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Key"
                  />
                  {formik.touched.key && formik.errors.key ? (
                    <Tooltip>
                      <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="border-none bg-rose-50 text-rose-500">
                        {formik.errors.key}
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                </div>
              </div>

              <div className="flex divide-x-[1.5px]">
                <div className="min-w-20 flex items-center text-nowrap px-5">
                  Salt
                </div>
                <div className="relative w-full flex flex-col">
                  <input
                    className={cn(
                      "h-12 w-full px-5 outline-none",
                      formik.touched.saltKey &&
                        formik.errors.saltKey &&
                        "border border-red-400"
                    )}
                    name="saltKey"
                    value={formik.values.saltKey}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Salt Key"
                  />
                  {formik.touched.saltKey && formik.errors.saltKey ? (
                    <Tooltip>
                      <TooltipTrigger className="absolute top-3 right-0 text-rose-500 px-3">
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="border-none bg-rose-50 text-rose-500">
                        {formik.errors.saltKey}
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                </div>
              </div>
            </div>
            {children}
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default PaymentGatewayForm;
