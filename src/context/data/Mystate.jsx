import React, { useState } from "react";
import MyContext from "./Mycontext";

function Mystate(props) {
  const [allproducts, setallProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [producturl, setproducturl] = useState("");
  const [cartproduct, setcartproduct] = useState("");
  // it can stre all product
  const addProduct = (newProduct) => {
    setallProducts(newProduct);
  };
  const alldetailproduct = (item, size, quantity, discount) => {
    setcartproduct({
      item,
      size,
      quantity,
      discount,
    });
  };
  return (
    <>
      <MyContext.Provider
        value={{
          allproducts,
          setallProducts,
          selectedItem,
          setSelectedItem,
          addProduct,
          setproducturl,
          producturl,
          alldetailproduct,
          cartproduct
        }}
      >
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export default Mystate;
