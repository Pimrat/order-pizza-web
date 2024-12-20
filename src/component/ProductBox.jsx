import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function ProductBox({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const { addToCart } = useCart();

  useEffect(() => {
    const path = location.pathname.split("/");
    const productType = path[path.length - 1].toUpperCase();
    if (["PIZZA", "OTHERS", "SOFTDRINKS"].includes(productType)) {
      const filtered = products.filter(
        (product) => product.productType === productType
      );
      setFilteredProducts(filtered);

    } else {
      setFilteredProducts(products);
    }
  }, [location.pathname, products]);

  const handleAdd = (productId, amount = 1) => {
    addToCart(productId, amount);
  };

  return (
    <div className="flex flex-grow min-h-screen">
      <div className="p-4 grid grid-cols-4 gap-2 w-full items-start place-items-center">
        {filteredProducts.map((products) => (
          <div
            key={products.id}
            className="w-auto rounded-xl hover:shadow-md hover:border-[#FF7F50] hover:border-2 hover:cursor-pointer h-fit p-4 flex flex-col justify-between"
          >
            {/* Add to Cart btn */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => handleAdd(products.id)}
                className="bg-green-500 border-green-500 cursor-pointer hover:opacity-70 transition-all duration-200 ease-in-out border rounded-xl px-3 py-3"
              >
                Add to cart
              </button>
            </div>

            {/* Image product */}
            <div className="h-64 w-auto overflow-hidden rounded bg-gray-50 flex items-center justify-center">
              <img
                src={products.productImage}
                alt={products.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description product */}
            <div className="pt-1">
              <p className="text-2xl">{products.productName}</p>
              <p className={products.productType !== "SOFTDRINKS" ? '' : 'hidden'}>
                {products.productDetail}
              </p>
              <p className="text-right text-xl">{products.price} ฿</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
