import React, { useCallback, useEffect, useState } from "react";
import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemQty,
  cartTotalItem,
  removeFromCart,
  removeItemQty,
} from "../../actions";
const CartItems = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  // console.log(cart);
  const cartTotalItem1 = useSelector(
    (total_price) => total_price.cart.total_price
  );
  console.log("total price", cartTotalItem1);
  const dispatch = useDispatch();

  const handleCheckOut = () => {};

  useEffect(() => {
    dispatch(cartTotalItem());
  });

  // const callback = useCallback(() => {
  //   return dispatch(cartTotalItem());
  // }, [cartTotalItem]);
  // callback();

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cart?.map((e) => {
        if (e.id) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img className="carticon-product-icon" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>₹{e.price}</p>
                <div className="cartitems-quantity">
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={() => dispatch(addItemQty({ id: e.id }))}
                  >
                    +
                  </button>
                  {e.quantity}
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => dispatch(removeItemQty({ id: e.id }))}
                  >
                    -
                  </button>
                </div>
                <p>₹{e.quantity * e.price}</p>
                <img
                  className="cartitems-remove-icon"
                  onClick={() => dispatch(removeFromCart({ id: e.id }))}
                  src={remove_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      {/* <button onClick={() => dispatch(cartTotalItem())}>Calculate</button> */}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{cartTotalItem1 ? cartTotalItem1 : 0}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              {cartTotalItem1 ? cartTotalItem1 : 0}
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button onClick={handleCheckOut}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

// {cart.map((e) => {
//   return (
//     <div className="cartitems-down">
//       <div className="cartitems-total">
//         <h1>Cart Totals</h1>
//         <div>
//           <div className="cartitems-total-item">
//             <p>Subtotal</p>
//             <p>{e.price}</p>
//             {/* <p>${getTotalCartAmount()}</p> */}
//           </div>
//           <hr />
//           <div className="cartitems-total-item">
//             <p>Shipping Fee</p>
//             <p>Free</p>
//           </div>
//           <hr />
//           <div className="cartitems-total-item">
//             <h3>Total</h3>
//             {e.price}
//             {/* <h3>${getTotalCartAmount()}</h3> */}
//           </div>
//         </div>
//         <button>PROCEED TO CHECKOUT</button>
//       </div>
//       <div className="cartitems-promocode">
//         <p>If you have a promo code, Enter it here</p>
//         <div className="cartitems-promobox">
//           <input type="text" placeholder="promo code" />
//           <button>Submit</button>
//         </div>
//       </div>
//     </div>
//   )
// })}
