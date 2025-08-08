import { lazy, memo, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { HashLink } from "react-router-hash-link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";
import { useCart } from "../Api/useCart";

import Cookies from "js-cookie";
const CheckOut = lazy(() => import("../Payment/PaymentPage"));

const CartItem = () => {
  // Token
  const token = Cookies.get("token");

  // State Data
  const {
    cartItems,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();

  // Prices
  const subTotal = Number(
    cartItems.reduce((acc, item) => {
      return acc + Number(item.price) * Number(item.quantity);
    }, 0)
  );
  const Shipping = Number(5);
  const Tax = Number(subTotal * 0.04);
  const Total = Number(subTotal + Shipping + Tax);

  // CheckOut Payment
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <section className="bg-gray-100 md:!py-15 !py-25">
        <div className="!px-[5%]">
          {!showCheckout ? (
            <div className="container !mx-auto">
              <div className="!py-5">
                <h2 className="text-3xl font-bold">Your Shopping Cart</h2>
              </div>
              {cartItems.length > 0 ? (
                <div className="grid grid-cols-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_5fr] items-center gap-5 !py-4 !px-10 bg-white rounded-md shadow-lg border-b-1 border-gray-200"
                    >
                      <div className="relative">
                        <img
                          className="w-full md:h-40 h-75 rounded bg-transparent hover:scale-110 active:scale-110 duration-300 cursor-pointer"
                          src={item.images[0]}
                          alt="Image-Cart"
                          loading="lazy"
                        />
                        <span className="absolute top-1 left-1 px-2! bg-red-500 text-white rounded">
                          {item.discountPercentage.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-bold">{item.title}</h2>
                          <RiDeleteBin6Line
                            onClick={() => removeFromCart(item)}
                            className="text-gray-500 hover:text-red-500 hover:scale-110 active:scale-110 active:text-red-500 duration-200 cursor-pointer"
                            size={20}
                          />
                        </div>
                        <p className="font-normal text-[13px] text-gray-500 cart-description">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div className="flex items-center border-1 border-gray-200 rounded">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="!px-3 hover:bg-gray-300 active:bg-gray-300 duration-200 text-[20px] cursor-pointer"
                            >
                              -
                            </button>
                            <span className="!px-5">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="!px-3 hover:bg-gray-300 active:bg-gray-300 duration-200 text-[20px] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col gap-3 !py-4 !px-10 bg-white rounded-md shadow-lg">
                    <div className="flex justify-between items-center gap-2">
                      <span>Subtotal</span>
                      <span className="font-bold">${subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span>Shipping</span>
                      <span className="font-bold">${Shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span>Tax</span>
                      <span className="font-bold">${Tax.toFixed(2)}</span>
                    </div>
                    <hr className="text-gray-300" />
                    <div className="flex justify-between items-center gap-2">
                      <span>Total</span>
                      <span className="font-extrabold">
                        ${Total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => clearCart()}
                        className="!py-2 w-[150px] cursor-pointer border-1 border-gray-300 hover:bg-gray-200 hover:scale-110 active:bg-gray-200 active:scale-110 duration-300 rounded"
                      >
                        Clear Cart
                      </button>
                      {token ? (
                        <button
                          onClick={() => setShowCheckout(true)}
                          className="!py-2 cursor-pointer w-full text-white bg-[#4F46E5] hover:bg-[#3f38b7] hover:scale-103 active:bg-[#3f38b7] active:scale-103 rounded duration-300"
                        >
                          Proceed to Checkout
                        </button>
                      ) : (
                        <Link to="/register" className="w-full">
                          <button className="!py-2 cursor-pointer w-full text-white bg-[#4F46E5] hover:bg-[#3f38b7] hover:scale-103 active:bg-[#3f38b7] active:scale-103 rounded duration-300">
                            You Must login
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 h-100">
                  <FiShoppingCart
                    className="cart-icon"
                    size={65}
                    color="#9CA3AF"
                  />
                  <h3 className="text-2xl font-bold !mt-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 font-normal">
                    Start shopping to add items to your cart
                  </p>
                  <HashLink smooth to={"/#shop"}>
                    <button className="!mt-2 !px-6 !py-3 bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-105 text-white rounded-md font-medium duration-300 cursor-pointer">
                      Continue Shopping
                    </button>
                  </HashLink>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-100 !mt-20 w-full">
              <CheckOut
                totalPrice={Total}
                statePayment={{ showCheckout, setShowCheckout }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default memo(CartItem);
