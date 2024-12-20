import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../component/Spinner";

export default function ProtectRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  if (!isAuthUserLoading && authUser?.isAdmin) {
    return children;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      <Navigate to='/login' />
    </>
  );
}
