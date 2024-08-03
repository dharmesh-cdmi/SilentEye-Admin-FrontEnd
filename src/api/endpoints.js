const PROD_ADMIN_BASE_URL = "http://143.244.140.6:5000/api/";
const Auth = {
    Login : "admin/login",
    Refresh: "refresh-token"
}
const Order = {
    Order_Details : "admin/orders",
    Delete_Order : "admin/orders-delete",
    Download_Order : "admin/download-orders"
}

const Admin = {
    admin_details : "admin/details"
}

const UserAPI = {
    AllUsers : "users",
    DeleteUser : "users/",
    UpdateUser : "users/"
}
export {
    PROD_ADMIN_BASE_URL,
    Auth,
    Order,
    Admin,
    UserAPI
}