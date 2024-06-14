import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const Productshow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const  {products}  = location.state;
  console.log(products);
   if (!products || products.length === 0) {
    return (
      <Layout>
        <div className="text-center mt-8">No products available</div>
        <button 
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      <button 
        className=" text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => navigate('/')}
      >
        <i className="ri-arrow-left-circle-fill text-4xl"></i>
      </button>
      <div className="flex flex-wrap gap-8  p-4">
      {products.map((prod, index) => (
        <Link 
          to={'/singleproduct'} 
          state={{ product: prod }} 
          key={index} 
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out p-2 w-[300px] h-[500px] "
        >
          <img src={prod.imageUrl} className="w-full h-96 object-cover rounded-t-lg" alt={prod.title} />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{prod.title}</h3>
            <p className="text-lg font-bold text-indigo-600">${prod.price}</p>
          </div>
        </Link>
      ))}
    </div>
    </Layout>
  );
};

export default Productshow;
