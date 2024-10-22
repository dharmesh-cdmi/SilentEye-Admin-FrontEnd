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

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export function formatDateTime(dateString) {
  const date = new Date(dateString);

  const optionsDate = { year: "numeric", month: "short", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  return `${formattedDate} ${formattedTime}`;
}

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

export const fileDownloadPost = async (
  endpoint,
  filename = `${Date.now()}.xlsx`,
  contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  responseType = "blob"
) => {
  try {
    const response = await adminAPI.post(endpoint, {
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

export const formatAmount = (amount) => {
  console.log(amount);
  if (!amount) return { integer: "00", decimal: "00" };
  const [integer, decimal] = String(amount).split(".");
  return { integer, decimal: decimal ? decimal.slice(0, 2) : "00" };
};
