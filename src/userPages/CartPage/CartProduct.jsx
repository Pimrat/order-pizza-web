import useCart from "../../hooks/useCart";
import { Bin } from "../../icon/Icon";

export default function CartProduct({ product }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="w-3/6 rounded-xl border-2 border-[#73979F] p-4 mx-auto text-xl shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="h-auto w-[150px]">
            <img
              src={product.products.productImage}
              alt={product.products.productName}
              className="h-fit w-fit"
            />
          </div>
          <div>
            <div className="text-2xl">Order : <span className="font-bold">{product.products.productName}</span></div>
            <div className="flex gap-4">
              <span>Q'TY :</span>
              <span>
                <div>
                  <button
                    className="border rounded-lg w-8 h-8"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>
                </div>
              </span>
              <span className="border rounded-lg w-10 h-8 text-center">
                {product.amount}
              </span>
              <span>
                <button
                  className="border rounded-lg w-8 h-8"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </span>
            </div>
            <div>Price : {product.products.price * product.amount} ฿</div>
          </div>
        </div>
        <div
          role="button"
          className="rounded-full p-2"
          onClick={() => removeFromCart(product.id)}
        >
          <button className="bg-red-500 border-red-500 cursor-pointer hover:opacity-70 transition-all duration-200 ease-in-out border rounded-xl px-3 py-3">
              Remove
          </button>
        </div>
      </div>
    </div>
  );
}
