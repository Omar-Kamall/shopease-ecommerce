import { Banal_Img } from "../../public/assets";
import { memo } from "react";
import { HashLink } from "react-router-hash-link";

const Banal = () => {
  return (
    <>
      <header className="scroll-mt-15" id="home">
        <div className="relative w-full h-100 bg-gray-900">
          <img
            className="h-full w-full object-cover opacity-40"
            src={Banal_Img}
            alt="Image-Banal"
            loading="lazy"
          />
          <div className="absolute px-[5%]! flex flex-col justify-center inset-0 text-white z-20">
            <div className="container !mx-auto">
              <h2 className="md:text-5xl text-3xl font-extrabold">
                Summer Collection 2025
              </h2>
              <p className="md:text-2xl text-[20px] mt-2! font-bold">
                Discover our new arrivals with up to 30% off on selected items
              </p>
              <div className="flex flex-wrap mt-5! gap-3">
                <HashLink smooth to={"/#shop"}>
                  <button className="px-7! py-3! bg-[#584cdd] hover:bg-[#4338CA] active:bg-[#4338CA] duration-300 rounded cursor-pointer">
                    Shop Now &#8594;
                  </button>
                </HashLink>
                <HashLink smooth to={"/#shop"}>
                  <button className="px-7! py-3! bg-white text-black hover:bg-gray-300 active:bg-gray-300 duration-300 rounded cursor-pointer">
                    View Collection
                  </button>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Banal);
