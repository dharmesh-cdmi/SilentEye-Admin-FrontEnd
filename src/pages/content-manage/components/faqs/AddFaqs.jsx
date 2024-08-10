import { Formik, Form, Field, useFormikContext } from "formik";
import { MoveRight } from "lucide-react"; // Assuming you have this icon
import FAQSchema from "./FaqSchema";
import { ContentManage } from "@/api/endpoints";
import Spinner from "@/components/common/Spinner";
import usePost from "@/hooks/use-post";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useUpdate from "@/hooks/use-update";

const AddFAQForm = ({ id, Refetch, data, setData }) => {
  const { mutateAsync: FaqMutation, isLoading: faqLoading } = usePost({
    isMultiPart: false,
    endpoint: ContentManage.AddFaq_By_Cat_ID + id,
  });

  const { mutateAsync: FaqUpdateMutation, isLoading: faqUpdateLoading } =
    useUpdate({
      isMultiPart: false,
      endpoint: ContentManage.UpdateFaq_By_Cat_Id + id + "/" + data?._id,
    });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      answer: values?.answer,
      question: values?.question,
    };
    console.log(payload);
    try {
      if (data) {
        const response = await FaqUpdateMutation(payload);
        if (response?.status === 200) {
          resetForm();
          Refetch();
          toast.success(response?.data);
          setData(null);
          SetInitialValuesEffect();
        }
      } else {
        const response = await FaqMutation(payload);
        if (response?.status === 200) {
          resetForm();
          Refetch();
          toast.success(response?.data);
          // queryClient.resetQueries();
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const SetInitialValuesEffect = ({ data }) => {
    const { setFieldValue } = useFormikContext();
    useEffect(() => {
      if (data) {
        setFieldValue("question", data?.question || "");
        setFieldValue("answer", data?.answer || "");
      }
      if (!data) {
        setFieldValue("question", "");
        setFieldValue("answer", "");
      }
    }, [data, setFieldValue]);

    return null;
  };

  return (
    <Formik
      initialValues={{
        question: data?.question || "",
        answer: data?.anser || "",
      }}
      validationSchema={FAQSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, errors, touched }) => (
        <Form className="flex justify-between  bg-gray-50 border border-r border-l border-t-0 border-b-0">
          <SetInitialValuesEffect data={data} />
          <div className="w-[85px] items-center flex flex-col justify-center px-2 border border-r-0 border-l-0">
            <h2 className="font-semibold text-[16px]">+ Add</h2>
            <h2 className="font-semibold text-[16px]">FAQs</h2>
          </div>
          <div className="flex flex-col w-full">
            <div className="border  border-b-0 items-center">
              <Field
                className={`border-0  w-full  px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none 
                  ${
                    touched.question && errors.question
                      ? "border-red-500 h-1/2"
                      : "h-full"
                  }`}
                name="question"
                placeholder="Add Your Question"
                value={values.question}
                onChange={handleChange}
              />
              {touched.question && errors.question && (
                <p className="text-sm px-4 text-red-600 ">{errors.question}</p>
              )}
            </div>

            <div className="border ">
              <Field
                className={`border-0 w-full  px-4 py-2 text-gray-600 text-[14px] focus:border-0 focus:outline-none 
                  ${
                    touched.answer && errors.answer
                      ? "border-red-500 h-1/2"
                      : "h-full"
                  }`}
                name="answer"
                placeholder="Add Your Answer Description"
                value={values.answer}
                onChange={handleChange}
              />
              {touched.answer && errors.answer && (
                <p className="mt-2 text-sm text-red-600 px-4">
                  {errors.answer}
                </p>
              )}
            </div>
          </div>
          <button
            className=" px-2 cursor-pointer font-semibold text-[16px] w-[10%] items-center flex flex-col justify-center space-y-2"
            type="submit"
          >
            {faqLoading || faqUpdateLoading ? (
              <Spinner />
            ) : (
              <>
                <h2 className="text-[14px] lg:text-[16px]">
                  {data ? "Update" : "Save"}
                </h2>
                <MoveRight size={19} />
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddFAQForm;
