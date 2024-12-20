import { useState, useRef } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
// import { toast } from "react-toastify";

const initialInputError = {
  productName: "",
  productType: "",
  productDetail: "",
  productPrice: "",
  productImage: "",
};

export default function Edit({ productId, onUpdateProduct, setOpen }) {
  const [input, setInput] = useState({
    productName: productId?.productName || "",
    productType: productId?.productType || "",
    productDetail: productId?.productDetail || "",
    productPrice: productId?.price || "",
  });
  const [inputError, setInputError] = useState(initialInputError);

  const [selectFile, setSelectFile] = useState(null);
  const fileEl = useRef();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
    setInputError((prev) => ({ ...prev, productImage: "" }));
  };

  const handleCancel = () => {
    setInput(input);
    setSelectFile(null);
    setOpen(false);
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", input?.productName);
      formData.append("productType", input?.productType);
      formData.append("productDetail", input?.productDetail);
      formData.append("productPrice", input?.productPrice);
      if (selectFile) {
        console.log(selectFile);
        formData.append("productImage", selectFile);
      }
      onUpdateProduct(productId.id, formData);
      setOpen(false);
      // toast.success("Product updated");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center gap-8 my-8'>
        <div>
          <input
            className='hidden'
            type='file'
            ref={fileEl}
            onChange={handleFileChange}
          />
          {selectFile ? (
            <div className='bg-[#FFFFFF] rounded-lg w-60 h-60'>
              <img
                src={URL.createObjectURL(selectFile)}
                alt='selected'
                className='w-fit h-fit object-cover rounded-lg'
              />
            </div>
          ) : (
            <div
              className='flex flex-col justify-center items-center bg-[#FFFFFF] rounded-lg w-60 h-60 cursor-pointer'
              onClick={() => fileEl.current?.click()}
            >
              <img
                className='w-fit h-fit object-cover rounded-3xl'
                src={productId?.productImage || ""}
                alt='productImage'
              />
            </div>
          )}
        </div>

        <div className='h-60 flex flex-col justify-around gap-2'>
          <div>
            <span>Product Name :</span>
            <Input
              placeholder='Product Name'
              value={input.productName}
              name='productName'
              border='blue'
              onChange={handleChangeInput}
              error={inputError.productName}
            />
          </div>

          <div>
            <span>Product Type :</span>
            <select
              name='productType'
              value={input.productType}
              className='w-full px-2 py-2 rounded-xl border-solid border-2 border-[#627B86] bg-[#E5ECF0]'
              onChange={handleChangeInput}
            >
              <option value=''>Select type</option>
              <option value='TOP'>Top</option>
              <option value='BOTTOM'>Bottom</option>
              <option value='ACCESSORIES'>Accessories</option>
            </select>
          </div>

          <div>
            <span>Product Detail :</span>
            <Input
              placeholder='Product Detail'
              value={input.productDetail}
              name='productDetail'
              border='blue'
              onChange={handleChangeInput}
              error={inputError.productDetail}
            />
          </div>

          <div>
            <span>Product Price :</span>
            <Input
              placeholder='Product Price'
              value={`${input.productPrice}`}
              name='productPrice'
              border='blue'
              onChange={handleChangeInput}
              error={inputError.productPrice}
            />
          </div>
        </div>
      </div>
      <div className='text-end mt-20'>
        <Button
          color='white'
          bg='blue'
          className='w-20 h-12 mx-4'
          fontSize='text-xl'
          onClick={handleUpdateProduct}
        >
          Edit
        </Button>
        <Button
          color='black'
          bg='red'
          className='w-22 h-12'
          fontSize='text-xl'
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
