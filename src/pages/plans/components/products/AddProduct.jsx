import Counter from "@/components/common/counter";
import Header from "@/components/common/header";
import { Field, Form, Formik } from "formik";
import { useMemo, useRef, useState } from "react";
import { Field as TextField } from "@/components/common/common-form";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { ImagePlus } from "lucide-react";
import { PROD_IMG_Prefix, Product } from "@/api/endpoints";
import Spinner from "@/components/common/Spinner";
import usePost from "@/hooks/use-post";
import useUpdate from "@/hooks/use-update";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "@/hooks/use-get";
import Loader from "@/components/common/loader";

const ProductSchema = Yup.object({
  order: Yup.number().min(1).required("Product order is required"),
  title: Yup.string().required("Name is required"),
  mainImage: Yup.mixed().required("Main Image is required"),
  image2: Yup.mixed().required("Image is required"),
  mrp: Yup.mixed().required("Product MRP is required"),
  // description: Yup.string().required("Product description is required"), // Add validation for text
});

export default function AddProduct() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const {
    data: { data: { data: data } = {} } = {},
    isLoading: productGetLoading,
  } = useGet({
    key: "productData",
    endpoint: `${Product.UpdateProduct+id}`,
  });

  
  const [mainImagePreview, setMainImage] = useState(
    data?.mainImage ? PROD_IMG_Prefix + data?.mainImage : null
  );
  const [productPreview, setProductPreview] = useState(
    data?.image2 ? PROD_IMG_Prefix + data?.image2 : null
  );



  const { mutateAsync: ProductMutation, isLoading: ProductLoading } = usePost({
    isMultiPart: true,
    endpoint: Product.AllProduct,
  });

  const {
    mutateAsync: UpdateProductMutation,
    isLoading: UpdateProductLoading,
  } = useUpdate({
    isMultiPart: true,
    endpoint: Product.UpdateProduct + data?._id,
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("paymentGatewayId", values?.paymentGatewayId);
      formData.append("order", values?.order);
      formData.append("title", values?.title);
      if (!data?.mainImage) {
        formData.append("mainImage", values?.mainImage);
      }
      if (!data?.image2) {
        formData.append("image2", values?.image2);
      }
      formData.append("mrp", Number(values?.mrp));
      formData.append("status", values?.status);
      formData.append("description", values?.description);

      const response = data ? await UpdateProductMutation(formData) : await ProductMutation(formData);
      
      if (response?.status === 201 || response?.status === 200) {
        resetForm();
        setProductPreview(null);
        setMainImage(null);
        toast.success(data ? "Update Product Successfully ": "Add Product Successfully ");
        navigate("/plans")
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleProductImageChange = (event, setFieldValue, type) => {
    const file = event.currentTarget.files[0];
    if (type === "mainimage") {
      setFieldValue("mainImage", file);
    } else {
      setFieldValue("image2", file);
    }

    // Create an image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "mainimage") {
        setMainImage(reader.result);
      } else {
        setProductPreview(reader.result);
      }
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

  if(productGetLoading){
    return <Loader />
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <Formik
          initialValues={{
            paymentGatewayId:
              data?.paymentGatewayId || "66b9c15a878a11234a5a1146",
            order: data?.order || 0,
            title: data?.title || "",
            mrp: data?.mrp || 0,
            description: data?.description || "",
            mainImage: data?.mainImage || null,
            image2: data?.image2 || null,
            status: data?.status || "live",
          }}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="py-5">
              <Header title="Add New Product">
                <button
                  className="px-3 py-2 rounded-lg bg-gray-900 hover:bg-blackborder border text-primary text-[20px] flex justify-center items-center space-x-4"
                  type="submit"
                  // disabled={isSubmitting}
                >
                  {isSubmitting || UpdateProductLoading || ProductLoading ? (
                    <Spinner />
                  ) : (
                    ""
                  )}
                  <h3 className="text-white text-[17px] ">
                    {data ? "Update & Save Product" : "Add & Save Product"}{" "}
                  </h3>
                </button>
              </Header>
              <Field name="order">
                {({ meta }) => (
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

              <Field name="title">
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
                          placeholder="Enter Title Here"
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
                  <Field name="mainImage">
                    {({ meta }) => (
                      <div className="bg-gray-200 my-3 rounded-lg border border-r-2 h-[250px] w-[250px] items-center flex flex-col justify-center">
                        <input
                          type="file"
                          id="mainImage"
                          className="hidden"
                          onChange={(event) =>
                            handleProductImageChange(
                              event,
                              setFieldValue,
                              "mainimage"
                            )
                          }
                        />
                        <label
                          htmlFor="mainImage"
                          className="cursor-pointer flex flex-col justify-center items-center space-y-1"
                        >
                          <span className="h-6">+ Add</span>
                          {mainImagePreview ? (
                            <img
                              src={mainImagePreview}
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
                  <div className="border-[1px] " />
                  <Field name="image2">
                    {({ meta }) => (
                      <div className="bg-gray-200 rounded-lg my-3 h-[150px] w-[150px] items-center  flex flex-col justify-center ">
                        <input
                          type="file"
                          id="image2"
                          className="hidden"
                          onChange={(event) =>
                            handleProductImageChange(event, setFieldValue)
                          }
                        />
                        <label
                          htmlFor="image2"
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
