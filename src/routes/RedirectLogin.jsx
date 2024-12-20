import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../component/Spinner";

export default function RedirectLogin({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  if (authUser && authUser?.isAdmin) {
    return <Navigate to='/admin' />;
  }

  if (authUser) {
    return <Navigate to='/menu' />;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
