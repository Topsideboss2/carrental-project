import { ReactNode } from "react";
import { getToken } from "./useToken";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const token = getToken();
  console.log('token =>', token);
  // return token === null ? window.location.href = '/signin' : children;
  return children
};
