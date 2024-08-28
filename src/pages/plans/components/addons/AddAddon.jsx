import { Addons } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Counter from "@/components/common/counter";
import Spinner from "@/components/common/Spinner";
import { Switch } from "@/components/ui/switch";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addonSchema = Yup.object({
  order: Yup.number().required("Order is required"),
  title: Yup.string().required("Name is required"),
  mrp: Yup.string().required("MRP is required"),
  amount: Yup.string().required("Amount is required"),
  description: Yup.string().required("Description is required"),
  checked: Yup.boolean().default(false),
});

const AddAddon = ({ data, setOpen, Refetch }) => {
  const { mutateAsync: createAddon, isLoading: isCreating } = usePost({
    isMultiPart: false,
    endpoint: Addons.AllAddons,
  });

  const { mutateAsync: updateAddon, isLoading: isUpdating } = useUpdate({
    isMultiPart: false,
    endpoint: Addons.UpdateAddons + data?._id,
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      paymentGatewayId: values?.paymentGatewayId, 
      title: values?.title, 
      description: values?.description, 
      amount : values?.amount, 
      mrp: values?.mrp, 
      status: values?.status, 
      checked: values?.checked

    }
    try {
      const res = data ? await updateAddon(payload) : await createAddon(payload);
      resetForm();
      Refetch();
      setOpen(false);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.success(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          paymentGatewayId: data?.paymentGatewayId || "66b9c15a878a11234a5a1146",
          order: data?.order || 1,
          title: data?.title || "",
          description: data?.description || "",
          amount: data?.amount || undefined,
          mrp: data?.mrp || undefined,
          status: data?.status || "live",
          checked: data?.checked || false,
        }}
        validationSchema={addonSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className="py-5">
            <Field name="order">
              {({  form: { touched, errors }, meta }) => (
                <TextField
                  title="Order"
                  className={` ${
                    touched.order && errors.order
                      ? "border-red-500 border rounded-t-lg"
                      : "border border-b rounded-t-lg"
                  }`}
                  value={
                    <>
                      <Counter
                        count={values.order}
                        onChange={(order) => setFieldValue("order", order)}
                      />

                      {meta.touched && meta.error && (
                        <p className="text-sm px-4 text-red-600 error">
                          {meta.error}
                        </p>
                      )}
                    </>
                  }
                />
              )}
            </Field>
            <Field name="title">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Name"
                  className={` ${
                    touched.name && errors.name
                      ? "border-red-500 border rounded-t-lg"
                      : "border border-b rounded-t-lg"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.title && errors.title ? " h-1/2" : "h-full"}`}
                        name="title"
                        placeholder="Enter Title Here"
                        value={values.title}
                        onChange={handleChange}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm px-4 text-red-600 error">
                          {meta.error}
                        </p>
                      )}
                    </>
                  }
                />
              )}
            </Field>
            <Field name="description">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Description"
                  className={` ${
                    touched.description && errors.description
                      ? "border-red-500 border"
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.description && errors.description
                            ? " h-1/2"
                            : "h-full"
                        }`}
                        name="description"
                        placeholder="Enter Your Description"
                        value={values.description}
                        onChange={handleChange}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm px-4 text-red-600 error">
                          {meta.error}
                        </p>
                      )}
                    </>
                  }
                />
              )}
            </Field>
            <Field name="amount">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Amount"
                  className={` ${
                    touched.amount && errors.amount
                      ? "border-red-500 border "
                      : "border border-b "
                  }`}
                  className2={"py-0 "}
                  value={
                    <div className="flex space-x-2.5 items-center divide-x-2">
                      <div className="">
                        <DollarSign size={19} />
                      </div>

                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.amount && errors.amount ? " h-1/2" : "h-full"
                        }`}
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        value={values.amount}
                        onChange={handleChange}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm px-4 text-red-600 error">
                          {meta.error}
                        </p>
                      )}
                    </div>
                  }
                />
              )}
            </Field>

            <Field name="mrp">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="MRP"
                  className={` ${
                    touched.mrp && errors.mrp
                      ? "border-red-500 border "
                      : "border border-b "
                  }`}
                  className2={"py-0 "}
                  value={
                    <div className="flex space-x-2.5 items-center divide-x-2">
                      <div className="">
                        <DollarSign size={19} />
                      </div>

                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.mrp && errors.mrp ? " h-1/2" : "h-full"}`}
                        type="number"
                        name="mrp"
                        placeholder="0.00"
                        value={values.mrp}
                        onChange={handleChange}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm px-4 text-red-600 error">
                          {meta.error}
                        </p>
                      )}
                    </div>
                  }
                />
              )}
            </Field>
            <Field name="checked">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Stop Here"
                  className={`rounded-b-lg ${
                    touched.checked && errors.checked
                      ? "border-red-500 border "
                      : "border border-b"
                  }`}
                  value={
                    <>
                      <Switch
                        defaultChecked={values?.checked}
                        className="data-[state=checked]:bg-[#34C759] "
                        onCheckedChange={(checked) =>
                          setFieldValue("checked", checked)
                        }
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm px-4 text-red-600 error">
                          {meta.error}
                        </p>
                      )}
                    </>
                  }
                />
              )}
            </Field>

            <div className="border-t w-full pt-4 flex justify-between items-center">
              <button
                onClick={() => setOpen(false)}
                className=" text-[20px] text-center border rounded-lg p-3"
              >
                Cancel
              </button>
              <button
                className="w-[80%] py-3 rounded-lg bg-gray-900 hover:bg-blackborder border text-primary text-[20px] flex justify-center items-center space-x-4"
                type="submit"
                disabled={isSubmitting || isCreating || isUpdating}
              >
                {isSubmitting || isCreating || isUpdating ? (
                  <Spinner className="text-white" />
                ) : (
                  ""
                )}
                <h3 className="text-white text-[17px] ">
                  {data ? "Update Add-Ons" : "Add & Save Add-Ons "}{" "}
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAddon;
