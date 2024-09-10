import { Plan, PROD_IMG_Prefix, Product, Upsell } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Counter from "@/components/common/counter";
import ProductsSelect from "@/components/common/products-select";
import Spinner from "@/components/common/Spinner";
import useGet from "@/hooks/use-get";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { CircleDollarSign, DollarSign } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  plan: Yup.mixed().required("Plan Name is required"),
  name: Yup.string().required("Upsell Name is required"),
  key: Yup.string().required("Unique Key is required"),
  amount: Yup.number().required("Amount is required"),
  mrp: Yup.number().required("MRP is required"),
  image: Yup.mixed().required("Image is required"),
  // product: Yup.mixed().required("Product is required"),
  tag: Yup.string().required("Tag is required"),
});

const AddUpSell = ({ data, setOpen, Refetch }) => {

  // Call Plan API ..
  const {
    data: { data: { data: plansData } = {} } = {},
  } = useGet({
    key: "plansData",
    endpoint: `${Plan.AllPlans}?page=1&limit=1000`,
  });

  // Call Products API ..
  const { data: { data: products = {} } = {}, isLoading: productLoading } =
    useGet({
      key: "productsData",
      endpoint: `${Product.AllProduct}?page=1&limit=1000`,
    });
  
    const [imagePreview, setImagePreview] = useState(
      data?.upsell?.image ? PROD_IMG_Prefix + data?.upsell?.image : null
    );
    const [selectedProducts, setSelectedProducts] = useState(data?.products.map(product => product._id) || []);



  const { mutateAsync: PlanMutation, isLoading: PlanLoading } = usePost({
    isMultiPart: true,
    endpoint: Upsell.AllUpsell,
  });

  const { mutateAsync: UpdatePlanMutation, isLoading: FeatureUpdateLoading } =
    useUpdate({
      isMultiPart: true,
      endpoint: Upsell.UpdateUpsell + data?._id,
    });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

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
      formData.append("order", values?.order);
      formData.append("plan",values?.plan);
      formData.append("name", values?.name);
      formData.append("key", values?.key);
      formData.append("image", values?.image);
      formData.append("device", Number(values?.device));
      formData.append("amount", values?.amount);
      formData.append("mrp", values?.mrp);
      formData.append("products", JSON.stringify(selectedProducts));
      formData.append("tag", values?.tag);
      formData.append("status", values?.status);
      formData.append("discountPercent", 1);
      formData.append("discountValue", 0);
      formData.append("count", 0); 

    try {
      const response = data
        ? await UpdatePlanMutation(formData)
        : await PlanMutation(formData);
      if (response?.status === 200 || response?.status === 201) {
        resetForm();
        setImagePreview(null);
        Refetch();
        setOpen(false);
        toast.success(data ? "Update Upsell Plan " : "Add New Upsell Plan");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          order: data?.order || 0, 
          plan: data?.plan?._id || "", 
          name: data?.upsell?.name || "",
          key: data?.key || "",
          image: data?.upsell?.image || null,
          device: data?.device || 0,
          amount: data?.amount || null,
          mrp: data?.mrp || null,
          products: data?.product || null,
          tag: data?.tag || "",
          status : data?.status || "live"
        }}
        validationSchema={addCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className="py-5">
            <Field name="plan">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Plan"
                  className={` ${
                    touched.plan && errors.plan
                      ? "border-red-500 border rounded-t-lg"
                      : "border border-b rounded-t-lg"
                  }`}
                  value={
                    <div>
                      <select
                        className={`border-0 w-full px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none ${
                          touched.plan && errors.plan ? " h-1/2" : "h-full"
                        }`}
                        name="plan"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      >
                        <option value="" label="Select a plan" />
                        {
                          plansData?.docs?.map((item,index)=>(
                            <option value={item?._id} label={item?.name} key={index} />
                          ))
                        }
                      </select>
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
            <Field name="order">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Order"
                  className={` ${
                    touched.order && errors.order
                      ? "border-red-500 border"
                      : "border border-b "
                  }`}
                  value={
                    <>
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
                    </>
                  }
                />
              )}
            </Field>

            <Field name="name">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Name"
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

            <Field name="image">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Upsell Icon"
                  className={`border border-b border-t-0 ${
                    touched.image && errors.image
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
                  }`}
                  className2={"py-0 pr-0"}
                  value={
                    <>
                      <input
                        type="file"
                        id="image"
                        className="hidden"
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                      />
                      <label
                        htmlFor="image"
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
            <Field name="device">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Device"
                  className={` ${
                    touched.device && errors.device
                      ? "border-red-500 border"
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <Counter
                        count={values.device}
                        onChange={(newCount) =>
                          setFieldValue("device", newCount)
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
                      {productLoading ? (
                        <Spinner />
                      ) : (
                        <label htmlFor="products" className="">
                          <ProductsSelect
                            selectedProducts={selectedProducts}
                            setSelectedProducts={setSelectedProducts}
                            productsData={products?.data?.docs || []}
                            className="border-0 "
                          />
                        </label>
                      )}

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
                disabled={isSubmitting || PlanLoading || FeatureUpdateLoading}
              >
                {isSubmitting || PlanLoading || FeatureUpdateLoading ? (
                  <Spinner className="text-white" />
                ) : (
                  ""
                )}
                <h3 className="text-white text-[17px] ">
                  {data ? "Update UpSell" : "Add & Save UpSell "}{" "}
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUpSell;
