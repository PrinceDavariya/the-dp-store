import React, { useState } from "react";
import MyContext from "./Mycontext";

function Mystate(props) {
  const [allproducts, setallProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [producturl, setproducturl] = useState("");
  const [cartproduct, setCartproduct] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState([])
  const [cartlength, setcartlength] = useState('')
// it can save order detail for admin
 const [orederdetail, setorederdetail] = useState([])
 const [loading, setLoading] = useState(true);

  // it can st0re all product
  const addProduct = (newProduct) => {
    setallProducts(newProduct);
  };
  const alldetailproduct = (item, size, quantity, discount) => {
    setCartproduct({
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
          cartproduct,setCartproduct,setDeliveryDetails,setorederdetail
          ,setcartlength,cartlength,deliveryDetails,orederdetail,loading,setLoading
        }}
      >
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export default Mystate;
