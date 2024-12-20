import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Side() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex flex-col items-center gap-8 mt-8'>
      <Link
        to='/admin'
        className={`w-4/5 h-20 rounded-lg flex items-center justify-center cursor-pointer ${
          location.pathname === "/admin" ? "bg-neutral-content" : ""
        }`}
      >
        <h1 className='text-xl font-semibold text-gray-800'>Dashboard</h1>
      </Link>

      <hr className='w-4/5 border-[#0D1618]' />

      <Link
        to='/admin/product'
        className={`w-4/5 h-20 rounded-lg flex items-center justify-center cursor-pointer ${
          location.pathname === "/admin/product" ? "bg-neutral-content" : ""
        }`}
      >
        <h1 className='text-xl font-semibold text-gray-800'>Product</h1>
      </Link>
    </div>
  );
}
