const PROD_ADMIN_BASE_URL = "http://143.244.140.6:5000/api/";
const Auth = {
  Login: "admin/login",
  Refresh: "refresh-token",
};
const Order = {
  Order_Details: "admin/orders",
  Delete_Order: "admin/orders-delete",
};

const Admin = {
  admin_details: "admin/details",
};

const RefundRequestAPI = {
  AllRefundRequest: "/refund-request?page=1&limit=10&search=RE69",
  DeleteRefund: "/refund-request/",
};

const ContactFormAPI = {
  AllData: "/contact-form/fetch-all-contacts-form",
  Search: "/contact-form/search-contact-form",
  Delete: "/contact-form/delete-contact-form",
};

const SupportTicketAPI = {
  AllData: "/tickets",
  DeleteTicket: "/tickets/",
};

const DiscountAPI = {
  GetAll: "/discount",
  DeleteDiscount: "/discount/",
  ChangeStatus: "/discount/",
};

export {
  PROD_ADMIN_BASE_URL,
  Auth,
  Order,
  Admin,
  RefundRequestAPI,
  ContactFormAPI,
  SupportTicketAPI,
  DiscountAPI,
};
