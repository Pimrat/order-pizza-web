import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function AdminHeader() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="sticky top-0 z-50 bg-black p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Pizza emoji as placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10">
            <span className="text-2xl">🍕</span>
          </div>
          <Link to="/">
            <div className="text-lg font-bold">
              <span className="text-white">Fastest</span>
              <span className="text-yellow-400">Pizza</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <button
            className="bg-[#FF6240] rounded w-24 h-12 font-semibold text-2xl"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
