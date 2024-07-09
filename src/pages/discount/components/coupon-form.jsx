import { ValidityCalendarIcon } from "@/assets/icons";
import { Switch } from "@/components/ui/switch";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  coupon: Yup.string().required("Coupon code is required"),
  discount: Yup.number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot exceed 100")
    .required("Discount is required"),
  validityDate: Yup.date().required("Validity date is required"),
  validityTime: Yup.string().required("Validity time is required"),
  limit: Yup.number()
    .min(1, "Limit must be at least 1")
    .required("Limit is required"),
});

const CouponForm = ({ initialValues = {}, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      coupon: initialValues.coupon || "",
      discount: initialValues.discount || "",
      validityDate: initialValues.validityDate || "",
      validityTime: initialValues.validityTime || "",
      limit: initialValues.limit || "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-10 flex flex-col border rounded-lg"
    >
      <div className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Coupon
          </div>
          <div className="w-full flex items-center">
            <input
              className="h-12 w-full px-5 outline-none"
              name="coupon"
              value={formik.values.coupon}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Coupon Code"
            />
            {formik.touched.coupon && formik.errors.coupon ? (
              <div className="text-red-500">{formik.errors.coupon}</div>
            ) : null}
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Discount
          </div>
          <div className="min-w-20 max-w-20 flex items-center justify-center text-nowrap">
            %
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0.00"
            />
            {formik.touched.discount && formik.errors.discount ? (
              <div className="text-red-500">{formik.errors.discount}</div>
            ) : null}
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Validity
          </div>
          <div className="min-w-20 max-w-20 flex items-center justify-center text-nowrap">
            <ValidityCalendarIcon />
          </div>
          <div className="w-full grid grid-cols-2 divide-x-[1.5px]">
            <input
              className="h-12 w-full px-5 outline-none"
              name="validityDate"
              value={formik.values.validityDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Date"
              type="date"
            />
            <input
              className="h-12 w-full px-5 outline-none"
              name="validityTime"
              value={formik.values.validityTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Time"
              type="time"
            />
            {formik.touched.validityDate && formik.errors.validityDate ? (
              <div className="text-red-500">{formik.errors.validityDate}</div>
            ) : null}
            {formik.touched.validityTime && formik.errors.validityTime ? (
              <div className="text-red-500">{formik.errors.validityTime}</div>
            ) : null}
          </div>
          <div className="flex justify-center items-center px-4">
            <Switch />
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Limit
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              name="limit"
              value={formik.values.limit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Use Limit"
            />
            {formik.touched.limit && formik.errors.limit ? (
              <div className="text-red-500">{formik.errors.limit}</div>
            ) : null}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Add & Save Coupon
      </button>
    </form>
  );
};

export default CouponForm;
