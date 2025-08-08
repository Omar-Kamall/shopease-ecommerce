import { lazy, memo } from "react";
const Banal = lazy(() => import("../Components/Banal"));
const Products = lazy(() => import("../Components/Products"));

const Home = () => {
  return (
    <>
      <div className="pt-15!">
        <Banal />
        <Products />
      </div>
    </>
  );
};

export default memo(Home);
