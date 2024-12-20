import { useState, useRef } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { toast } from "react-toastify";
import { Upload } from "../../icon/Icon";
import Spinner from "../../component/Spinner"; // นำเข้า Spinner

const initialInput = {
  productName: "",
  productType: "",
  productDetail: "",
  price: "",
};

const initialInputError = {
  productName: "",
  productType: "",
  productDetail: "",
  price: "",
  productImage: "",
};

export default function Add({ onAddProduct, setOpen }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [loading, setLoading] = useState(false); // สถานะการโหลด

  const [selectFile, setSelectFile] = useState(null);
  const fileEl = useRef(null);

  const handleChaneInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
    setInputError((prev) => ({ ...prev, productImage: "" }));
  };

  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();
      setLoading(true); // ตั้งสถานะการโหลดเป็น true

      const formData = new FormData();
      formData.append("productName", input?.productName);
      formData.append("productType", input?.productType);
      formData.append("productDetail", input?.productDetail);
      formData.append("productPrice", input?.price);
      formData.append("productImage", selectFile);

      await onAddProduct(formData);

      setInput(initialInput);
      setInputError({ ...initialInputError });
      setSelectFile(null);
      setOpen(false);
      // toast.success("Product added successfully");
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false); // ตั้งสถานะการโหลดเป็น false
    }
  };

  const handleCancel = () => {
    setInput(initialInput);
    setSelectFile(null);
    setOpen(false);
  };

  return (
    <div>
      {loading ? ( // แสดง Spinner เมื่อสถานะการโหลดเป็น true
        <div className='flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <>
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
                  <Upload />
                  <div className='text-[#73979F]'>Upload image here</div>
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
                  onChange={handleChaneInput}
                  error={inputError.productName}
                />
              </div>

              <div>
                <span>Product Type :</span>

                <select
                  name='productType'
                  value={input.productType}
                  onChange={handleChaneInput}
                  className='w-full px-2 py-2 rounded-xl border-solid border-2 border-[#627B86] bg-[#E5ECF0]'
                >
                  <option value='' disabled>
                    Select type
                  </option>
                  <option value='PIZZA'>PIZZA</option>
                  <option value='OTHERS'>OTHERS</option>
                  <option value='SOFTDRINKS'>SOFTDRINKS</option>
                </select>
              </div>

              <div>
                <span>Product Detail :</span>
                <Input
                  placeholder='Product Detail'
                  value={input?.productDetail}
                  name='productDetail'
                  border='blue'
                  onChange={handleChaneInput}
                  error={inputError.productDetail}
                />
              </div>

              <div>
                <span>Product Price :</span>
                <Input
                  placeholder='Product Price'
                  type='number'
                  value={input?.price}
                  name='price'
                  border='blue'
                  onChange={handleChaneInput}
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
              onClick={handleAddProduct}
            >
              Add
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
        </>
      )}
    </div>
  );
}
