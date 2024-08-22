import { ContentManage } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Spinner from "@/components/common/Spinner";
import { Switch } from "@/components/ui/switch";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  stopHere: Yup.string().required("Status is required"),
  name: Yup.string().required("Name is required")
});

const AddAddon = ({ data, setOpen, Refetch }) => {

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


  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("status", values?.status);
    formData.append("stopHere", values?.stopHere);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("process", values.process);
    formData.append("failCount", values.failCount);

    try {
      const response = data
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
          name: data?.name || "",
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
            <Field name="name">
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
                        ${touched.name && errors.name ? " h-1/2" : "h-full"}`}
                        name="name"
                        placeholder="Enter Your Name"
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
            <Field name="stopHere">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Stop Here"
                  className={`rounded-b-lg ${
                    touched.stopHere && errors.stopHere
                      ? "border-red-500 border "
                      : "border border-b"
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
