import React, { useContext, useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { appfb } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/data/Mycontext";

const Dropdown = () => {
  const context = useContext(MyContext);
  const { producturl } = context;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(producturl);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCategory(producturl);
  }, [producturl]);

  const categories = (() => {
    switch (selectedCategory) {
      case "Men":
        return [
          {
            name: "TOPWEAR",
            items: [
              "Oversized T-shirt",
              "T-shirt",
              "Shirt",
              "Jacket",
              "Hoodies",
              "Sweatshirts",
            ],
          },
          {
            name: "BOTTOMWEAR",
            items: ["Cargo Pants", "Jeans", "Joggers", "Shorts"],
          },
          {
            name: "SNEAKERS",
            items: ["Sneaker"],
          },
        ];
      case "Women":
        return [
          {
            name: "BOTTOMWEAR",
            items: ["Cargo Pants & Joggers", "Jeans"],
          },
          {
            name: "TOPWEAR",
            items: ["Dresses", "T-shirt", "Shirt"],
          },
          {
            name: "SNEAKERS",
            items: ["Sneaker"],
          },
        ];
      case "Kids":
        return [
          {
            name: "Boys",
            items: ["Boys T-shirts"],
          },
          {
            name: "Girls",
            items: ["Girls T-shirsts"],
          },
          ];
      default:
        return [];
    }
  })();
  

  const handleItemClick = async (item) => {
    setLoading(true);
    const db = getDatabase(appfb);
    const categoriesRef = ref(db, `${selectedCategory}/${item}`);

    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.values(data)); // Convert object to array of values
        navigate("/productshow", { state: { products: Object.values(data) } });
      } else {
        console.error("No data available.");
      }
      setLoading(false);
    });
  };

  return (
    <div className="flex w-[30%] max-md:w-full">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative inline-block"
          onMouseEnter={() => setHoveredCategory(category.name)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div
          
            className="text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-2 text-center inline-flex items-center"
            type="button"
            onClick={() => setSelectedCategory(category.name)}
            
          >
            {category.name}
            <i className="ri-arrow-drop-down-line ml-1 text-2xl"></i>
          </div>
          {hoveredCategory === category.name && (
            <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left focus:outline-none"
                      onClick={() => handleItemClick(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
