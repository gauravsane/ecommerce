import React from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { useDispatch, useSelector } from "react-redux";
import { addItemQty, addToCart } from "../../actions";

const ProductDisplay = (props) => {
  const d=useSelector((state)=>state.cartItems)
  // console.log(d);
  const dispatch=useDispatch()
  const { product } = props;

  const AddToCart = () =>{
    dispatch(addToCart({id: product._id,name: product.name, image: product.image, price: product.new_price, quantity: product.quantity
    }));
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ₹{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum mollitia totam id provident fugiat in?
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={AddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span>Women, T-Shirt, Crop-Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
