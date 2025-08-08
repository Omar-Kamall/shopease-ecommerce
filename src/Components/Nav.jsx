import { memo, useEffect, useState } from "react";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { Link, Navigate, useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../Api/useCart";
import { useFavourite } from "../Api/useFavourite";
import { useSearch } from "../Api/useSearch";

import { signOut } from "firebase/auth";
import { auth } from "../Firebase/FirebaseAuth";

import Cookies from "js-cookie";

const links = [
  { id: 0, name: "Home", to: "/#home" },
  { id: 1, name: "About", to: "/#about" },
  { id: 2, name: "Shop", to: "/#shop" },
  { id: 3, name: "Categories", to: "/#shop" },
];

const Nav = () => {
  // Open And Close Menubar
  const [menu, setMenu] = useState(false);

  // Length State Cart
  const { cartItems } = useCart();
  const lengthCart = cartItems.length;

  // Length State Favourite
  const { favouriteItems } = useFavourite();
  const lengthFavourite = favouriteItems.length;

  // Search Item
  const { searchItem, setSearchItem } = useSearch();

  // Check Token
  const token = Cookies.get("token");
  const userName = Cookies.get("userName");
  // Logout State
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    let timeout;
    if (logout) timeout = setTimeout(() => setLogout(false), 3000);
    return () => clearTimeout(timeout);
  }, [logout]);

  // handle_Logout
  const navigate = useNavigate();
  const handle_Logout = async () => {
    const confirmPayment = window.confirm("Do you want to log out ..?");
    if (confirmPayment) {
      await signOut(auth)
        .then(() => {
          Cookies.remove("token");
          Cookies.remove("userName");
          navigate("/");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <>
      <nav className="bg-white px-[5%]! w-full fixed z-[9999999] font-bold">
        <div className="container mx-auto!">
          <div className="md:h-15 h-27 grid grid-cols-1 gap-3 py-3!">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl">
                <span className="text-[#4338CA]">Shop</span>Ease
              </h1>
              <div className="relative hidden md:flex xl:w-90 lg:w-70 md:w-90">
                <input
                  className="w-full px-3! py-2! rounded-3xl outline-3 outline-gray-500 focus:outline-[#4338CA]"
                  type="text"
                  name="search"
                  id="search"
                  value={searchItem}
                  onChange={(event) => setSearchItem(event.target.value)}
                  placeholder="Search Products ..."
                />
                <FaSearch
                  className="absolute top-[12px] right-4 cursor-pointer"
                  color="#4338CA"
                />
              </div>
              <div className="lg:flex hidden gap-7">
                {links.map((link) => (
                  <div key={link.id}>
                    <HashLink
                      className="hover:text-[#4338CA] duration-300 text-[18px]"
                      smooth
                      to={link.to}
                    >
                      {link.name}
                    </HashLink>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {token ? (
                  <span
                    onClick={() => setLogout(true)}
                    className="flex items-center justify-center bg-[#4338CA] text-white w-8 h-8 rounded-full cursor-pointer"
                  >
                    {logout ? (
                      <MdLogout onClick={handle_Logout} size={20} />
                    ) : (
                      userName.slice(0, 1).toUpperCase()
                    )}
                  </span>
                ) : (
                  <Link to="/register">
                    <GoPerson
                      className="hover:text-[#4338CA] active:text-[#4338CA] cursor-pointer"
                      size={22}
                    />
                  </Link>
                )}
                <div className="relative">
                  <Link to={"/favourite"}>
                    <FaRegHeart
                      className="hover:text-[#4338CA] active:text-[#4338CA] cursor-pointer"
                      size={22}
                    />
                  </Link>
                  <span className="absolute bg-[#4338CA] font-normal text-[12px] text-white top-[-8px] right-[-8px] px-[5px]! rounded-full">
                    {lengthFavourite}
                  </span>
                </div>
                <Link to="/cart" className="relative">
                  <FiShoppingCart
                    className="hover:text-[#4338CA] active:text-[#4338CA] cursor-pointer"
                    size={22}
                  />
                  <span className="absolute bg-[#4338CA] font-normal text-[12px] text-white top-[-8px] right-[-8px] px-[5px]! rounded-full">
                    {lengthCart}
                  </span>
                </Link>
                <div className="lg:hidden">
                  {menu ? (
                    <IoClose
                      onClick={() => setMenu(false)}
                      className="hover:text-[#4338CA] active:text-[#4338CA] cursor-pointer"
                      size={22}
                    />
                  ) : (
                    <TiThMenu
                      onClick={() => setMenu(true)}
                      className="hover:text-[#4338CA] active:text-[#4338CA] cursor-pointer"
                      size={22}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="relative flex md:hidden w-full">
              <input
                className="w-full px-3! py-2! rounded-3xl outline-3 outline-gray-500 focus:outline-[#4338CA]"
                type="text"
                name="search"
                id="serch"
                value={searchItem}
                onChange={(event) => setSearchItem(event.target.value)}
                placeholder="Search Products ..."
              />
              <FaSearch
                className="absolute top-[12px] right-4 cursor-pointer"
                color="#4338CA"
              />
            </div>
          </div>
        </div>
        <div
          className={`container mx-auto! lg:hidden transform : ${
            menu ? "translate-x-0" : "translate-x-full"
          } duration-500`}
        >
          <div className="bg-white border-2 border-[#4338CA] h-[93vh] w-[200px] right-0 z-50 rounded-md fixed">
            {links.map((link) => (
              <div
                key={link.id}
                className="px-3! py-2! flex justify-center flex-col w-full"
              >
                <HashLink
                  className="p-2! border-1 text-white text-center active:text-[#4338CA] active:bg-white active:border-[#4338CA] bg-[#4338CA] duration-300 rounded"
                  smooth
                  to={link.to}
                >
                  {link.name}
                </HashLink>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Nav);
