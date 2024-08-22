import { ContentManage, PROD_IMG_Prefix } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Spinner from "@/components/common/Spinner";
import { Switch } from "@/components/ui/switch";
import usePost from "@/hooks/use-post";
import { Field, Form, Formik } from "formik";
import { Image } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  status: Yup.string().required("Status is required"),
  title: Yup.string().required("Title is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddCategory = ({ setOpen, Refetch , data }) => {
  console.log("data : ", data);
  const [imagePreview, setImagePreview] = useState( data ? PROD_IMG_Prefix+data?.image : null);

  const { mutateAsync: CatMutation, isLoading: catLoading } = usePost({
    isMultiPart: true,
    endpoint: ContentManage.AddFaq,
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
    formData.append("status", values?.status);
    formData.append("title", values.title);
    formData.append("image", values.image);


    try {
      const response = await CatMutation(formData);
      if (response?.status === 200) {
        resetForm();
        setImagePreview(null)
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
          status:  data?.status || true,
          title: data?.title || "",
          image: data?.image || null,
        }}
        validationSchema={addCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
          <Form className="py-5">
            <Field name="status">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Status"
                  className={` ${
                    touched.status && errors.status
                      ? "border-red-500 border rounded-t-lg"
                      : "border border-b rounded-t-lg"
                  }`}
                  value={
                    <>
                      <Switch
                        defaultChecked={values?.status}
                        className="data-[state=checked]:bg-[#34C759] "
                        onCheckedChange={(checked) =>
                          setFieldValue("status", checked)
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
            <Field name="title">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Title"
                  className={`border border-b border-t-0 ${
                    touched.title && errors.title
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
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
            <Field name="image">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Image"
                  className={`border border-b border-t-0 ${
                    touched.title && errors.title
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
                  }`}
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
                        className="flex items-center cursor-pointer space-x-2"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            width={50}
                            height={50}
                            className="mt-2"
                          />
                        ) : (
                          <Image className="w-6 h-6" />
                        )}
                        <span className="text-black">+ Add Image</span>
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
                disabled={isSubmitting || catLoading}
              >
                {isSubmitting || catLoading ? <Spinner className="text-white"/> : ""}
                <h3 className="text-white text-[17px] ">Add Category</h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategory;
