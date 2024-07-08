import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../common/loader";
import Login from "@/pages/login";
// import { useAuthUserContext } from "../context/AuthUserProvider";

const AppOutlet = () => {
  //   const { userLoading } = useAuthUserContext();
  const [auth, setAuth] = useState(true);

  // Scroll-to-top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  if (!auth) {
    return <Login />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};

export default AppOutlet;
