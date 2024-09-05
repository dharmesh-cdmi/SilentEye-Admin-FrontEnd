import { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import JoditEditor from "jodit-react";
import * as Yup from "yup";
import Header from "@/components/common/header";
import { CloudUpload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentManage } from "@/api/endpoints";
import useUpdate from "@/hooks/use-update";
import usePost from "@/hooks/use-post";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";
import useGet from "@/hooks/use-get";
import Loader from "@/components/common/loader";

const AddPages = ({ data }) => {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [enabled,setIsEnabled] = useState(false);

  const {
    data: { data: pageData = {} } = {},
    isLoading: pageLoading,
    refetch: PageRefetch,
  } = useGet({
    key: "pageData",
    enabled: enabled,
    endpoint: ContentManage.PageById + id,
  });

  useEffect(()=>{
    if(id){
      setIsEnabled(true); 
      PageRefetch();
    }
  },[id, PageRefetch])

  const { mutateAsync: AddPageMutation, isLoading: AddPageLoading } = usePost({
    isMultiPart: false,
    endpoint: ContentManage.AddPages,
  });

  const { mutateAsync: UpdatePageMutation, isLoading: UpdatePageLoading } =
    useUpdate({
      isMultiPart: true,
      endpoint: ContentManage.UpdatePages + id,
    });

  const formik = useFormik({
    initialValues: {
      title: pageData?.page?.title || "",
      text: pageData?.page?.text || "",
      status: pageData?.page?.status || true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      text: Yup.string().required("Text is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = data
      ? await UpdatePageMutation({ ...values })
      : await AddPageMutation({ ...values });

        if (response?.status === 200) {
          toast.success(response?.data);
          navigate("/content-manage")
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong !");
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (editor.current) {
      editor.current.value = formik.values.text;
    }
  }, [formik.values.text]);

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
      height: 450,
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

  if(pageLoading){
    return <Loader />
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Header title="Add Pages" className=" ">
          <button
            className={`flex space-x-1 cursor-pointer h-[48px] justify-center items-center  px-4 bg-primary text-white rounded-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black`}
            type="submit"
          >
            {
                (AddPageLoading||UpdatePageLoading) ? <Spinner /> : <CloudUpload className="w-5 h-5 mr-2" />
            }
            
            <h2>Save</h2>
          </button>
        </Header>
        <div className="border rounded-t-lg border-b-0 px-2">
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder="Your Page Title Here"
            className="px-5 py-2 w-full text-[18px] font-medium focus:outline-none focus:border-transparent"
          />
          {formik.errors.title && formik.touched.title ? (
            <div className="text-red-500 ">{formik.errors.title}</div>
          ) : null}
        </div>
        <div>
          <JoditEditor
            ref={editor}
            value={formik.values.text || ""}
            onChange={(newContent) => formik.setFieldValue("text", newContent)}
            config={config}
          />
          {formik.errors.text && formik.touched.text ? (
            <div className="text-red-500">{formik.errors.text}</div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default AddPages;
