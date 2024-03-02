import React, { useContext } from 'react';
import "./Popular.css";
import data_product from '../Assets/data'
import { Item } from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

export const Popular = () => {
  const {data} = useContext(ShopContext)
  return (
    <div className='popular'>
    <h1>POPULAR IN MEN</h1>
    <hr />
    <div className="popular-item">
      {data.map((item,i)=>{
        if(i > 4  && i < 9){
        return(
          <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        )
        }
      })}
    </div>
    </div>
  )
}
