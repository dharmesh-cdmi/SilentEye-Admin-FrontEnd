import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserContext } from "@/context/AuthUserProvider";
import Loader from "../common/loader";

const UnauthorizedOutlet = () => {
  const { userFound } = useAuthUserContext();

  if (userFound) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default UnauthorizedOutlet;
