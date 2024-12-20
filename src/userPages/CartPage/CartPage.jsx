import Button from "../../component/Button";
import CartProduct from "./CartProduct";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import orderApi from "../../apis/orderApi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // const totalQuantity = Array.isArray(cartItems)
  //   ? cartItems.reduce((total, product) => total + product.amount, 0)
  //   : 0;

  const handleOrder = async () => {
    try {
      const OrderItem = cartItems.map((item) => ({
        productId: item.productId,
        itemAmount: item.amount,
        totalPrice: item.products.price * item.amount,
      }));

      await orderApi.createOrder({ OrderItem });

      clearCart();

      navigate("/order");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="bg-[#F8FCFF] min-h-[90vh]">
        <div className="p-1">
          <div className="flex justify-between items-center">
            <div className="flex justify-start bg-[#6495ED] m-4 p-6 rounded-xl w-fit">
              <h1 className="text-[#26363A] font-semibold text-3xl">
                Menu Cart
              </h1>
            </div>
            <span
              className="underline text-[#40565C] cursor-pointer px-10 text-2xl"
              onClick={clearCart}
            >
              Clear All Menu
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))
            ) : (
              <>
                <div className="text-center text-2xl font-semibold p-8">
                  Your cart is empty
                </div>
                <div className="text-center">
                <Link
                  to="/menu"
                  className="px-6 py-3 border-2 border-whitesmoke text-black hover:bg-primary hover:text-white transition-colors duration-300 rounded-lg"
                >
                  Back to Menu
                </Link>
                </div>
              </>
            )}
          </div>

          {cartItems && cartItems.length > 0 && (
            <>
              <div>
                <div className="text-2xl font-semibold text-right mx-40 mt-4">
                  Total Price : {getTotalPrice()} Bath
                </div>
              </div>

              <div className="mt-4 mx-40 text-end">
                <Button
                  className="w-40 bg-success"
                  fontSize="text-2xl"
                  fontWeight="font-semibold"
                  border="none"
                  onClick={handleOrder} // Use handlePayment function
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
