import { memo } from "react";
import { HashLink } from "react-router-hash-link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useFavourite } from "../Api/useFavourite";

const FavouriteItem = () => {
  // State Data
  const { favouriteItems, removeFavouriteItem } = useFavourite();
  return (
    <>
      <section className="bg-gray-100 md:!py-21 !py-25">
        <div className="!px-[5%]">
          <div className="container !mx-auto">
            <div className="!py-5">
              <h2 className="text-3xl font-bold">Your Favourite Cart</h2>
            </div>
            {favouriteItems.length > 0 ? (
              <div className="grid grid-cols-1">
                {favouriteItems.map((item) => (
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
                          onClick={() => removeFavouriteItem(item.id)}
                          className="text-gray-500 hover:text-red-500 hover:scale-110 active:scale-110 active:text-red-500 duration-200 cursor-pointer"
                          size={20}
                        />
                      </div>
                      <p className="font-normal text-[13px] text-gray-500 cart-description">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <span className="bg-[#E0E7FF] !py-1 !px-2 text-[13px] text-[#6e69c4] rounded-2xl cart-brand">
                          {item.brand || "Localy"}
                        </span>
                        <span className="font-bold">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 h-100">
                <FaRegHeart className="cart-icon" size={65} color="#9CA3AF" />
                <h3 className="text-2xl font-bold !mt-2">Your cart is empty</h3>
                <p className="text-gray-500 font-normal">
                  Start shopping to add items to your cart
                </p>
                <HashLink smooth to={"/#shop"}>
                  <button
                    class="!mt-2 !px-6 !py-3 bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-105 text-white rounded-md font-medium duration-300 cursor-pointer"
                    tabindex="0"
                  >
                    Show Favourite
                  </button>
                </HashLink>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(FavouriteItem);
