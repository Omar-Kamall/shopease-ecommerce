import { lazy, memo, useEffect, useState } from "react";
import { Outlet, Route } from "react-router";
import { createBrowserRouter, createRoutesFromElements } from "react-router";
import { RouterProvider } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Navbar = lazy(() => import("./Components/Nav"));
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Cart = lazy(() => import("./Pages/Cart"));
const Favourite = lazy(() => import("./Pages/Favourite"));
const Footer = lazy(() => import("./Components/Footerr"));

import { CartProvider } from "./Api/CartProvider";
import { FavouriteProvider } from "./Api/FavouriteProvider";
import { SearechProvider } from "./Api/SearchProvider";

import "../src/App.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  // Routes Pages
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="favourite" element={<Favourite />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      {loading ? (
        <div className="bg-white flex justify-center items-center flex-col gap-3 h-[100vh]">
          <h1 className="text-[#4338CA] text-3xl font-bold">ShopEase</h1>
          <BarLoader width={250} height={5} color="#4338CA" />
        </div>
      ) : (
        <CartProvider>
          <FavouriteProvider>
            <SearechProvider>
              <RouterProvider router={router} />
            </SearechProvider>
          </FavouriteProvider>
        </CartProvider>
      )}
    </>
  );
};

export default memo(App);
