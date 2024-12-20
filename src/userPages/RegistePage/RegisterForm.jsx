import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Input from "../../component/Input";
import Button from "../../component/Button";
import registerValidate from "../../features/validator/RegisterValidate";
import userApi from "../../apis/userApi";
import { useNavigate } from "react-router-dom";

const initialInput = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const error = registerValidate(input);

      if (error) {
        return setInputError(error);
      }

      setInputError({ ...initialInput });

      const response = await userApi.register(input);

      if (response.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      onSuccess();
      toast.success("register success");
    } catch (err) {
      console.log(err);

      if (err instanceof AxiosError) {
        if (
          err.response.data.field === "email" ||
          err.response.data.field === "username"
        )
          setInputError((prev) => ({
            ...prev,
            email: "email already use",
            username: "username already use",
          }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <Input
            placeholder='First name'
            value={input.firstName}
            name='firstName'
            bg='none'
            border='lightSkyBule'
            text='black'
            onChange={handleChangeInput}
            error={inputError.firstName}
          />
        </div>
        <div>
          <Input
            placeholder='Last name'
            value={input.lastName}
            name='lastName'
            bg='none'
            border='lightSkyBule'
            text='black'
            onChange={handleChangeInput}
            error={inputError.lastName}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Username'
            value={input.username}
            name='username'
            bg='none'
            border='lightSkyBule'
            text='black'
            onChange={handleChangeInput}
            error={inputError.username}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Email'
            value={input.email}
            name='email'
            bg='none'
            border='lightSkyBule'
            text='black'
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Password'
            value={input.password}
            name='password'
            bg='none'
            border='lightSkyBule'
            text='black'
            onChange={handleChangeInput}
            type='password'
            error={inputError.password}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Confirm password'
            value={input.confirmPassword}
            name='confirmPassword'
            bg='none'
            border='lightSkyBule'
            text='black'
            onChange={handleChangeInput}
            type='password'
            error={inputError.confirmPassword}
          />
        </div>
        <div className='col-span-2 text-center'>
          <Button
            className='w-full bg-primary'
            color="white"
            border='orange'
            type='submit'
          >
            Create Account
          </Button>
        </div>
      </div>
    </form>
  );
}
