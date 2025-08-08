import { createContext, useReducer } from "react";

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      const findProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (findProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case "removeFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case "clearCart":
      return {
        cartItems: [],
      };

    case "increaseQuantity": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case "decreaseQuantity": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            };
          }
          return item;
        }),
      };
    }

    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "addToCart", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "removeFromCart", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "clearCart" });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "increaseQuantity", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "decreaseQuantity", payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
