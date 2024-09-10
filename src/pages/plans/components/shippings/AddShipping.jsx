import { Shipping } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Counter from "@/components/common/counter";
import Spinner from "@/components/common/Spinner";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  title: Yup.string().required("Shipping Name is required"),
  dateMin: Yup.number()
    .min(1, "Minimum date must grater than zero")
    .required("Minimum date is required"),
  dateMax: Yup.number()
    .min(1, "Maximum date must less than 100")
    .required("Maximum date is required"),
  price: Yup.number()
    .min(1, "MRP must be grater than zero")
    .required("MRP is required"),
});

const AddShipping = ({ data, setOpen, Refetch }) => {
  const { mutateAsync: FeatureMutation, isLoading: FeatureLoading } = usePost({
    isMultiPart: false,
    endpoint: Shipping.AllShipping,
  });
  const str = data?.daysRange; // Safely access `daysRange`

  let min = null;
  let maxDays = null;

  if (str) {
    const [minTemp, maxTemp] = str.split("-").map((part) => part.trim());
    min = minTemp;
    maxDays = maxTemp?.split(" ")[0];
  }

  const {
    mutateAsync: UpdateFeatureMutation,
    isLoading: FeatureUpdateLoading,
  } = useUpdate({
    isMultiPart: false,
    endpoint: Shipping.UpdateShipping + data?._id,
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      title: values?.title,
      daysRange: values?.dateMin + "-" + values?.dateMax + " days",
      price: values?.price,
      status: values?.status,
      // isActive: values?.isActive,
    };
    try {
      const response = data
        ? await UpdateFeatureMutation(payload)
        : await FeatureMutation(payload);

      if (response?.status === 201) {
        resetForm();
        Refetch();
        setOpen(false);
        toast.success(response?.data?.message);
      }
      if (response?.status === 200) {
        resetForm();
        Refetch();
        setOpen(false);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          order: data?.order || 1,
          title: data?.title || "",
          dateMin: data ? min : null,
          dateMax: data ? maxDays : null,
          price: data?.mrp || undefined,
          status: data?.status || "live",
          isActive: data?.isActive || true,
        }}
        validationSchema={addCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className="py-5">
            <Field name="order">
              {({ form: { touched, errors }, meta }) => (
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
                    touched.title && errors.title
                      ? "border-red-500 border"
                      : "border"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.title && errors.title ? " h-1/2" : "h-full"}`}
                        name="title"
                        placeholder="Enter Shipping Name"
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

            {/* Days Fields */}

            <TextField
              title="Days"
              className={`border border-b`}
              className2={"py-0 "}
              value={
                <div className="flex items-center divide-x-2">
                  <Field name="dateMin">
                    {({ field, form: { touched, errors }, meta }) => (
                      <div className="flex space-x-2 divide-x-1 -ml-3">
                        <div className="bg-gray-100 px-2 flex justify-center items-center border-r-2">
                          Min
                        </div>
                        <input
                          className={`border-0  w-full  py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.dateMin && errors.dateMin
                            ? " h-1/2"
                            : "h-full"
                        }`}
                          type="number"
                          name="dateMin"
                          placeholder="Day Here"
                          value={values.dateMin}
                          onChange={handleChange}
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <p className="text-sm px-4 text-red-600 error">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="dateMax">
                    {({ field, form: { touched, errors }, meta }) => (
                      <div className="flex divide-x-1">
                        <div className="bg-gray-100 px-2 flex justify-center items-center border-r-2">
                          Max
                        </div>

                        <input
                          className={`border-0 pl-1 w-full py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.dateMax && errors.dateMax
                            ? " h-1/2"
                            : "h-full"
                        }`}
                          type="number"
                          name="dateMax"
                          placeholder="Day Here"
                          value={values.dateMax}
                          onChange={handleChange}
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <p className="text-sm px-4 text-red-600 error">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              }
            />

            <Field name="price">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="MRP"
                  className={` ${
                    touched.price && errors.price
                      ? "border-red-500 border rounded-b-lg"
                      : "border border-b rounded-b-lg "
                  }`}
                  className2={"py-0 "}
                  value={
                    <div className="flex space-x-2.5 items-center divide-x-2">
                      <div className="">
                        <DollarSign size={19} />
                      </div>

                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.price && errors.price ? " h-1/2" : "h-full"}`}
                        type="number"
                        name="price"
                        placeholder="0.00"
                        value={values.price}
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
                  isSubmitting || FeatureLoading || FeatureUpdateLoading
                }
              >
                {isSubmitting || FeatureLoading || FeatureUpdateLoading ? (
                  <Spinner className="text-white" />
                ) : (
                  ""
                )}
                <h3 className="text-white text-[17px] ">
                  {data ? "Update Shipping" : "Add & Save Shipping"}{" "}
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddShipping;
