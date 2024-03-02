// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

// const ShopCategory = () => {
//   const [data, setData] = useState([]);

//   const[serch,setsearch]=useState("");

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((json) => setData(json));
//   }, []);
  
//   const handleClick=()=>{
//     const temp=data.filter((data)=>data.title.toLowerCase().includes(serch.toLowerCase()))
//     setData(temp)

//   }
//   return (
//     <>

//     <input type="text" onChange={(e)=>setsearch(e.target.value)} />
//     <button onClick={handleClick}>Search</button>
//     <div className="container">
//       <div className="row parent">
//         {data.map((dataObj, index) => {
//           return (
//             <div className="col-4  mt-4">
//               <Card style={{ width: "24rem", height: "24rem" }}>
//                 <Card.Img
//                   style={{ width: "14rem", height: "14rem" }}
//                   variant="top"
//                   src={dataObj.image}
//                 />
//                 <Card.Body>
//                   <Card.Title>{dataObj.title}</Card.Title>
//                   {/* <Card.Text>
//                 {dataObj.description}
//               </Card.Text> */}
//                   <Button variant="primary">
//                     Buy<Card.Text>{dataObj.price}</Card.Text>
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//     </>

//   );
// };

// export default ShopCategory;


import React, { useContext, useEffect, useState } from 'react';
import "./Css/ShopCategory.css"
import {ShopContext} from "../Context/ShopContext"
import dropdown_icon from "../Components/Assets/dropdown_icon.png"
import Item from "../Components/Item/Item";
import BounceLoader from "react-spinners/FadeLoader";

const ShopCategory = (props) => {
  const [temp, setTemp] = useState([])
  const {data} = useContext(ShopContext);
  const [loading , setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setTemp(data);
      setLoading(false)
    }, 1000);
    console.warn(data);
  },[])

  // const [data, setData] = useState([]);
  
  const[serch,setsearch]=useState("");

  //  useEffect(() => {
  //   fetch("http://localhost:3200/getdata")
  //     .then((res) => res.json())
  //     .then((json) => setData(json));
  // }, []);

  const handleClick=()=>{
        const temp=data.filter((data)=>data.name.toLowerCase().includes(serch.toLowerCase()))
        // console.log(temp);
        setTemp(temp)
  }
  const handleChange=(e)=>{
    setsearch(e.target.value)
    setTemp(data)
  }
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p className='outofproducts'>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <p className='searchSection'>
          <input className='m-3' type="text" onChange={(e)=>handleChange(e)}/>
          <button onClick={handleClick}>Search</button>
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {loading ? 
        <div className='loadingShop'>
        <BounceLoader
        color={'gray'}
        loading={loading}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
         : 
        <>
        {temp.map((item,i)=>{
          if (props.category === item.category){
            return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }  
        })}
        </>
        }
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory;
