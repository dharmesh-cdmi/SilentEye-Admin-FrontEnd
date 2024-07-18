import { createBrowserRouter } from "react-router-dom";
import AppOutlet from "./components/outlets/Appoutlet";
import AuthorizedOutlet from "./components/outlets/AuthorizedOutlet";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import Login from "./pages/login";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/",
    element: <AppOutlet />,
    children: [
      //auth layout
      //main layout
      {
        path: "",
        element: <AuthorizedOutlet />,
        children: [
          {
            path: "/changePass",
            lazy: async () => ({
              Component: (
                await import("./components/layout/change-pass-dialog")
              ).default,
            }),
          },
          {
            path: "/",
            lazy: async () => ({
              Component: (await import("./pages/home")).default,
            }),
          },
          {
            path: "/orders",
            lazy: async () => ({
              Component: (await import("./pages/orders")).default,
            }),
          },
          {
            path: "/plans",
            lazy: async () => ({
              Component: (await import("./pages/orders")).default,
            }),
          },
          {
            path: "/users",
            lazy: async () => ({
              Component: (await import("./pages/orders")).default,
            }),
          },
          {
            path: "/content-manage",
            lazy: async () => ({
              Component: (await import("./pages/orders")).default,
            }),
          },
          {
            path: "/discount",
            lazy: async () => ({
              Component: (await import("./pages/discount")).default,
            }),
          },
          {
            path: "/support-ticket",
            lazy: async () => ({
              Component: (await import("./pages/support-ticket")).default,
            }),
          },
          {
            path: "/support-ticket/open",
            lazy: async () => ({
              Component: (await import("./pages/support-ticket-view")).default,
            }),
          },
          {
            path: "/refund-request",
            lazy: async () => ({
              Component: (await import("./pages/refund-request")).default,
            }),
          },
          {
            path: "/contact",
            lazy: async () => ({
              Component: (await import("./pages/contact-form")).default,
            }),
          },
          {
            path: "/payment",
            lazy: async () => ({
              Component: (await import("./pages/payment-gateway")).default,
            }),
          },
          {
            path: "/extension",
            lazy: async () => ({
              Component: (await import("./pages/extensions")).default,
            }),
          },
          {
            path: "/access-manage",
            lazy: async () => ({
              Component: (await import("./pages/access-manage")).default,
            }),
          },
          {
            path: "/settings",
            lazy: async () => ({
              Component: (await import("./pages/settings")).default,
            }),
          },
        ],
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
