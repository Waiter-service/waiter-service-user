"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define the shape of an article
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

// Define the shape of the cart state
type CartState = {
  articles: Article[];
};

// Define actions for the reducer
type CartAction =
  | { type: "ADD_TO_CART"; payload: Article }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" };

// Initial state for the cart
const initialState: CartState = {
  articles: [],
};

// Reducer function to manage cart state
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingArticle = state.articles.find(
        (article) => article.id === action.payload.id
      );
      if (existingArticle) {
        // Update quantity if article already exists
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
      // Add new article to the cart
      return { ...state, articles: [...state.articles, action.payload] };

    case "REMOVE_FROM_CART":
      // Remove article by ID
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.payload
        ),
      };

    case "CLEAR_CART":
      // Clear all articles from the cart
      return { ...state, articles: [] };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext<{
  state: CartState;
  addToCart: (article: Article) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
} | null>(null);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Function to add an article to the cart
  const addToCart = (article: Article) => {
    dispatch({ type: "ADD_TO_CART", payload: article });
  };

  // Function to remove an article from the cart
  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Function to clear the cart
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

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
