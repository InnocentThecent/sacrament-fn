import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import { Link, useNavigate } from "react-router-dom";
import { registerFields } from "../../constants/formFields";
import Input from "../../components/Input";

import logo from "../../assets/logo.png";
import { fields } from "../../types";
import { createApiData } from "../../redux/features";
import { toast } from "react-toastify";

import loginAvatar from "../../assets/registerPerson.svg";
import Header from "../homepage/Header";

const fieldState: fields = {};

registerFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [registerState, setregisterState] = useState(fieldState);
  const { error, errorData } = useAppSelector((state) => state.api);
  const [gender, setGender] = useState("");

  const { loading } = useAppSelector((state) => state.api);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerState.password !== registerState.confirmPassword)
      return toast.error("Passwords do not match");

    const myFields = {
      ...registerState,
      gender,
    };

    try {
      await dispatch(
        createApiData({
          body: myFields,
          url: "/auth/register",
        })
      ).unwrap();

      toast.success("Account created successfully, Check your email to verify");
      setregisterState(fieldState);
      setGender("");
      navigate("/login");
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(error.message);
        console.log(errorData);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-200  min-h-full h-full flex flex-col  justify-center ">
        <div className="grid grid-cols-2">
          <div className="h-screen bg-primary flex justify-center items-center ">
            <img
              src={loginAvatar}
              alt=""
              className="
         h-2/5 w-2/5 mr-20
         "
            />
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-white">Register</h2>
            </div>
          </div>
          <div className="flex px-10 justify-center">
            <div className="bg-white max-w-xl mt-24 mb-10 w-full space-y-4 border p-6 rounded shadow-md">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex">
                  <h4 className="text-lg font-bold text-red-400 uppercase ">
                    Tele
                  </h4>
                  <h4 className="text-lg font-bold  uppercase text-[#2720FF]">
                    pharmacy
                  </h4>
                </div>
                <div className="mx-auto flex  items-center justify-center  shadow-sm">
                  <img src={logo} alt="" className="w-16" />
                </div>
              </div>
              <div
                className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2 ${
                  error ? "flex" : "hidden"
                }`}
                role="alert"
              >
                <div>
                  <ul className="list-disc list-inside">
                    {errorData?.map((err: any, index: number) => (
                      <li key={index}>{err?.message}</li>
                    ))}

                    {error?.length < 20 ? error : "Problem creating account"}
                  </ul>
                </div>
              </div>
              <form className=" space-y-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-2">
                  {registerFields.map((field) => (
                    <Input
                      key={field.id}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={field.isRequired}
                      placeholder={field.placeholder}
                      customClass={` px-2 py-1`}
                      defaultValue={
                        registerState[field.id as keyof typeof registerState]
                      }
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setregisterState({
                          ...registerState,
                          [e.target.id]: e.target.value,
                        });
                      }}
                    />
                  ))}
                  <div>
                    <label htmlFor="gender" className="font-semibold">
                      {"Gender"}
                    </label>
                    <div role="radiogroup" className="mx-auto pt-2 flex ">
                      <div className="flex ">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                          <input
                            aria-labelledby="label1"
                            type="radio"
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                            value="Male"
                            required
                            className="checkbox appearance-none p-2 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                          />
                          <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"></div>
                        </div>
                        <label
                          id="label1"
                          className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100"
                        >
                          {"Male"}
                        </label>
                      </div>
                      <div className="flex items-center ml-6">
                        <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                          <input
                            aria-labelledby="label1"
                            type="radio"
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                            value="Female"
                            required
                            className="checkbox appearance-none p-2 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                          />
                          <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"></div>
                        </div>
                        <label
                          id="label1"
                          className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100"
                        >
                          {"Female"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start ">
                  <div className="text-sm w-full flex justify-between">
                    <div className="">
                      {"Already have an account?"}
                      <Link
                        to="/login"
                        className="font-medium ml-1 text-primary hover:primaryHover"
                      >
                        {"Login"}
                      </Link>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
            ${
              loading
                ? "bg-gray-300 text-gray-500 border-gray-400 focus:ring-gray-200  hover:bg-gray-400 hover:text-white"
                : "bg-primary text-white border-primary focus:ring-primary  hover:bg-primaryHover hover:text-white "
            }

           focus:outline-none focus:ring-2 focus:ring-offset-2  `}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
