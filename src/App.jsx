import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card.jsx";
import ImageSlider from "./Components/Slider.jsx";
import Form from "./Components/form";
import CartItems from "./Components/CartItems";
import CardDetail from "./Components/CardDetail"

const addMetadataToProducts = (products) => {
  return products.map((product) => ({
    ...product,
    quantity: 0,
    inCart: false,
  }));
};

const initialState = {
  data: [],
  cartCount: 0,
  currentPage: 1,
  postsPerPage: 20,
  totalPosts: 20,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_CART_COUNT":
      return { ...state, cartCount: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_POSTS_PER_PAGE":
      return { ...state, postsPerPage: action.payload };
    case "totalPosts":
      return { ...state, totalPosts: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      dispatch({ type: "SET_DATA", payload: JSON.parse(storedData) });
    } else {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          const products = res.data;
          const productsWithMetadata = addMetadataToProducts(products);
          dispatch({ type: "SET_DATA", payload: productsWithMetadata });
          localStorage.setItem("data", JSON.stringify(productsWithMetadata));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const updateCartCount = () => {
    const cartData = state.data.filter((product) => product.inCart);
    const count = cartData.reduce(
      (total, product) => total + product.quantity,
      0
    );
    dispatch({ type: "SET_CART_COUNT", payload: count });
  };

  const lastPostIndex = state.currentPage * state.postsPerPage;
  const firstPostIndex = lastPostIndex - state.postsPerPage;
  const currentPosts = state.data.slice(firstPostIndex, lastPostIndex);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              updateCartCount={updateCartCount}
              cartCount={state.cartCount}
              currentPosts={currentPosts}
              firstPostIndex={firstPostIndex}
              lastPostIndex={lastPostIndex}
              setData={(data) =>
                dispatch({ type: "SET_DATA", payload: data })
              }
            />
          }
        />
        <Route path="/cardDetail/:id" element={<CardDetail updateCartCount={updateCartCount}  setData={(data) =>
                dispatch({ type: "SET_DATA", payload: data })
              }
        currentPosts={currentPosts} cartCount={state.cartCount}/>} />
        <Route path="/form/*" element={<FormLayout />} />
        <Route
          path="/cart/*"
          element={<CartLayout cartCount={state.cartCount} 
          currentPosts={currentPosts} setData={(data) =>
            dispatch({ type: "SET_DATA", payload: data })} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function Home({
  updateCartCount,
  cartCount,
  currentPosts,
  setData,
  firstPostIndex,
  lastPostIndex
}) {
  return (
    <div>
      <Navbar cartCount={cartCount} />
      <ImageSlider />
      <Card
        updateCartCount={updateCartCount}
        currentPosts={currentPosts}
        setData={setData}
        firstPostIndex={firstPostIndex}
        lastPostIndex={lastPostIndex}
      />

    </div>
  );
}

function FormLayout() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
    </Routes>
  );
  }

function CartLayout({ cartCount, currentPosts,setData }) {
  const cart = currentPosts.filter((product) => product.inCart);
  console.log("Cart items:", cart);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Routes>
        {(cart.length > 0) ? (
          <Route path="/" element={<CartItems cart={cart} currentPosts={currentPosts} setData={setData} />} />
        ):"no cart"}:
      </Routes>
    </>
  );
}


