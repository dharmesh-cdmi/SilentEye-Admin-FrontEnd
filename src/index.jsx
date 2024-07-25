import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "./provider/toast-provider.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";

import router from "./router";
import "./index.css";
import AuthUserProvider from "./context/AuthUserProvider.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import adminQueryClient from "./api/adminQueryClient.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={adminQueryClient}>
        <AuthUserProvider>
          <RouterProvider router={router} />
          <ToastProvider />
        </AuthUserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
