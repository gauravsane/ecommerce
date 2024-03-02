import React from 'react';
import "./Offeres.css";
import exclusive_image from "../Assets/exclusive1.png"

export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left col-lg-6 col-md-6 col-sm-12">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right col-lg-6 col-md-6 col-sm-12">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
//     <div class="container">
//     <div class="row">
//         <div class="col-lg-6 col-md-6 col-sm-12">
//             <div class="offers-left">
//                 <h1>Exclusive</h1>
//                 <h1>Offers For You</h1>
//                 <p>ONLY ON BEST SELLERS PRODUCTS</p>
//                 <button class="btn btn-primary">Check Now</button>
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6 col-sm-12">
//             <div class="offers-right">
//                 <img src={exclusive_image} alt="" class="img-fluid" />
//             </div>
//         </div>
//     </div>
// </div>

  )
}
