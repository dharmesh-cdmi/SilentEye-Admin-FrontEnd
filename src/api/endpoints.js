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
  AllRefundRequest: "/refund-request",
  Update: "/refund-request/",
  DeleteRefund: "/refund-request/",
};

const ContactFormAPI = {
  AllData: "/contact-form/search-contact-form",
  Delete: "/contact-form/delete-contact-form",
};

const SupportTicketAPI = {
  AllData: "/tickets",
  DeleteTicket: "/tickets",
  TicketDetails: "/tickets/",
  TicketComment: "/tickets/",
  CloseTicket: "/tickets/",
  BanUser: "/users/",
};

const DiscountAPI = {
  GetAll: "/discount",
  DeleteDiscount: "/discount/",
  ChangeStatus: "/discount/",
};

const PaymentGateWayAPI = {
  GetAll: "/payment-gateway?",
  AddGateway: "/payment-gateway",
  Delete: "/payment-gateway/",
  Update: "/payment-gateway/",
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
  PaymentGateWayAPI,
};
