import { Plan, PROD_IMG_Prefix } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Counter from "@/components/common/counter";
import ProductsSelect from "@/components/common/products-select";
import Spinner from "@/components/common/Spinner";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { CircleDollarSign, DollarSign } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  order: Yup.number().required("Order is required"),
  name: Yup.string().required("Plan Name is required"),
  key: Yup.string().required("Unique Key is required"),
  amount: Yup.number().required("Amount is required"),
  mrp: Yup.number().required("MRP is required"),
  duration: Yup.string().required("Duration is required"),
  icon: Yup.mixed().required("Image is required"),
  tag: Yup.string().required("Tag is required"),
});

const productsData = [
  {
    _id: '001',
    name: 'Product One',
    image1: 'https://example.com/product1_image1.jpg',
    image2: 'https://example.com/product1_image2.jpg',
  },
  {
    _id: '002',
    name: 'Product Two',
    image1: 'https://example.com/product2_image1.jpg',
    image2: 'https://example.com/product2_image2.jpg',
  },
  {
    _id: '003',
    name: 'Product Three',
    image1: 'https://example.com/product3_image1.jpg',
    image2: 'https://example.com/product3_image2.jpg',
  },
  // Add more products as needed
];

const AddSubscription = ({ data, setOpen, Refetch }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(
    data?.icon ? PROD_IMG_Prefix + data?.icon : null
  );

  const { mutateAsync: PlanMutation, isLoading: PlanLoading } = usePost({
    isMultiPart: true,
    endpoint: Plan.AllPlans,
  });

  const { mutateAsync: UpdatePlanMutation, isLoading: FeatureUpdateLoading } =
    useUpdate({
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


  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("paymentGatewayId", values?.paymentGatewayId);
    formData.append("order", values?.order);
    formData.append("name", values?.name);
    if (!data?.icon) {
      formData.append("icon", values?.icon);
    }
    formData.append("key", values?.key);
    formData.append("amount", values?.amount);
    formData.append("mrp", values?.mrp);
    formData.append("duration", values?.duration);
    formData.append("tag", values?.tag);
    formData.append("products", selectedProducts);

    console.log("formData : ", formData)

    try {
      const response = data
        ? await UpdatePlanMutation(formData)
        : await PlanMutation(formData);
      if (response?.status === 201) {
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
          paymentGatewayId: data?.paymentGatewayId || "66b9c15a878a11234a5a1146",
          order: data?.order || 0,
          name: data?.name || "",
          key: data?.key || "",
          icon: data?.icon || null,
          amount: data?.amount || null,
          mrp: data?.mrp || null,
          duration: data?.duration || "",
          tag: data?.tag || "",
        }}
        validationSchema={addCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className="py-5">
            <Field name="title">
              {({  form: { touched, errors }, meta }) => (
                <TextField
                  title="Order"
                  className={` ${
                    touched.order && errors.order
                      ? "border-red-500 border rounded-t-lg"
                      : "border border-b rounded-t-lg"
                  }`}
                  value={
                    <div>
                      <Counter
                        count={values.order}
                        onChange={(newCount) =>
                          setFieldValue("order", newCount)
                        }
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

            <Field name="products">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Products"
                  className={`border border-b border-t-0 ${
                    touched.products && errors.products
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
                  }`}
                  className2={"py-0 pr-0"}
                  value={
                    <div>
                      <label
                        htmlFor="product"
                        className=""
                      >
                        <ProductsSelect
                          selectedProducts={selectedProducts}
                          setSelectedProducts={setSelectedProducts}
                          productsData={productsData} 
                          className="border-0 "
                        />
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
              <div
                onClick={() => setOpen(false)}
                className=" text-[20px] text-center border rounded-lg p-3"
              >
                Cancel
              </div>
              <button
                className="w-[80%] py-3 rounded-lg bg-gray-900 hover:bg-blackborder border text-primary text-[20px] flex justify-center items-center space-x-4"
                type="submit"
                disabled={isSubmitting || PlanLoading || FeatureUpdateLoading}
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
