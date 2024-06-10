import React, { useState } from "react";
import { set, ref, getDatabase, push } from "firebase/database";
import { appfb } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

function AddProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("T-shirt");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");

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
      const productRef = ref(db, `${category}/${subcategory}/` )
      // it can create unique id 
      const newProductRef = push(productRef);

      await set(newProductRef, {
        title: title,
        price: price,
        category: category,
        subcategory: subcategory,
        imageUrl: imageUrl,
        imageUrl2: imageUrl2,
        id:newProductRef.key,
        data:new Date().toLocaleDateString()

      });
      alert("Product added successfully");
      console.log("Product added: ", { title, price, category, subcategory, imageUrl });
      
    } catch (error) {
      console.error("Error adding product: ", error);
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
      </button>   
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
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
            value={category}
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
          <select
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
                <option value="Oversized T-shirt">Oversized T-Shirt</option>
                <option value="CO-ORD SETS">CO-ORD SETS</option>
                <option value="Cargo Pants& Joggers">Cargo Pants & Joggers </option>
                <option value="Jeans">Jeans </option>
                <option value="Tops">Tops</option>
                <option value="Dresses">Dresses</option>
                <option value="Shirt">Shirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Sneaker">Sneaker</option>
              
              </>
            )}
            {category === "Kids" && (
              <>
                <option value="Boys T-shirts">Boys T-shits</option>
                <option value="Girls T-shirts">Girls T-shits</option>
               
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

export default AddProductForm;
