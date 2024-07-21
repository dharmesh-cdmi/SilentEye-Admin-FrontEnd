import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isNotNullOrEmpty = (value) => {
  return value !== "" && value !== null && value !== undefined;
};

export const getApiHeaders = (additionalHeaders = {}) => {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const headers = {
    headers: { Authorization: `Bearer ${accessToken}`, ...additionalHeaders },
  };
  // console.log(headers, "Headers");
  return headers;
};

export const handleApiError = (error) => {
  console.log(error);
  let err = error.response.data;
  if (isNotNullOrEmpty(err.message)) {
    alert(err.message);
  } else if (isNotNullOrEmpty(err.error)) {
    alert(err.error);
  }
};
