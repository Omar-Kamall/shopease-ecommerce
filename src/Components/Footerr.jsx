import { memo } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const links = [
  { id: 0, name: "Home", to: "/#home" },
  { id: 1, name: "About", to: "/#about" },
  { id: 2, name: "Shop", to: "/#shop" },
  { id: 3, name: "Categories", to: "/#shop" },
];

const Footer = () => {
  return (
    <>
      <footer
        className="bg-[#111827] text-white scroll-mt-25 md:scroll-mt-0"
        id="about"
      >
        <div className="!px-[5%] !pb-5 !pt-10">
          <div className="container !mx-auto">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 !pb-5 border-b-1 border-b-gray-500">
              <div>
                <h2 className="text-[20px] font-bold">ShopEase</h2>
                <p className="text-[13px] text-gray-300 !mt-3">
                  Your premier destination for quality products and exceptional
                  customer service since 2025
                </p>
              </div>
              <div>
                <h2 className="text-[20px] font-bold">Quick Links</h2>
                <div className="flex flex-col gap-3 !mt-3">
                  {links.map((link) => (
                    <HashLink
                      smooth
                      className="text-gray-300 hover:text-[#4338CA] active:text-[#4338CA] duration-300"
                      key={link.id}
                      to={link.to}
                    >
                      {link.name}
                    </HashLink>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[20px] font-bold">Customer Service</h2>
                <div className="flex flex-col gap-3 !mt-3">
                  {links.map((link) => (
                    <HashLink
                      smooth
                      className="text-gray-300 hover:text-[#4338CA] active:text-[#4338CA] duration-300"
                      key={link.id}
                      to={link.to}
                    >
                      {link.name}
                    </HashLink>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[20px] font-bold">Newsletter</h2>
                <p className="text-[13px] text-gray-300 !mt-3">
                  Subscribe to get updates on new arrivals, special offers and
                  other discount information
                </p>
                <div className="flex mt-3!">
                  <input
                    placeholder="Your email address"
                    className="!py-2 !px-4 w-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500 text-sm"
                    type="email"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white !px-4 text-sm transition cursor-pointer">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center !pt-5">
              <p className="text-[13px] text-gray-300 hover:text-[#4338CA] active:text-[#4338CA] duration-300">
                © 2025 ShopEase. All rights reserved.
              </p>
              <div className="flex gap-3">
                <Link className="text-gray-300 text-[14px] hover:text-[#4338CA] active:text-[#4338CA] duration-300">
                  Privacy Policy
                </Link>
                <Link className="text-gray-300 text-[14px] hover:text-[#4338CA] active:text-[#4338CA] duration-300">
                  Terms of Service
                </Link>
                <Link className="text-gray-300 text-[14px] hover:text-[#4338CA] active:text-[#4338CA] duration-300">
                  Cookies Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default memo(Footer);
