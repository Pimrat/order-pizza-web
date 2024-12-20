import { useState, useEffect } from "react";
import { Cart } from "../icon/Icon";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const { logout, authUser } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(authUser !== null);
  }, [authUser]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLogin(false);
    setCartItems([]);
    logout();
  };

  // Calculate total number of items in the cart
  const totalItemsInCart = cartItems
    ? cartItems.reduce((total, item) => total + item.amount, 0)
    : 0;

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

    <div className='flex items-center gap-8'>
    <Link to='/' className='text-[#FFFFFF] font-semibold text-2xl'>
      Home
    </Link>
    <Link
      to='/menu'
      className='text-[#FFFFFF] font-semibold text-2xl'
    >
      Menu
    </Link>
    <Link to='/about' className='text-[#FFFFFF] font-semibold text-2xl'>
      About
    </Link>
    <div className='relative'>
      <Link to='/cart'>
        <Cart />
      {/* Display number of items in cart */}
      <div className='bg-[#6495ED] w-6 h-6 top-5 right-3 rounded-full absolute flex items-center justify-center text-[#fff]'>
        {totalItemsInCart}
      </div>
      </Link>
    </div>
    {isLogin && authUser ? (
      <Dropdown
        position='top-14 right-0'
        customStyles='w-40'
        name={
          <button className='bg-[#FF6240] rounded-full w-12 h-12 text-black'>
            {authUser.username.charAt(0).toUpperCase()}
          </button>
        }
      >
        <Link
          to={`/profile/${authUser.id}`}
          className='block py-3 text-center text-xl'
        >
          Profile
        </Link>
        <hr className='border border-[#000000]' />
        <span
          className='block py-3 text-center text-xl cursor-pointer'
          onClick={handleLogout}
        >
          Log out
        </span>
      </Dropdown>
    ) : (
      <button
        className='bg-[#FF6240] rounded w-24 h-12 font-semibold text-2xl'
        onClick={handleLogin}
      >
        Login
      </button>
    )}
  </div>


    </div>
    </header>
  );
}
