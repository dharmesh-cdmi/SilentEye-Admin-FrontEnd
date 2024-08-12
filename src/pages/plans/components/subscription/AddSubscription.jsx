import { ContentManage, PROD_IMG_Prefix } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Spinner from "@/components/common/Spinner";
import { Switch } from "@/components/ui/switch";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { Image } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  stopHere: Yup.string().required("Status is required"),
  title: Yup.string().required("Title is required"),
  icon: Yup.mixed().required("Image is required"),
});

const AddSubscription = ({ data, setOpen, Refetch }) => {
  const [imagePreview, setImagePreview] = useState(
    data?.icon ? PROD_IMG_Prefix + data?.icon : null
  );

  const { mutateAsync: FeatureMutation, isLoading: FeatureLoading } = usePost({
    isMultiPart: true,
    endpoint: ContentManage.AddFeatures,
  });

  const {
    mutateAsync: UpdateFeatureMutation,
    isLoading: FeatureUpdateLoading,
  } = useUpdate({
    isMultiPart: true,
    endpoint: ContentManage.UpdateFeatures + data?._id,
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
      const response =  data
        ? await UpdateFeatureMutation(formData)
        : await FeatureMutation(formData);
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
          status: data?.status || true,
          title: data?.title || "",
          icon: data?.icon || null,
          description: data?.description || "",
          stopHere: data?.stopHere || false,
          process: data?.process || "",
          failCount: data?.failCount || "",
        }}
        validationSchema={addCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className="py-5">
            <Field name="title">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Title"
                  className={` ${
                    touched.title && errors.title
                      ? "border-red-500 border rounded-t-lg"
                      : "border border-b rounded-t-lg"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.title && errors.title ? " h-1/2" : "h-full"}`}
                        name="title"
                        placeholder="Enter Your Title"
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
            <Field name="icon">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Icon"
                  className={`border border-b border-t-0 ${
                    touched.icon && errors.icon
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
                  }`}
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
                        className="flex items-center cursor-pointer space-x-2"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            width={100}
                            height={100}
                            className="mt-2"
                          />
                        ) : (
                          <Image className="w-6 h-6" />
                        )}
                        <span className="text-black">+ Add Icon</span>
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
            <Field name="stopHere">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Stop Here"
                  className={` ${
                    touched.stopHere && errors.stopHere
                      ? "border-red-500 border "
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <Switch
                        defaultChecked={values?.stopHere}
                        className="data-[state=checked]:bg-[#34C759] "
                        onCheckedChange={(checked) =>
                          setFieldValue("stopHere", checked)
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
            <Field name="process">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Process"
                  className={` ${
                    touched.process && errors.process
                      ? "border-red-500 border "
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.process && errors.process
                            ? " h-1/2"
                            : "h-full"
                        }`}
                        name="process"
                        placeholder="Enter Duration"
                        value={values.process}
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
            <Field name="failCount">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Fail Count"
                  className={` ${
                    touched.failCount && errors.failCount
                      ? "border-red-500 border rounded-b-lg"
                      : "border border-b rounded-b-lg"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.failCount && errors.failCount
                            ? " h-1/2"
                            : "h-full"
                        }`}
                        name="failCount"
                        placeholder="How many time fails"
                        value={values.failCount}
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
                  isSubmitting || FeatureLoading || FeatureUpdateLoading
                }
              >
                {isSubmitting || FeatureLoading || FeatureUpdateLoading ? (
                  <Spinner className="text-white" />
                ) : (
                  ""
                )}
                <h3 className="text-white text-[17px] ">
                  {data ? "Update Features" : "Add & Save Features "}{" "}
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
