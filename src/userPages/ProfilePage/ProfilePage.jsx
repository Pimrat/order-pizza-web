import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../component/Input";

import Button from "../../component/Button";
import { toast } from "react-toastify";
import userApi from "../../apis/userApi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [edit, setEdit] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setUser(response.data.user);
        setForm(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userApi.updateProfile();

      setUser(res.data.user);
      setEdit(false);
      toast.success("Update success");
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className='bg-[#F8FCFF]min-h-[90vh] pb-8'>
        <div className='p-4 flex items-center'>
          <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-40'>
            <h1 className='text-[#26363A] font-semibold text-4xl'>Profile</h1>
          </div>
        </div>
        <div className='w-1/4 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md text-balance'>
          {edit ? (
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <label className='text-[#415F6C]'>First name:</label>
                <Input
                  border='blue'
                  type='text'
                  name='firstName'
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='text-[#415F6C]'>Last name:</label>
                <Input
                  border='blue'
                  type='text'
                  name='lastName'
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='text-[#415F6C]'>Username:</label>
                <Input
                  border='blue'
                  type='text'
                  name='username'
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='text-[#415F6C]'>Email:</label>
                <Input
                  border='blue'
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className='flex justify-center gap-8 mt-8'>
                <button
                  className='border-2 px-4 py-2 rounded-full border-[#415F6C]'
                  type='submit'
                >
                  Save
                </button>
                <button
                  className='border-2 px-4 py-2 rounded-full border-[#F86158]'
                  type='button'
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div>
                <span>First name: {user.firstName}</span>
              </div>
              <div>
                <span>Last name: {user.lastName}</span>
              </div>
              <div>
                <span>Username: {user.username}</span>
              </div>
              <div>
                <span>Email: {user.email}</span>
              </div>
              <div className='flex justify-center mt-8'>
                <Button
                  fontSize='text-lg'
                  fontWeight='font-semibold'
                  bg='none'
                  border='yellow'
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
