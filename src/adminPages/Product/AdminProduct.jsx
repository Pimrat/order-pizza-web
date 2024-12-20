import { useState } from "react";
import AdminHeader from "../../component/AdminHeader";
import Side from "../../component/Side";
import Add from "./AddProduct";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import productApi from "../../apis/productApi";
import { toast } from "react-toastify";
import Modal from "../../component/Modal";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getAllProduct();
        // console.log("Fetched Products: ", res);
        setProducts(res.data);
      } catch (err) {
        console.log("Fetch Error", err);
      }
    };

    fetchProduct();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await productApi.createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, res.data]);
      toast.success("Product added successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
      // toast.error("Failed to add product");
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const res = await productApi.updateProduct(id, updatedProduct);
      console.log("Product updated successfully:", res.data);
      const updatedProducts = products.map((product) =>
        product.id === res.data.id ? res.data : product
      );
      setProducts(updatedProducts);
      // toast.success("Product updated");
    } catch (error) {
      console.error("Failed to update product:", error);
      // toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productApi.deleteProduct(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      toast.success("Delete Product success");
    } catch (err) {
      console.log(err);
      // toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      <div>
        <div className='bg-[#F8FCFF] min-h-[90vh] rounded-lg flex justify-center'>
          <div className='w-[80vw] flex gap-8 my-4'>
            <div className='border-2 border-[#415F6C] rounded-lg h-full w-1/4'>
              <Side />
            </div>
            <div className='border-2 border-[#415F6C] rounded-lg h-full w-3/4 p-4'>
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setOpen(true)}
                className="bg-green-500 border-green-500 cursor-pointer hover:opacity-70 transition-all duration-200 ease-in-out border rounded-xl px-3 py-3"
              >
                Add Product Menu
              </button>
            </div>
              <div>
                <ProductCard
                  products={products}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Add Product'
        open={open}
        onClose={() => setOpen(false)}
        width='40'
      >
        <Add onAddProduct={handleAddProduct} setOpen={setOpen} />
      </Modal>
    </div>
  );
}
