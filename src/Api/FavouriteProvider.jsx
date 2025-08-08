import { createContext, useReducer } from "react";

const initialState = {
  favouriteItems: [],
};

const favouriteReducer = (state, action) => {
  switch (action.type) {
    case "addFavouriteItem":
      const findId = state.favouriteItems.find(
        (item) => item.id === action.payload.id
      );
      if (findId) return state;
      else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, action.payload],
        };
      }
    case "removeFavouriteItem":
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouriteReducer, initialState);

  const addFavouriteItem = (product) => {
    dispatch({ type: "addFavouriteItem", payload: product });
  };

  const removeFavouriteItem = (id) => {
    dispatch({ type: "removeFavouriteItem", payload: id });
  };

  return (
    <FavouriteContext.Provider
      value={{
        favouriteItems: state.favouriteItems,
        addFavouriteItem,
        removeFavouriteItem,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
