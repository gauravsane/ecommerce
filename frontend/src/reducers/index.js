import { actionTypes } from "../types";
import toast, { Toaster } from "react-hot-toast";

const initProducts = [];
const initialState = {
  products: initProducts,
  cartItems: [],
  // wishlists: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addToCart:
      let filProduct = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      // let filWishlist2 = state.wishlists.filter(item => item.id !== action.payload.id)
      toast.success("Add to cart successfully");
      <Toaster />;
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        products: filProduct,
      };

    case actionTypes.removeFromCart:
      let filData = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      action.payload.product_qty = 1;
      toast.error("Remove from cart successfully");
      <Toaster />;
      return {
        ...state,
        cartItems: filData,
        products: [...state.products, action.payload],
      };

    case actionTypes.addItemQty:
      // let addItem = [];
      const temp = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
        }
        return item;
      });

      return {
        ...state,
        cartItems: temp,
      };

    case actionTypes.removeItemQty:
      const temp1 = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          // if(item.quantity === 0){
          //   item.quantity = 1
          // }
          item.quantity -= 1;
        }
        return item;
      });
      return {
        ...state,
        cartItems: temp1,
      };

      case actionTypes.cartTotalItem:
        let total_price = state.cartItems.reduce((initialVal, curElem) =>{
          let { price,quantity } = curElem;

          initialVal = initialVal + price * quantity;
          return initialVal;
        }, 0)
        console.log(total_price);
        return {
          ...state,
          total_price: total_price,
        };
    default:
      return state;
  }
};

export default cartReducer;
