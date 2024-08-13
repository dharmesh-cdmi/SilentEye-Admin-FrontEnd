import adminAPI from "@/api/adminAPI";
import { clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isNotNullOrEmpty = (value) => {
  return value !== "" && value !== null && value !== undefined;
};

export const fileDownload = async (
  endpoint,
  filename = `${Date.now()}.xlsx`,
  contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  responseType = "blob"
) => {
  try {
    const response = await adminAPI.get(endpoint, {
      responseType,
      headers: {
        "Content-Type": contentType,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error("Error downloading the file");
  }
};
