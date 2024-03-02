import React, {useContext} from 'react'
import "./NewCollection.css";
import Item from "../Item/Item"
import { ShopContext } from '../../Context/ShopContext';

export const NewCollection = () => {

  const {data} = useContext(ShopContext)
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
      {data.map((item,i)=>{
        if(i > 7 && i < 16){
        return(
          <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        )
        }
      })}
      </div>
    </div>
  )
}
