import { useState } from "react";
import Edit from "./EditProduct";
import Modal from "../../component/Modal";

export default function ProductCard({
  products,
  onUpdateProduct,
  onDeleteProduct,
}) {
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(products);

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDeleteProduct(productId);
    }
  };

  return (
<div className='grid grid-cols-2 gap-4'>
  {products.map((product) => (
    <div
      key={product.id}
      className='rounded-lg bg-[#E5ECF0] hover:shadow-md shadow-[#40565C] relative p-4'
    >
      {/* Edit/Delete buttons positioned at top right */}
      <div className='absolute top-2 right-2 flex gap-2'>
        <span
          className='text-[#40565C] cursor-pointer underline'
          onClick={() => handleEditProduct(product)}
        >
          Edit
        </span>
        <span
          className='text-[#40565C] cursor-pointer underline'
          onClick={() => handleDeleteProduct(product.id)}
        >
          Delete
        </span>
      </div>

      {/* Centered image */}
      <div className='flex justify-center mb-4 mt-5'>
        <div className='h-40 w-auto flex items-center justify-center'>
          <img
            src={product.productImage}
            alt={product.productName}
            className='max-h-full max-w-full object-contain'
          />
        </div>
      </div>

      {/* Product details below image */}
      <div className='space-y-2'>
        <div>
          <span className='text-lg font-bold'>Name:</span>
          <span className='text-lg mx-2'>{product.productName}</span>
        </div>
        <div>
          <span className='text-lg font-bold'>Type:</span>
          <span className='text-lg mx-2'>{product.productType}</span>
        </div>
        <div>
        <span className='text-lg font-bold'>Detail:</span>
          <span className='text-lg mx-2'>{product.productDetail}</span>
        </div>
        <div>
        <span className='text-lg font-bold'>Price:</span>
          <span className='text-lg mx-2'>{Number(product.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</span>
          ฿
        </div>
      </div>
    </div>
  ))}
  <Modal
    open={open}
    onClose={() => setOpen(false)}
    title='Edit Product'
    width='40'
  >
    {currentProduct && (
      <Edit
        productId={currentProduct}
        onUpdateProduct={onUpdateProduct}
        setOpen={setOpen}
      />
    )}
  </Modal>
</div>
  );
}
