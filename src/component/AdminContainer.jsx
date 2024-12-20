import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

export default function AdminContainer() {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}
