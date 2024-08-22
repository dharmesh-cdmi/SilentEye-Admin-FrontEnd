import Counter from "@/components/common/counter";
import Header from "@/components/common/header";
import CommonButton from "@/components/ui/common-button";
import { Field, Form, Formik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { Field as TextField } from "@/components/common/common-form";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { ImagePlus } from "lucide-react";

const addCategorySchema = Yup.object({
  order: Yup.number().min(1).required("Product order is required"),
  name: Yup.string().required("Product name is required"),
  mrp: Yup.mixed().required("Product MRP is required"),
  description: Yup.string().required("Product description is required"), // Add validation for text
});

export default function AddProduct({ data }) {
  const editor = useRef(null);
  const [imagePreview, setImagePreview] = useState(
    data?.icon ? PROD_IMG_Prefix + data?.icon : null
  );
  const [productPreview, setProductPreview] = useState(
    data?.product ? PROD_IMG_Prefix + data?.product : null
  );

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  const handleProductImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("product", file);

    // Create an image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const options = [
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "|",
    "outdent",
    "indent",
    "align",
    "|",
    "hr",
    "|",
    "fullsize",
    "brush",
    "|",
    "table",
    "link",
    "image",
    "file",
    "|", // Added 'file' and 'image' buttons
    "undo",
    "redo",
  ];

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "div",
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 450,
      toolbarAdaptive: false,
      height: 250,
      uploader: {
        insertImageAsBase64URI: true, // Allow image uploads as base64
        url: "/upload", // Adjust this URL to your file/image upload endpoint
        format: "json",
        method: "POST",
        withCredentials: false,
        // headers: {
        //   Authorization: "Bearer <Your-Token>", // Optional: Add authorization headers if needed
        // },
        isSuccess: function (resp) {
          return resp.success;
        },
        getMsg: function (resp) {
          return resp.message; // Adjust according to your API's response structure
        },
        process: function (resp) {
          return {
            files: resp.files || [], // Return the uploaded files from the server response
            path: resp.path || "", // The path where the file is stored
            baseurl: "/uploads", // The base URL for the uploaded files
          };
        },
        error: function (e) {
          console.error(e.message);
        },
      },
      filebrowser: {
        ajax: {
          url: "/files", // Endpoint to browse files on the server
        },
        uploader: {
          insertFileAsBase64URI: true, // Allow file uploads as base64
        },
        createNewFolder: true, // Enable folder creation
      },
    }),
    []
  );

  return (
    <section className="flex flex-col gap-8">
      <div>
        <Formik
          initialValues={{ order: 0, name: "", mrp: 0, description: "" }}
          validationSchema={addCategorySchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="py-5">
              <Header title="Add New Product">
                <CommonButton
                  className="bg-primary hover:bg-primary hover:text-white text-white"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Add & Save Product
                </CommonButton>
              </Header>
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
                        ? "border-red-500 border rounded-b-lg"
                        : "border border-b rounded-b-lg"
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
              <div className="border rounded-lg my-5 ">
                <div className="border-b flex justify-between py-2">
                  <p className="pl-5 text-[18px]">Images</p>
                </div>
                <div className="flex px-5 space-x-4">
                  <Field name="product">
                    {({ form: { touched, errors }, meta }) => (
                      <div className="bg-gray-200 my-3 rounded-lg border border-r-2 h-[250px] w-[250px] items-center flex flex-col justify-center">
                        <input
                          type="file"
                          id="product"
                          className="hidden"
                          onChange={(event) =>
                            handleProductImageChange(event, setFieldValue)
                          }
                        />
                        <label
                          htmlFor="product"
                          className="cursor-pointer flex flex-col justify-center items-center space-y-1"
                        >
                          <span className="h-6">+ Add</span>
                          {productPreview ? (
                            <img
                              src={productPreview}
                              alt="Preview"
                              width={150}
                              height={180}
                              className="w-[250px] h-[250px] object-cover p-5 rounded-lg"
                            />
                          ) : (
                            <div className="flex space-x-2">
                              <ImagePlus className="w-6 h-6" />
                              <h2 className="font-semibold">Main Image</h2>
                            </div>
                          )}
                        </label>

                        {meta.touched && meta.error && (
                          <p className="text-sm px-4 text-red-600 error">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                  <div className="border-[1px] "/>
                  <Field name="product">
                    {({ form: { touched, errors }, meta }) => (
                      <div className="bg-gray-200 rounded-lg my-3 h-[150px] w-[150px] items-center  flex flex-col justify-center ">
                        <input
                          type="file"
                          id="product"
                          className="hidden"
                          onChange={(event) =>
                            handleProductImageChange(event, setFieldValue)
                          }
                        />
                        <label
                          htmlFor="product"
                          className="cursor-pointer flex flex-col justify-center items-center space-y-1"
                        >
                          <span className="">+ Add</span>
                          {productPreview ? (
                            <img
                              src={productPreview}
                              alt="Preview"
                              width={500}
                              height={500}
                              className="w-[140px] h-[140px] object-cover p-2 rounded-lg"
                            />
                          ) : (
                            <div className="flex space-x-2">
                              <ImagePlus className="w-6 h-6" />
                              <h2 className="font-semibold">Image</h2>
                            </div>
                          )}
                        </label>

                        {meta.touched && meta.error && (
                          <p className="text-sm px-4 text-red-600 error">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                {/* <div className="min-w-full flex px-5">
                  <Field name="product">
                    {({ form: { touched, errors }, meta }) => (
                      <div className="bg-gray-300 h-full w-[300px]">
                        <input
                          type="file"
                          id="product"
                          className="hidden"
                          onChange={(event) =>
                            handleProductImageChange(event, setFieldValue)
                          }
                        />
                        <label
                          htmlFor="product"
                          className="flex flex-col py-5 h-full justify-center w-full items-center cursor-pointer "
                        >
                          <span className="text-black pl-2 w-full h-full py-2 ">
                            + Select Products
                          </span>
                          {productPreview ? (
                            <img
                              src={productPreview}
                              alt="Preview"
                              width={200}
                              height={200}
                              className=""
                            />
                          ) : (
                            <ImagePlus className="w-16 h-16" />
                          )}
                        </label>

                        {meta.touched && meta.error && (
                          <p className="text-sm px-4 text-red-600 error">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="product">
                    {({ form: { touched, errors }, meta }) => (
                      <div>
                        <input
                          type="file"
                          id="product"
                          className="hidden"
                          onChange={(event) =>
                            handleProductImageChange(event, setFieldValue)
                          }
                        />
                        <label
                          htmlFor="product"
                          className="flex items-center cursor-pointer space-x-2 divide-x-2 justify-between"
                        >
                          {productPreview ? (
                            <img
                              src={productPreview}
                              alt="Preview"
                              width={30}
                              height={30}
                              className=""
                            />
                          ) : (
                            <ImagePlus className="w-6 h-6" />
                          )}
                          <span className="text-black pl-2 bg-gray-100 w-full h-full py-2 ">
                            + Select Products
                          </span>
                        </label>

                        {meta.touched && meta.error && (
                          <p className="text-sm px-4 text-red-600 error">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                </div> */}
              </div>

              <Field name="description">
                {({ field, form }) => (
                  <div>
                    <JoditEditor
                      ref={editor}
                      value={field.value} // Bind Formik's field value to the editor
                      onChange={(newContent) =>
                        form.setFieldValue(field.name, newContent)
                      }
                      config={config}
                    />
                    {form.errors.description && form.touched.description && (
                      <div className="text-red-500">
                        {form.errors.description}
                      </div>
                    )}
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
