import { lazy, memo } from "react";
const CartItem = lazy(() => import("../Components/CartItem"));
const Cart = () => {
  return (
    <>
      <CartItem />
    </>
  );
};

export default memo(Cart);
