import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearechProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <SearchContext.Provider value={{ searchItem, setSearchItem }}>
      {children}
    </SearchContext.Provider>
  );
};
