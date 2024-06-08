import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const Productshow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const  {products}  = location.state;
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
      <div className="flex gap-8 p-4">
        {products.map((prod, index) => (
          <Link  to={'/singleproduct'} state={{ product: prod}} key={index} className="bg-gray-300">
            <img src={prod.imageUrl} className="w-[300px] " alt={prod.title} />
            <h3>{prod.title}</h3>
            <p>{prod.price}</p>
            
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Productshow;
