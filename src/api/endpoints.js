const PROD_ADMIN_BASE_URL = "http://143.244.140.6:5000/api/";
const Auth = {
  Login: "admin/login",
  Refresh: "/",
};
const Order = {
  Order_Details: "admin/orders",
};

const ContactFormAPI = {
  get: "/contact-form/fetch-all-contacts-form",
  search: "/contact-form/fetch-all-contacts-form",
  delete: "/contact-form/fetch-all-contacts-form",
};

export { PROD_ADMIN_BASE_URL, Auth, Order, ContactFormAPI };
