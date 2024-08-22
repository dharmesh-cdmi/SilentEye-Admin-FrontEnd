import { ContentManage, PROD_IMG_Prefix } from "@/api/endpoints";
import { Field as TextField } from "@/components/common/common-form";
import Spinner from "@/components/common/Spinner";
import StarRatingInput from "@/components/common/star-rating-input";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import { Field, Form, Formik } from "formik";
import { Image } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const reviewSchema = Yup.object({
  profile: Yup.mixed().required("Profile is required"),
  name: Yup.string().required("Name is required"),
  title: Yup.string().required("Title is required"),
  rating: Yup.string().required("Rating is required"),
  review: Yup.string().required("Review is required"),
});

const AddReviews = ({ data, setOpen, Refetch }) => {
  const [imagePreview, setImagePreview] = useState(
    data?.profile ? PROD_IMG_Prefix + data?.profile : null
  );

  const { mutateAsync: ReviewsMutation, isLoading: ReviewsLoading } = usePost({
    isMultiPart: true,
    endpoint: ContentManage.AddReviews,
  });

  const {
    mutateAsync: UpdateReviewsMutation,
    isLoading: ReviewsUpdateLoading,
  } = useUpdate({
    isMultiPart: true,
    endpoint: ContentManage.UpdateReviews + data?._id,
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("profile", file);

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
    formData.append("title", values?.title);
    formData.append("status", values?.status);
    formData.append("name", values?.name);
    formData.append("rating", values.rating);
    if (!data?.profile) {
      formData.append("profile", values?.profile);
    }
    formData.append("review", values.review);

    try {
      const response = data
        ? await UpdateReviewsMutation(formData)
        : await ReviewsMutation(formData);
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
          title: data?.title || "",
          status: data?.status || true,
          profile: data?.profile || null,
          name: data?.name || "",
          rating: data?.rating || null,
          review: data?.review || "",
        }}
        validationSchema={reviewSchema}
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
                        placeholder="Title for Review"
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
            <Field name="name">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Name"
                  className={` ${
                    touched.name && errors.name
                      ? "border-red-500 border"
                      : "border border-b"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${touched.name && errors.name ? " h-1/2" : "h-full"}`}
                        name="title"
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
            <Field name="profile">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Profile"
                  className={`border border-b border-t-0 ${
                    touched.profile && errors.profile
                      ? "border-red-500 border border-t-0"
                      : "border border-b"
                  }`}
                  value={
                    <>
                      <input
                        type="file"
                        id="profile"
                        className="hidden"
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                      />
                      <label
                        htmlFor="profile"
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
                        <span className="text-black">+ Add Profile</span>
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
            <Field name="rating">
              {({ form: { touched, errors }, meta }) => (
                <TextField
                  title="Ratings"
                  className={` ${
                    touched.rating && errors.rating
                      ? "border-red-500 border "
                      : "border border-b "
                  }`}
                  value={
                    <>
                      <StarRatingInput
                        rating={values.rating}
                        onRatingChange={(value) =>
                          setFieldValue("rating", value)
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
            <Field name="review">
              {({ field, form: { touched, errors }, meta }) => (
                <TextField
                  title="Review"
                  className={` ${
                    touched.review && errors.review
                      ? "border-red-500 border rounded-b-lg"
                      : "border border-b rounded-b-lg"
                  }`}
                  value={
                    <>
                      <input
                        className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                        ${
                          touched.review && errors.review ? " h-1/2" : "h-full"
                        }`}
                        name="review"
                        placeholder="Write your Review "
                        value={values.review}
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
                  isSubmitting || ReviewsLoading || ReviewsUpdateLoading
                }
              >
                {isSubmitting || ReviewsLoading || ReviewsUpdateLoading ? (
                  <Spinner className="text-white" />
                ) : (
                  ""
                )}
                <h3 className="text-white text-[17px] ">
                  {data ? "Update Review" : "Add Review "}{" "}
                </h3>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddReviews;
