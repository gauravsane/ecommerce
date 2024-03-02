import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { useSelector } from "react-redux";
import { IoMdContact } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';


const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  const cart = useSelector((state) => state.cartItems);
  // console.log(cart.length);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  let val = localStorage.getItem('user');
  let object = JSON.parse(val);
  let username = object?.username
  // console.log(object.username);

  const logout = () =>{
    if(localStorage.getItem('user')){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    alert('Logout Successfully')
    }
    else{
      alert('Login first')
    }
  };

  const handleClick = () =>{
    if(localStorage.getItem('token')){
      navigate('/cart')
    }
    else{
      alert('Login first')
    }
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Shopping</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kid
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contact");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/contact">
            Contact us
          </Link>
          {menu === "contact" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <IoMdContact size="30px" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>User: {username ? username : <span>No User</span>}</Dropdown.Item>
            <Dropdown.Item><button onClick={()=>navigate('/login')}>Login</button></Dropdown.Item>
            <Dropdown.Item><button onClick={logout}>Logout</button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <h1>{location.state?.id}</h1> */}
        <img onClick={handleClick} src={cart_icon} alt="" />
          
        
        <div className="nav-cart-count">{cart.length}</div>
      </div>

      <div className="btnScreen">
        <button onClick={toggleDrawer}>Show</button>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        <ul className="nav-menu1">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("mens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/mens">
              Men
            </Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/womens">
              Women
            </Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
              Kid
            </Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("contact");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/contact">
              Contact us
            </Link>
            {menu === "contact" ? <hr /> : <></>}
          </li>
        </ul>
      </Drawer>
    </div>
  );
};

export default Navbar;
