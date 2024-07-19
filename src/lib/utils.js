import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isNotNullOrEmpty = (value) => {
  return value !== "" && value !== null && value !== undefined;
};

export const getApiHeaders = () => {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

export const handleApiError = (error) => {
  console.log(error);
  alert(error.response.data.message);
};
