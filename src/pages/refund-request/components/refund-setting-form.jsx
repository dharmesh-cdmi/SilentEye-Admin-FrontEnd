import { useFormik } from "formik";
import * as Yup from "yup";

const RefundSettingForm = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      underProcessing: "",
      initiated: undefined,
      refunded: "",
    },
    validationSchema: Yup.object({
      underProcessing: Yup.number()
        .required("Under processing duration is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
      initiated: Yup.number()
        .required("Initiated duration is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
      refunded: Yup.number()
        .required("Refund duration is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <form className="px-4" onSubmit={formik.handleSubmit}>
      <section className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-40 flex items-center text-nowrap px-5">
            Under Processing
          </div>
          <div className="w-full flex flex-col">
            <input
              className="h-12 w-full px-5 outline-none"
              id="underProcessing"
              name="underProcessing"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.underProcessing}
              placeholder="Your Duration in Hours Here"
            />
            {formik.touched.underProcessing && formik.errors.underProcessing ? (
              <p className="text-red-500 text-xs px-5">
                {formik.errors.underProcessing}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-40 flex items-center text-nowrap px-5">
            Initiated
          </div>
          <div className="w-full flex flex-col">
            <input
              className="h-12 w-full px-5 outline-none"
              id="initiated"
              name="initiated"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.initiated}
              placeholder="12"
            />
            {formik.touched.initiated && formik.errors.initiated ? (
              <p className="text-red-500 text-xs px-5">
                {formik.errors.initiated}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-40 flex items-center text-nowrap px-5">
            Refunded
          </div>
          <div className="w-full flex flex-col">
            <input
              className="h-12 w-full px-5 outline-none"
              id="refunded"
              name="refunded"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.refunded}
              placeholder="Your Duration in Hours Here"
            />
            {formik.touched.refunded && formik.errors.refunded ? (
              <p className="text-red-500 text-xs px-5">
                {formik.errors.refunded}
              </p>
            ) : null}
          </div>
        </div>
      </section>
      {children}
    </form>
  );
};

export default RefundSettingForm;
