import React, { useContext } from 'react';
import "./RelatedProducts.css";
import data_product from "../Assets/data"
import Item from "../Item/Item"
import { ShopContext } from '../../Context/ShopContext';

const RelatedProducts = () => {
  const {data} = useContext(ShopContext)
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
      {data.map((item,i)=>{
        if(i > 9  && i < 14){
        return(
          <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        
        )
        }
      })}
      </div>
    </div>
  )
}

export default RelatedProducts
