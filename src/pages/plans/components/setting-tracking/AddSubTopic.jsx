import { TrackingSetting } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Spinner from "@/components/common/Spinner";
import usePost from "@/hooks/use-post";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  name: Yup.string().required("Topic Name is required"),
});

const AddSubTopic = ({setOpen, Refetch,id }) => {
  const { mutateAsync: FeatureMutation, isLoading: FeatureLoading } = usePost({
    isMultiPart: false,
    endpoint: TrackingSetting.AddTopic+`/${id}/subtopics`,
  });
 

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      name: values?.name,
    };
    try {
      const response = await FeatureMutation(payload);

      if (response?.status === 201) {
        resetForm();
        Refetch();
        setOpen(false);
        toast.success(response?.data?.message || "SubTopic Add Successfully !");
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
          name : ""
        }}
        validationSchema={addCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className="py-5">
           
            <Field name="name">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Name"
                  className={` ${
                    touched.order && errors.order
                      ? "border-red-500 border rounded-t-lg"
                      : "border  rounded-lg"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.name && errors.name ? " h-1/2" : "h-full"}`}
                        name="name"
                        placeholder="Enter Topic Name"
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
                  isSubmitting || FeatureLoading
                }
              >
                {isSubmitting || FeatureLoading  ? (
                  <Spinner className="text-white" />
                ) : (
                  ""
                )}
                <h3 className="text-white text-[17px] ">
                  {"Add Sub-Topic"}{" "}
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSubTopic;
