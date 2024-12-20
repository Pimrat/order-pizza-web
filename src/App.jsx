import { Slide, ToastContainer } from "react-toastify";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./routes";
import { CartContextProvider } from "./contexts/CartContext";
import { Suspense } from "react";
import Spinner from "./component/Spinner";

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <AuthContextProvider>
          <CartContextProvider>
            <Router />
            <ToastContainer
              position='bottom-right'
              autoClose={2000}
              transition={Slide}
            />
          </CartContextProvider>
        </AuthContextProvider>
      </Suspense>
    </>
  );
}

export default App;
