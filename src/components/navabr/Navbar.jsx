import React, { useState, useEffect, useContext } from "react";
import Dropdown from "../dropdown/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/data/Mycontext";

function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const context = useContext(MyContext);
  const { setproducturl, cartproduct, allproducts, cartlength } = context;
  const navigate = useNavigate();

  useEffect(() => {
    setproducturl(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const flattenedProducts = allproducts.reduce((acc, curr) => {
      return [...acc, ...curr.products];
    }, []);

    const filteredData = flattenedProducts.filter((product) => {
      const lowerCaseText = searchText.toLowerCase();
      return (
        product.category.toLowerCase().includes(lowerCaseText) ||
        product.title.toLowerCase().includes(lowerCaseText) ||
        product.subcategory.toLowerCase().includes(lowerCaseText)
      );
    });
    setFilteredProducts(filteredData);
  }, [searchText, allproducts]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/";
  };

  return (
    <>
      <div className="bg-red-600 max-md:justify-center max-md:w-full text-white pl-3 h-[34px] items-center font-semibold flex px-6  ">
        <h1>
          <a href="/home">The DP Store</a>
        </h1>
        <div className="gap-2 ml-[-20%] flex flex-wrap md:ml-[130px] md:gap-4">
          <h3
            className="hover:bg-white max-md:border hover:text-red-600 transition-colors duration-200 px-2 py-1 cursor-pointer"
            onClick={() => setSelectedCategory("Men")}
          >
            MEN
          </h3>
          <h3
            className="hover:bg-white max-md:border hover:text-red-600 transition-colors duration-200 px-2 py-1 cursor-pointer"
            onClick={() => setSelectedCategory("Women")}
          >
            WOMEN
          </h3>
          <h3
            className="hover:bg-white max-md:border hover:text-red-600 transition-colors duration-200 px-2 py-1 cursor-pointer"
            onClick={() => setSelectedCategory("Kids")}
          >
            KIDS
          </h3>
          {user?.user?.email === "admin@gmail.com" && (
            <div className="flow-root">
              <Link to={"/dashboard"} className="block p-2 font-medium  text-white">
                Admin
              </Link>
            </div>
          )}
          
        </div>
        {/* <div className="">
           <i class=" ri-menu-unfold-4-line"></i> 
        </div> */}
      </div>

      <div className="flex flex-col md:flex-row items-center px-2 justify-between">
        <Dropdown />
        <ul className="flex flex-col md:flex-row gap-2 md:gap-4 items-center text-lg md:text-xl mt-2 md:mt-0">
          <div className="relative text-sm w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 mr-2 border border-gray-300 rounded transition-all duration-300 transform w-full md:w-auto"
              onChange={handleSearchChange}
            />
            <i className="ri-search-line hover:text-red-500 duration-100" />
            {searchText && (
              <div className="absolute bg-white border w-full md:w-[120%] border-gray-300 mt-1 rounded max-h-72 overflow-y-auto z-10">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/singleproduct/`}
                    state={{ product: product }}
                    className="no-underline text-black"
                  >
                    <div className="px-2 py-1 flex hover:bg-gray-200 font-semibold text-[14px] border items-center cursor-pointer">
                      <img
                        src={product.imageUrl}
                        className="h-16 w-16 rounded-full object-cover object-top mr-3"
                        alt={product.title}
                      />
                      {product.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to={"/cart"} className="flex items-center relative ml-2">
            <i className="ri-handbag-line" />
            <div className="bg-red-500 top-[-2px] left-[5px] text-sm absolute text-white w-4 h-4 flex justify-center items   center rounded-full ml-1">
              {cartlength.length}
            </div>
          </Link>
          <li className="ml-2">
            <i className="ri-red-packet-fill" />
          </li>
          <li className="ml-2">
            <button onClick={logout} className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-[15px]">
              Log out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

