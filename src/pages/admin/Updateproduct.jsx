import React, { useState } from "react";
import { set, ref, getDatabase, push, update } from "firebase/database";
import { appfb } from "../../firebase/firebase";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

function Updateproduct() {
    const location = useLocation();
    const { product } = location.state || {};
    console.log(product);
  console.log(product.id);
    if (!product) {
      return <div>No product data available</div>;
    }
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [subcategory, setSubcategory] = useState(product.subcategory);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [imageUrl2, setImageUrl2] = useState(product.imageUrl2);

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
   };
  const secondImageChange = (e) => {
    setImageUrl2(e.target.value);
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !category || !subcategory || !imageUrl) {
      alert("Please fill all the fields and provide an image URL");
      return;
    }

    const db = getDatabase(appfb);
    try {
      const productRef = ref(db, `${category}/${subcategory}/${product.id}`);

      await update(productRef, {
        title: title,
        price: price,
        imageUrl: imageUrl,
        imageUrl2: imageUrl2,
      });

      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
};
const navigate = useNavigate()

  
  return (
      <div className="container mx-auto p-4">
    <button 
        className=" text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => navigate('/')}
      >
        <i className="ri-arrow-left-circle-fill text-4xl"></i>
      </button>      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            value={category} disabled
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Men" >Men</option>
            <option value="Women" >Women</option>
            <option value="Kids" >Kids</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subcategory
          </label>
          <select disabled
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {category === "Men" && (
              <>
                <option value="Oversized T-shirt">Oversized T-Shirt</option>
                <option value="T-shirt">T-Shirt</option>
                <option value="Cargo Pants">Cargo Pants</option>
                <option value="Joggers">Joggers</option>
                <option value="Swetshirts">Swetshirts</option>
                <option value="Shirt">Shirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Sneaker">Sneaker</option>
              </>
            )}
            {category === "Women" && (
              <>
                <option value="Dress">Dress</option>
                <option value="Top">Top</option>
                <option value="Shoe">Shoe</option>
              </>
            )}
            {category === "Kids" && (
              <>
                <option value="Toy">Toy</option>
                <option value="Clothing">Clothing</option>
                <option value="Book">Book</option>
              </>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
                    placeholder="Image Url Only Paste"
            type="url"
            value={imageUrl}
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
           Second Image URL
          </label>
          <input
          placeholder="Image Url Only Paste"
            type="url"
            value={imageUrl2}
            onChange={secondImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Updateproduct;
