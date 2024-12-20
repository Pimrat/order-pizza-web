import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import PizzaPage from "../userPages/ProductPage/PizzaPage";
import OthersPage from "../userPages/ProductPage/OthersPage";
import SoftdrinksPage from "../userPages/ProductPage/SoftdrinksPage";
import MenuPage from "../userPages/ProductPage/MenuPage";
import ProfilePage from "../userPages/ProfilePage/ProfilePage";
import CartPage from "../userPages/CartPage/CartPage";
import AdminProduct from "../adminPages/Product/AdminProduct";
import AdminDashboard from "../adminPages/Dashboard/AdminDashboard";
import OrderHistoryForm from "../userPages/HistoryPage/OrderHistory";
import About from "../userPages/AboutPage/About";
import ProtectRoute from "./ProtectRoute";
import RedirectLogin from "./RedirectLogin";
import UserProtectRoute from "./UserProtectRoute";

const LoginPage = lazy(() => import("../userPages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../userPages/HomePage/HomePage"));
const MainContainer = lazy(() => import("../component/MainContainer"));
const AdminContainer = lazy(() => import("../component/AdminContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: (
          <RedirectLogin>
            <LoginPage />
          </RedirectLogin>
        ),
      },
      {
        path: "menu",
        element: <MenuPage />,
        children: [
          { path: "pizza", element: <PizzaPage /> },
          { path: "others", element: <OthersPage /> },
          { path: "softdrinks", element: <SoftdrinksPage /> },
        ],
      },
      {
        path: "profile/:userId",
        element: (
          <UserProtectRoute>
            <ProfilePage />
          </UserProtectRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <UserProtectRoute>
            <CartPage />
          </UserProtectRoute>
        ),
      },
      {
        path: "order",
        element: (
          <UserProtectRoute>
            <OrderHistoryForm />
          </UserProtectRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectRoute>
        <AdminContainer />
      </ProtectRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "product", element: <AdminProduct /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
