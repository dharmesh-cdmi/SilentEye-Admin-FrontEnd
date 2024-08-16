import Counter from "@/components/common/counter";
import Header from "@/components/common/header";
import CommonButton from "@/components/ui/common-button";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Field as TextField } from "@/components/common/common-form";
import * as Yup from "yup";

const addCategorySchema = Yup.object({
  order: Yup.number().min(1).required("Product order is required"),
  name: Yup.string().required("Product name is required"),
  mrp: Yup.mixed().required("Product MRP is required"),
});

export default function AddProduct() {
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <section>
      <Header title="Add New Product">
        <CommonButton className="bg-primary hover:bg-primary hover:text-white text-white">
          Add & Save Product
        </CommonButton>
      </Header>

      <section className="flex flex-col gap-8">
        <div>
          <Formik
            initialValues={{ order: 0, name: "", mrp: 0 }}
            validationSchema={addCategorySchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              isSubmitting,
              setFieldValue,
              errors,
              touched,
            }) => (
              <Form className="py-5">
                <Field name="order">
                  {({ field, meta }) => (
                    <TextField
                      title="Order"
                      className={`${
                        meta.touched && meta.error
                          ? "border-red-500 border rounded-t-lg"
                          : "border border-b rounded-t-lg"
                      }`}
                      value={
                        <div>
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
                        </div>
                      }
                    />
                  )}
                </Field>

                <Field name="name">
                  {({ field, meta }) => (
                    <TextField
                      title="Name"
                      className={`${
                        meta.touched && meta.error
                          ? "border-red-500 border"
                          : "border border-b"
                      }`}
                      value={
                        <>
                          <input
                            className="border-0 w-full px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none"
                            placeholder="Enter Product Name"
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

                <Field name="mrp">
                  {({ field, meta }) => (
                    <TextField
                      title="MRP"
                      className={`${
                        meta.touched && meta.error
                          ? "border-red-500 border"
                          : "border border-b"
                      }`}
                      value={
                        <>
                          <input
                            className="border-0 w-full px-4 py-2 text-black text-[16px] focus:border-0 focus:outline-none"
                            placeholder="Enter Product MRP"
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

                <div className="mt-6">
                  <CommonButton
                    type="submit"
                    className="bg-primary hover:bg-primary hover:text-white text-white"
                    disabled={isSubmitting}
                  >
                    Add & Save Product
                  </CommonButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </section>
  );
}
