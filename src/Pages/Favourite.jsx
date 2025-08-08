import { lazy, memo } from "react";
const FavouriteItem = lazy(() => import("../Components/FavouriteItem"));
const Favourite = () => {
  return (
    <>
      <FavouriteItem />
    </>
  );
};

export default memo(Favourite);
