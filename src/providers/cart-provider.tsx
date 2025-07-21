"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";

type Article = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  category?: string;
  content?: string;
  image?: string;
  status?: string;
};

type CartState = {
  articles: Article[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Article }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  articles: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingArticle = state.articles.find(
        (article) => article.id === action.payload.id
      );
      if (existingArticle) {
        return {
          ...state,
          articles: state.articles.map((article) =>
            article.id === action.payload.id
              ? {
                  ...article,
                  quantity: action.payload.quantity,
                }
              : article
          ),
        };
      }
      return { ...state, articles: [...state.articles, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.payload
        ),
      };

    case "CLEAR_CART":
      return { ...state, articles: [] };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  addToCart: (article: Article) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (article: Article) => {
    dispatch({ type: "ADD_TO_CART", payload: article });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
