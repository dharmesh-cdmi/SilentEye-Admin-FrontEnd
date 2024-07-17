// utils/cookieUtils.js

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const setCookie = (name, value, days = 1) => {
  console.log("Value", value)
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}; Secure; HttpOnly`;
};

export const removeTokens = () => {
  setCookie("accessToken", "", -1); // Set expiration to past date to delete cookie
  setCookie("refreshToken", "", -1); // Set expiration to past date to delete cookie
};
