import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopDataContext } from "../context/ShopContext";
import Card from "./Card";

function BestSeller() {
  let { products } = useContext(ShopDataContext);
  let [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    let filterProduct = products.filter((item) => item.bestsller);
    setBestSeller(filterProduct.slice(0, 4));

    //console.log("bestseller" + products.data);
  }, [products]);
  return (
    <div>
      <div className="h-[8%] w-[100%] text-center mt-[50px]">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Tried, Tested, Loved Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {bestSeller.map((item, index) => {
          return (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BestSeller;
