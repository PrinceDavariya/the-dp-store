import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import MyContext from "../../context/data/Mycontext";

const SingleProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  if (!product) {
    return (
      <Layout>
        <div className="text-center mt-8">No product details available</div>
        <button
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </Layout>
    );
  }

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("L");
  const [discount, setDiscount] = useState("100");

  const { alldetailproduct } = useContext(MyContext);

  const handleSize = (size) => {
    setSize(size);
  };

  const handleOrder = (item) => {
    if (!size) {
      alert('Please select a size.');
      return;
    }
    alldetailproduct(item, size, quantity, discount);
    navigate('/cart');
  };

  return (
    <Layout>
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => navigate(-1)}
      >
        <i className="ri-arrow-left-circle-fill text-4xl"></i>
      </button>
      <div className="p-4 flex flex-col md:flex-row gap-6">
        <div className="flex gap-5 w-full md:w-1/2 overflow-hidden">
          <div className="relative w-full h-[500px] bg-black overflow-hidden group">
            <img
              src={product.imageUrl}
              className="w-full h-full object-cover"
              alt={product.title}
            />
          </div>
          <div className="relative w-full h-[500px] bg-black overflow-hidden group">
            <img
              src={product.imageUrl2}
              className="w-full h-full object-cover"
              alt={product.title}
            />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <h3 className="text-3xl font-semibold mt-4">{product.title}</h3>
          <h4 className="text-xl text-gray-500 mt-2">{product.subcategory}</h4>
          <hr className="my-4" />
          <p className="text-2xl font-semibold ">₹{product.price}</p>
          <p className="mt-4 text-gray-700">MRP incl. of all taxes</p>
          <p className="mt-4 text-red-600 font-bold"> Discount: {discount}₹ </p>
          <div className="flex gap-3 mt-4">
            {["M", "L", "XL", "XXL"].map((s) => (
              <button
                key={s}
                className={`px-2 py-1 border rounded-sm cursor-pointer transition-colors ${
                  size === s ? "bg-blue-500 text-white" : "bg-gray-100"
                } hover:bg-blue-200`}
                onClick={() => handleSize(s)}
                aria-pressed={size === s}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-4">
            Quantity
            <select
              name="Quantity"
              className="ml-2 rounded-lg py-0.5"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <div className="mt-4">
              <button
                className="bg-[#ec3d25] rounded-md py-2 font-semibold text-white text-sm px-10"
                onClick={() => handleOrder(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
