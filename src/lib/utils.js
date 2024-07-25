import { clsx } from "clsx";
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
