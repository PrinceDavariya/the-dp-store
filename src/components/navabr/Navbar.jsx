import React, { useState, useEffect, useContext } from "react";
import Dropdown from "../dropdown/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/data/Mycontext";

function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [searchText, setSearchText] = useState(''); // New state for search text
  const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products

  // context

  const context = useContext(MyContext);
  const { setproducturl, cartproduct, allproducts, cartlength } = context;
  const navigate = useNavigate();
  useEffect(() => {
    // navigate('/')
    setproducturl(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
     const flattenedProducts = allproducts.reduce((acc, curr) => {
      return [...acc, ...curr.products];
    }, []);
  
  
    // Update filtered products based on search text
    const filteredData = flattenedProducts.filter((product) => {
      const lowerCaseText = searchText.toLowerCase();
      return (
        product.category.toLowerCase().includes(lowerCaseText) ||
        product.title.toLowerCase().includes(lowerCaseText) ||
        product.subcategory.toLowerCase().includes(lowerCaseText)
      );
    });
    setFilteredProducts(filteredData);
  }, [searchText]);
  
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="bg-red-600 text-white pl-3 h-[34px] items-center font-semibold flex">
        <h1>
          <a href="/">The DP Store</a>
        </h1>
        <div className="ml-[130px] gap-4 flex">
          <h3
            className="hover:bg-white hover:text-red-600 transition-colors duration-200 px-2 py-1 cursor-pointer"
            onClick={() => setSelectedCategory("Men")}
          >
            MEN
          </h3>
          <h3
            className="hover:bg-white hover:text-red-600 transition-colors duration-200 px-2 py-1 cursor-pointer"
            onClick={() => setSelectedCategory("Women")}
          >
            WOMEN
          </h3>
          <h3
            className="hover:bg-white hover:text-red-600 transition-colors duration-200 px-2 py-1 cursor-pointer"
            onClick={() => setSelectedCategory("Kids")}
          >
            KIDS
          </h3>
          <Link
            to={"/dashboard"}
            className="hover:bg-white hover:text-red-600 transition-colors duration-200 px-2 py-1"
          >
            ADMIN
          </Link>
        </div>
      </div>

      <div className="flex items-center px-2 justify-between">
        <Dropdown />
        <ul className="flex gap-4 items-center text-xl">
       <div className="h-[20px] text-sm">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 mr-2 border border-gray-300 rounded transition-all duration-300 transform 
               "
              onChange={handleSearchChange}
            />
            <i className="ri-search-line hover:text-red-500 duration-100" />
               {filteredProducts.map((product) => (
            <li key={product.id}>{product.title}
            </li>
          ))}          
          </div>
          <li>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/the-dm-store.appspot.com/o/k%2FScreenshot%20(4).png?alt=media&token=0ef67359-ad7f-4585-88db-a5f8d8475c93"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </li>
          <li className="ml-2">
            <i className="ri-heart-3-line" />
          </li>
          <Link to={"/cart"} className="flex items-center relative ml-2">
            <i className="ri-handbag-line" />
            <div className="bg-red-500 top-[-2px] left-[5px] text-sm absolute text-white w-4 h-4 flex justify-center items-center rounded-full ml-1">
              {cartlength.length}
            </div>
          </Link>
          <li className="ml-2">
            <i className="ri-red-packet-fill" />
          </li>
          <li className="ml-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-[15px]">
              Log out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
