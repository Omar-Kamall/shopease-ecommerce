import { memo, useEffect, useState } from "react";
import { BiHide, BiSolidShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GoPerson } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/FirebaseAuth";

import Cookies from "js-cookie";

const Login = () => {
  // State Show And Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    if (showPassword || showConfirmPassword) {
      const timeout = setTimeout(() => {
        setShowPassword(false);
        setShowConfirmPassword(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showPassword, showConfirmPassword]);

  // Validation From Use Yup
  const validateSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        Cookies.set("token", user.accessToken, { secure: true });
        Cookies.set("userName", user.displayName || "User", { secure: true });
        console.log(Cookies.get("token"), Cookies.get("userName"));
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  // Login With Google Firebase
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        Cookies.set("token", token, { secure: true });
        Cookies.set("userName", user.displayName || "User", {
          secure: true,
        });
        navigate("/");
      })
      .catch((error) => {
        alert("Login Failed: " + error.message);
      });
  };

  return (
    <>
      <section className="bg-gray-100 md:!py-20 !py-25">
        <div className="!px-[5%] flex items-center justify-center flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[28px] font-extrabold">Login</h2>
            <p className="text-[15px] text-gray-600">
              Not have an account?{" "}
              <Link className="text-[#3f38b7]" to={"/register"}>
                Sign Up
              </Link>
            </p>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-2 bg-white !p-10 w-full max-w-[450px] min-w-[200px] rounded-lg shadow-2xl">
              <div className="!mb-3 flex flex-col justify-center items-center gap-3">
                <button
                  type="button"
                  onClick={loginGoogle}
                  className="flex items-center justify-center gap-1 !py-2 w-full cursor-pointer border-1 border-gray-300 hover:bg-gray-200 hover:scale-105 active:bg-gray-200 active:scale-105 duration-300 rounded"
                >
                  <FcGoogle size={20} />
                  Google
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-400 h-[1px] w-full"></div>
                <span className="font-thin text-gray-600 text-[13px] whitespace-nowrap">
                  Or Login With Email
                </span>
                <div className="bg-gray-400 h-[1px] w-full"></div>
              </div>
              <label htmlFor="name">Full Name</label>
              <div className="relative">
                <Field
                  className="!pl-8 !py-2 border-1 border-gary-700 rounded-md w-full focus:outline-[#4F46E5]"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  id="name"
                />
                <GoPerson
                  color="gray"
                  size={20}
                  className="absolute top-[10px] left-2"
                />
              </div>
              <ErrorMessage
                className="text-red-500"
                name="name"
                component="div"
              />
              <label htmlFor="email">Email Adress</label>
              <div className="relative">
                <Field
                  className="!pl-8 !py-2 border-1 border-gary-700 rounded-md w-full focus:outline-[#4F46E5]"
                  type="text"
                  name="email"
                  placeholder="Email"
                  id="email"
                />
                <MdOutlineEmail
                  color="gray"
                  size={20}
                  className="absolute top-[10px] left-2"
                />
              </div>
              <ErrorMessage
                className="text-red-500"
                name="email"
                component="div"
              />
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Field
                  className="!pl-8 !py-2 border-1 border-gary-700 rounded-md w-full focus:outline-[#4F46E5]"
                  type={showPassword ? "text" : "Password"}
                  name="password"
                  placeholder="Password"
                  id="password"
                />
                <TbLockPassword
                  color="gray"
                  size={20}
                  className="absolute top-[10px] left-2"
                />
                {showPassword ? (
                  <BiHide
                    onClick={() => setShowPassword(false)}
                    color="gray"
                    size={20}
                    className="absolute top-[10px] right-3 cursor-pointer"
                  />
                ) : (
                  <BiSolidShow
                    onClick={() => setShowPassword(true)}
                    color="gray"
                    size={20}
                    className="absolute top-[10px] right-3 cursor-pointer"
                  />
                )}
              </div>
              <ErrorMessage
                className="text-red-500"
                name="password"
                component="div"
              />
              <button
                className="!py-2 !mt-5 cursor-pointer w-full text-white bg-[#4F46E5] hover:bg-[#3f38b7] hover:scale-103 active:bg-[#3f38b7] active:scale-103 rounded duration-300"
                type="submit"
              >
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default memo(Login);
