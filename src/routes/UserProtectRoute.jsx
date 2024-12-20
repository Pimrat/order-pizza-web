import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../component/Spinner";

export default function UserProtectRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  if (!authUser && !isAuthUserLoading) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
