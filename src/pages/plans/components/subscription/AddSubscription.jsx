import { Plan, PROD_IMG_Prefix } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Spinner from "@/components/common/Spinner";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { CircleDollarSign, DollarSign, PackagePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  name: Yup.string().required("Plan Name is required"),
  key: Yup.string().required("Unique Key is required"),
  amount: Yup.number().required("Amount is required"),
  mrp: Yup.number().required("MRP is required"),
  duration: Yup.string().required("Duration is required"),
  icon: Yup.mixed().required("Image is required"),
  product: Yup.mixed().required("Product is required"),
  tag: Yup.string().required("Tag is required"),
});

const AddSubscription = ({ data, setOpen, Refetch }) => {
  const [imagePreview, setImagePreview] = useState(
    data?.icon ? PROD_IMG_Prefix + data?.icon : null
  );
  const [productPreview, setProductPreview] = useState(
    data?.product ? PROD_IMG_Prefix + data?.product : null
  );

  const { mutateAsync: PlanMutation, isLoading: PlanLoading } = usePost({
    isMultiPart: true,
    endpoint: Plan.AllPlans,
  });

  const {
    mutateAsync: UpdatePlanMutation,
    isLoading: FeatureUpdateLoading,
  } = useUpdate({
    isMultiPart: true,
    endpoint: Plan.SinglePlan + data?._id,
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("icon", file);

    // Create an image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleProductImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("product", file);

    // Create an image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("status", values?.status);
    formData.append("stopHere", values?.stopHere);
    formData.append("title", values.title);
    if (!data?.icon) {
      formData.append("icon", values?.icon);
    }
    formData.append("description", values.description);
    formData.append("process", values.process);
    formData.append("failCount", values.failCount);

    try {
      const response = data
        ? await UpdatePlanMutation(formData)
        : await PlanMutation(formData);
      if (response?.status === 200) {
        resetForm();
        setImagePreview(null);
        Refetch();
        setOpen(false);
        toast.success(response?.data);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: data?.name || "",
          key: data?.key || "",
          icon: data?.icon || null,
          amount: data?.amount || null,
          mrp: data?.mrp || null,
          duration: data?.duration || "",
          product: data?.product || null,
          tag: data?.tag || "",
        }}
        validationSchema={addCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className="py-5">
            <Field name="title">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Order"
                  className={` ${
                    touched.order && errors.order
                      ? "border-red-500 border rounded-t-lg"
                      : "border border-b rounded-t-lg"
                  }`}
                  value={
                    <div>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.order && errors.order ? " h-1/2" : "h-full"}`}
                        name="order"
                        placeholder="Enter Your Order"
                        value={values.order}
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

            <Field name="name">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Plan Name"
                  className={` ${
                    touched.name && errors.name
                      ? "border-red-500 border"
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.name && errors.name ? " h-1/2" : "h-full"}`}
                        name="name"
                        placeholder="Enter Plan Name Here"
                        value={values.name}
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

            <Field name="key">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Key"
                  className={` ${
                    touched.key && errors.key
                      ? "border-red-500 border"
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.key && errors.key ? " h-1/2" : "h-full"}`}
                        name="key"
                        placeholder="Enter Unique Key"
                        value={values.key}
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

            <Field name="icon">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Plan Icon"
                  className={`border border-b border-t-0 ${
                    touched.icon && errors.icon
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
                  }`}
                  className2={"py-0 pr-0"}
                  value={
                    <>
                      <input
                        type="file"
                        id="icon"
                        className="hidden"
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                      />
                      <label
                        htmlFor="icon"
                        className="flex items-center cursor-pointer space-x-2 divide-x-2 justify-between"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            width={30}
                            height={30}
                          />
                        ) : (
                          <CircleDollarSign className="w-6 h-6" />
                        )}
                        <span className="text-black pl-2 bg-gray-100 w-full h-full py-2 ">
                          + Add Icon
                        </span>
                      </label>

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

            <Field name="duration">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Duration"
                  className={` ${
                    touched.duration && errors.duration
                      ? "border-red-500 border"
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.duration && errors.duration
                            ? " h-1/2"
                            : "h-full"
                        }`}
                        name="duration"
                        placeholder="Enter Duration"
                        value={values.duration}
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

            <Field name="product">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Products"
                  className={`border border-b border-t-0 ${
                    touched.product && errors.product
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
                  }`}
                  className2={"py-0 pr-0"}
                  value={
                    <div>
                      <input
                        type="file"
                        id="product"
                        className="hidden"
                        onChange={(event) =>
                          handleProductImageChange(event, setFieldValue)
                        }
                      />
                      <label
                        htmlFor="product"
                        className="flex items-center cursor-pointer space-x-2 divide-x-2 justify-between"
                      >
                        {productPreview ? (
                          <img
                            src={productPreview}
                            alt="Preview"
                            width={30}
                            height={30}
                            className=""
                          />
                        ) : (
                          <PackagePlus className="w-6 h-6" />
                        )}
                        <span className="text-black pl-2 bg-gray-100 w-full h-full py-2 ">
                          + Select Products
                        </span>
                      </label>

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

            <Field name="tag">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Tag"
                  className={` ${
                    touched.tag && errors.tag
                      ? "border-red-500 border rounded-b-lg"
                      : "border border-b rounded-b-lg"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.tag && errors.tag ? " h-1/2" : "h-full"}`}
                        name="tag"
                        placeholder="Enter Tag"
                        value={values.tag}
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
                disabled={
                  isSubmitting || PlanLoading || FeatureUpdateLoading
                }
              >
                {isSubmitting || PlanLoading || FeatureUpdateLoading ? (
                  <Spinner className="text-white" />
                ) : (
                  ""
                )}
                <h3 className="text-white text-[17px] ">
                  {data ? "Update Plan" : "Add & Save Plan "}{" "}
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSubscription;
