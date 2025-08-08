import { useContext } from "react";
import { SearchContext } from "./SearchProvider";

export const useSearch = () => useContext(SearchContext);
