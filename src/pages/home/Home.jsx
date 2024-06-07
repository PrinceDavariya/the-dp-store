import React, { useContext } from "react";
import MyContext from "../../context/data/Mycontext";
import Navbar from "../../components/navabr/Navbar";
import Footer from "../../components/Footer/Footers";
import Allproduct from "../allproducts/Allproduct";
 
function Home() {
  const context = useContext(MyContext);
   return (
    <>
      <Navbar></Navbar>
    <div className="">
      <Allproduct></Allproduct>
    </div>
    <Footer></Footer>
 
    </>
  )

}

export default Home;
