import { useState, useEffect } from "react";
import { Link, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Button from "../../component/Button";
import ProductBox from "../../component/ProductBox";
import PizzaPage from "./PizzaPage";
import OthersPage from "./OthersPage";
import SoftdrinksPage from "./SoftdrinksPage";
import productApi from "../../apis/productApi";

export default function MenuPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getAllProduct();
        setProducts(response.data);
      } catch (err) {
        console.log("Fetch Error", err);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    setActiveButton(getActiveButtonFromPath(location.pathname));
  }, [location.pathname]);

  function getActiveButtonFromPath(pathname) {
    const pathParts = pathname.split("/");
    if (pathParts.length >= 3 && pathParts[1] === "menu") {
      return pathParts[2];
    }
    return "";
  }

  const handleButtonClick = (page) => {
    setActiveButton(page);
  };

  return (
    <div>
      <div className='bg-[#F8FCFF] h-full'>
        <div className='p-1 flex items-center'>
          <Link to='/menu' style={{ textDecoration: "none" }}>
            <div className='flex justify-start bg-[#6495ED] m-4 p-6 rounded-xl w-fit'>
              <h1 className='text-[#26363A] font-semibold text-3xl'>
                Menu Category
              </h1>
            </div>
          </Link>
          {activeButton && (
            <div className='text-[#59777D] text-3xl font-semibold'>
              &gt; {activeButton.toUpperCase()}
            </div>
          )}
        </div>
        <div className='flex justify-around flex-col sm:flex-row gap-2 sm:gap-4 h-auto sm:h-16 px-4'>
          <Link to='/menu/pizza'>
            <Button
              className='w-full sm:w-48 md:w-64 lg:w-80'
              fontSize='text-2xl'
              fontWeight='font-semibold'
              bg={activeButton === "pizza" ? "orange" : "lightBlue"}
              border='lightBlue'
              color={activeButton === "pizza" ? "white" : "black"}
              onClick={() => handleButtonClick("top")}
            >
              Pizza
            </Button>
          </Link>
          <Link to='/menu/others'>
            <Button
              className='w-full sm:w-48 md:w-64 lg:w-80'
              fontSize='text-2xl'
              fontWeight='font-semibold'
              bg={activeButton === "others" ? "orange" : "lightBlue"}
              border='lightBlue'
              color={activeButton === "others" ? "white" : "black"}
              onClick={() => handleButtonClick("bottom")}
            >
              Others
            </Button>
          </Link>
          <Link to='/menu/softdrinks'>
            <Button
              className='w-full sm:w-48 md:w-64 lg:w-80'
              fontSize='text-2xl'
              fontWeight='font-semibold'
              bg={activeButton === "softdrinks" ? "orange" : "lightBlue"}
              border='lightBlue'
              color={activeButton === "softdrinks" ? "white" : "black"}
              onClick={() => handleButtonClick("accessories")}
            >
              Soft Drinks
            </Button>
          </Link>
        </div>
        <Routes>
          <Route path='/' element={<Outlet />} />
          <Route path='/menu/pizza' element={<PizzaPage />} />
          <Route path='/menu/others' element={<OthersPage />} />
          <Route path='/menu/softdrinks' element={<SoftdrinksPage />} />
        </Routes>
        <ProductBox category={activeButton} products={products} />
      </div>
    </div>
  );
}
