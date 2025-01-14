import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthState } from "../../../interfaces";
import { routes } from "../../../constants/routes";
import { Layout } from "@/Components";

interface IPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
  const auth: AuthState = useSelector((state: any) => state.auth);
  const user: AuthState = useSelector((state: any) => state.userData.user);

  
  if (!(auth.isLogged && auth.token && !!user)) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return <Layout>
    {children}
  </Layout>;
};

export default PrivateRoute;
