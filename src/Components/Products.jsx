import { FiShoppingCart } from "react-icons/fi";
import { memo, useMemo } from "react";
import useFetchProducts from "../Api/useFetchProducts";
import { BarLoader } from "react-spinners";
import { FaHeart } from "react-icons/fa";
import { useFavourite } from "../Api/useFavourite";
import { useCart } from "../Api/useCart";
import { useSearch } from "../Api/useSearch";
import { Banal_Img } from "../../public/assets";

const Products = () => {
  // Fetch Data
  const { data: products, loading, error } = useFetchProducts();

  // Add To Cart
  const { addToCart } = useCart();

  // Add And Remove Favourite
  const { addFavouriteItem, removeFavouriteItem, favouriteItems } =
    useFavourite();

  // Search Item
  const { searchItem } = useSearch();
  const filterProduct = useMemo(() => {
    return products.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [products, searchItem]);

  return (
    <>
      <section className="bg-gray-100 scroll-mt-25 md:scroll-mt-0" id="shop">
        <div className="!p-[5%]">
          <div className="container !mx-auto">
            <div className="mb-5!">
              <h3 className="text-3xl font-bold">Our Products</h3>
              <p className="text-gray-600 font-normal">
                Browse our latest collection
              </p>
            </div>
            {loading ? (
              <div className="flex justify-center items-center flex-col gap-3 h-50">
                <h1 className="text-[#4338CA] text-3xl font-bold">
                  Loading Data ...
                </h1>
                <BarLoader width={250} height={5} color="#4338CA" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center flex-col gap-3 h-50">
                <h1 className="text-[#4338CA] text-3xl font-bold">{error}</h1>
                <BarLoader width={250} height={5} color="#4338CA" />
              </div>
            ) : filterProduct.length > 0 ? (
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {filterProduct.map((item) => (
                  <div
                    key={item.id}
                    className="!p-3 bg-white rounded shadow-lg hover:scale-103 hover:shadow-2xl duration-300"
                  >
                    <div className="relative">
                      <img
                        className="w-full md:h-65 h-75 rounded bg-transparent"
                        src={item.images[0]}
                        alt="Image-Cart"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2">
                        {favouriteItems.some((fav) => fav.id === item.id) ? (
                          <FaHeart
                            onClick={() => removeFavouriteItem(item.id)}
                            size={22}
                            className="cursor-pointer text-red-500 hover:text-red-500 duration-300"
                          />
                        ) : (
                          <FaHeart
                            onClick={() => addFavouriteItem(item)}
                            size={22}
                            className="cursor-pointer text-black hover:text-red-500 duration-300"
                          />
                        )}
                      </span>
                      <span className="absolute top-1 right-1 px-2! bg-red-500 text-white rounded">
                        {item.discountPercentage.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center my-2!">
                      <h2 className="cart-name">{item.title}</h2>
                      <span className="bg-[#E0E7FF] !py-1 !px-2 text-[13px] text-[#6e69c4] rounded-2xl cart-brand">
                        {item.brand || "Localy"}
                      </span>
                    </div>
                    <p className="font-normal text-[13px] text-gray-500 cart-description">
                      {item.description}
                    </p>
                    <span>
                      Quanitity (
                      <span className="text-[#4F46E5]">
                        {item.minimumOrderQuantity}
                      </span>
                      )
                    </span>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className="font-extrabold">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] hover:scale-107 active:scale-110 active:bg-[#4338CA] text-white py-2! px-4! duration-300 rounded-2xl cursor-pointer"
                      >
                        <FiShoppingCart /> Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 h-50">
                <h3 className="text-center sm:text-3xl text-[20px] font-bold text-red-500">
                  The product is not available
                </h3>
                <BarLoader width={250} height={5} color="red" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Products);
