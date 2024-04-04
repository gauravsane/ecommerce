// import React, { useContext, useEffect, useState } from "react";
// import "./Css/ShopCategory.css";
// import { ShopContext } from "../Context/ShopContext";
// import dropdown_icon from "../Components/Assets/dropdown_icon.png";
// import Item from "../Components/Item/Item";
// import BounceLoader from "react-spinners/FadeLoader";

// const ShopCategory = (props) => {
//   const [temp, setTemp] = useState([]);
//   const { data } = useContext(ShopContext);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setTemp(data);
//       setLoading(false);
//     }, 1000);
//     console.warn(data);
//   }, []);

//   // const [data, setData] = useState([]);

//   const [serch, setsearch] = useState("");

//   //  useEffect(() => {
//   //   fetch("http://localhost:3200/getdata")
//   //     .then((res) => res.json())
//   //     .then((json) => setData(json));
//   // }, []);

//   const handleClick = () => {
//     const temp = data.filter((data) =>
//       data.name.toLowerCase().includes(serch.toLowerCase())
//     );
//     // console.log(temp);
//     setTemp(temp);
//   };
//   const handleChange = (e) => {
//     setsearch(e.target.value);
//     setTemp(data);
//   };
//   return (
//     <div className="shop-category">
//       <img className="shopcategory-banner" src={props.banner} alt="" />
//       <div className="shopcategory-indexSort">
//         <p className="outofproducts">
//           <span>Showing 1-12</span> out of 36 products
//         </p>
//         <p className="searchSection">
//           <input
//             className="m-3"
//             type="text"
//             onChange={(e) => handleChange(e)}
//           />
//           <button onClick={handleClick}>Search</button>
//         </p>
//         <div className="shopcategory-sort">
//           Sort by <img src={dropdown_icon} alt="" />
//         </div>
//       </div>
//       <div className="shopcategory-products">
//         {loading ? (
//           <div className="loadingShop">
//             <BounceLoader
//               color={"gray"}
//               loading={loading}
//               size={70}
//               aria-label="Loading Spinner"
//               data-testid="loader"
//             />
//           </div>
//         ) : (
//           <>
//             {temp.map((item, i) => {
//               if (props.category === item.category) {
//                 return (
//                   <Item
//                     key={i}
//                     id={item._id}
//                     name={item.name}
//                     image={item.image}
//                     new_price={item.new_price}
//                     old_price={item.old_price}
//                   />
//                 );
//               } else {
//                 return null;
//               }
//             })}
//           </>
//         )}
//       </div>
//       <div className="shopcategory-loadmore">Explore More</div>
//     </div>
//   );
// };

// export default ShopCategory;

import React, { useContext, useEffect, useState } from "react";
import "./Css/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import BounceLoader from "react-spinners/FadeLoader";

const ShopCategory = (props) => {
  const { data } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [productsToShow, setProductsToShow] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    // Simulating API call delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const categoryProducts = data.filter((item) => item.category === props.category);
    const initialProductsToShow = categoryProducts.slice(0, 8);
    setProductsToShow(initialProductsToShow);
  }, [data, props.category]);

  const handleExploreMore = (event) => {
    setShowAllProducts(true);
    const scrollY = window.scrollY;
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 0);
  };

  const handleHideProducts = (event) => {
    setShowAllProducts(false);
    const scrollY = window.scrollY;
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 0);
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p className="outofproducts">
          <span>
            Showing {productsToShow.length} out of{" "}
            {data.filter((item) => item.category === props.category).length} products
          </span>
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {loading ? (
          <div className="loadingShop">
            <BounceLoader
              color={"gray"}
              loading={loading}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {productsToShow.map((item, i) => (
              <Item
                key={i}
                id={item._id}
                name={item.name}
                image={item.image}
                // image={item.image ? require(`../Images/${item.image}`) : ""}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))}
          </>
        )}
        {!loading && !showAllProducts && (
          <div className="d-flex justify-content-center">
            <div style={{ marginLeft: "300%" }}>
              <div
                className="shopcategory-loadmore mt-2"
                onClick={handleExploreMore}
              >
                Explore More
              </div>
            </div>
          </div>
        )}
        {showAllProducts && (
          <>
            {data
              .filter((item) => item.category === props.category)
              .slice(8)
              .map((item, i) => (
                <Item
                  key={i}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              ))}
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="shopcategory-loadmore mt-5"
                onClick={handleHideProducts}
              >
                Hide
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
