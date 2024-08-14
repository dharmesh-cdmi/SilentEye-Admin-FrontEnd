const PROD_ADMIN_BASE_URL = "http://143.244.140.6:5000/api/";
const PROD_IMG_Prefix = "http://143.244.140.6:5000/";
const Auth = {
  Login: "admin/login",
  Refresh: "refresh-token",
};
const Dashboard = {
  Table: "admin/users-statistics",
  Analytics: "admin/analytics",
};

const Order = {
  Order_Details: "admin/orders",
  Delete_Order: "admin/orders-delete",
  Download_Order: "admin/download-orders",
};

const Admin = {
  admin_details: "admin/details",
};

const RefundRequestAPI = {
  AllRefundRequest: "/refund-request",
  Update: "/refund-request/",
  DeleteRefund: "/refund-request/",
  BulkDelete: "/refund-request/",
  BulkUpdate: "/refund-request/",
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
  BulkDelete: "/tickets/bulk/delete",
  BulkUpdate: "/tickets/bulk/status",
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

const UserAPI = {
  AllUsers: "users",
  DeleteUser: "users/",
  UpdateUser: "users/",
  DownloadUser: "users/download/users-data",
  BulkUpdate: "/users/bulk/update",
  BulkDelete: "/users/bulk/delete",
};

const ContentManage = {
  ActiveContentDetails: "content-manage/update-contact-details",
  FetchContentDetails: "/content-manage/fetch-contact-details",

  //features
  AllFeatures: "content-manage/fetch-all-features",
  AddFeatures: "content-manage/add-feature",
  UpdateFeatures: "content-manage/update-feature/",
  DeleteFeatures: "content-manage/delete-feature",

  //pages
  AllPages: "content-manage/fetch-all-pages",
  AddPages: "content-manage/add-page",
  UpdatePages: "content-manage/update-page/",
  DeletePages: "content-manage/delete-page",
  PageById: "content-manage/fetch-page-by-id/",

  //faqs
  AllFaqs: "content-manage/fetch-all-faq-categories",
  AddFaq: "content-manage/add-faq-category",
  UpdateFaq: "content-manage/update-faq-category/",
  DeleteFaq: "content-manage/delete-faq-category",

  //faqs by category
  AllFaqsByCat: "content-manage/fetch-all-faqs-by-category/",
  AddFaq_By_Cat_ID: "/content-manage/add-faq-by-category/",
  UpdateFaq_By_Cat_Id: "/content-manage/update-faq-by-category/",
  DeleteFaq_By_Cat_Id: "content-manage/delete-faq-by-category",

  //Reviews
  AllReviews: "content-manage/fetch-all-reviews",
  AddReviews: "content-manage/add-review",
  UpdateReviews: "content-manage/update-review/",
  DeleteReviews: "content-manage/delete-review",
};

const Plan = {
  AllPlans: "plan",
  SinglePlan: "plan/",
};

const Upsell = {
  AllUpsell: "upsell",
  UpdateUpsell: "upsell/",
};

const Addons = {
  AllAddons: "addon",
  UpdateAddons: "addon/",
};

const Product = {
  AllProduct: "product",
  UpdateProduct: "product/",
};

const Shipping = {
  AllShipping: "shipping",
  UpdateShipping: "shipping/",
};

export {
  PROD_ADMIN_BASE_URL,
  PROD_IMG_Prefix,
  Dashboard,
  Auth,
  Order,
  Admin,
  UserAPI,
  ContentManage,
  Plan,
  Upsell,
  Addons,
  Product,
  Shipping,
  RefundRequestAPI,
  ContactFormAPI,
  SupportTicketAPI,
  DiscountAPI,
  PaymentGateWayAPI,
};
