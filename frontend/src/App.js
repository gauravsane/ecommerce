import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import { Footer } from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png"
import Contact from "./Components/Contact/Contact";
import FadeLoader from "react-spinners/FadeLoader";
import './App.css';
import Login from "./Pages/Login";

function App() {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
    {
      loading ? (
        <div className="loader"> 
        <FadeLoader
        color={'gray'}
        loading={loading}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
       
      )
      :
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<LoginSignup />}/>
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid"/>}/>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />}/>
          </Route>
          {/* {localStorage.getItem('user') ? <Route path="/cart" element={<Cart />}/> : alert('Login First')} */}
          <Route path="/cart" element={<Cart />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    }
    </div>
  );
}

export default App;
