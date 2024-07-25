import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../common/loader";

import { useAuthUserContext } from "@/context/AuthUserProvider";

const AppOutlet = () => {
  const { userLoading } = useAuthUserContext();

  // Scroll-to-top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <Suspense fallback={<Loader />}>
      {userLoading ? <Loader /> : <Outlet />}
    </Suspense>
  );
};

export default AppOutlet;
