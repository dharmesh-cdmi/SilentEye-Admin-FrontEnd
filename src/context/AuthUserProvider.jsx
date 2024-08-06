import adminAPI from "@/api/adminAPI";
import { Admin } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
  const {
    data: userData,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => adminAPI.get(Admin.admin_details).then(res => res.data),
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
  // console.log("userData", userData);

  const userContextValues = {
    // states
    userData,
    userLoading,
    userFound: Boolean(userData?.data?.email),
    // methods
    userRefetch,
  };

  return (
    <AuthUserContext.Provider value={userContextValues}>
      {children}
    </AuthUserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthUserContext = () => useContext(AuthUserContext);

export default AuthUserProvider;
