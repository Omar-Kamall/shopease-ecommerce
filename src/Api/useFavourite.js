import { useContext } from "react";
import { FavouriteContext } from "./FavouriteProvider";

export const useFavourite = () => useContext(FavouriteContext);
