import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/data/Mycontext";
import Layout from "../../components/layout/Layout";

function Cart() {
  const { cartproduct, setCartproduct } = useContext(MyContext);
  const [product, setProduct] = useState(cartproduct); 

  const handleRemoveProduct = (index) => {
    // const updatedProducts = product.filter((_, i) => i !== index);
    // setProduct(updatedProducts);
    // if (updatedProducts.length === 0) {
    //   localStorage.removeItem("cartproduct");
    // }
  };

  const handleQuantityChange = (index) => {
    console.log(index);
    // const updatedProducts = product.map((product, i) =>
    //   i === index ? { ...product, quantity: Math.max(1, product.quantity + delta) } : product
    // );
    // setProduct(updatedProducts);
  };

  const taxRate = 0.08;
  const calculateTax = (price) => (price * taxRate).toFixed(2);
  // const totalPrice = products.reduce((total, product) => total + product.item.price * product.quantity, 0);
  // const totalDiscount = products.reduce((total, product) => total + product.discount * product.quantity, 0);
  // const totalTax = products.reduce((total, product) => total + parseFloat(calculateTax(product.item.price * product.quantity)), 0);
  // const totalAmount = totalPrice - totalDiscount + totalTax;

  if (!product) {
    return <Layout><div>Loading...</div></Layout>;
  }

  
  return (
    <Layout>
      <div className="flex flex-wrap min-h-screen">
        <div className="w-2/3 p-2">
          <h1 className="w-full text-center text-2xl font-bold m-5">Your Cart</h1>
          {console.log(product)}
         
            <div className="flex items-center w-full p-2 rounded-lg border mb-4">
              <h1>{product.size}</h1>
              <div>
                <img src={product.item.imageUrl} alt={product.item.title} className="w-36 h-full object-cover" />
              </div>
              <div className="ml-4 mr-2 w-full">
                <div className="flex gap-6 justify-between">
                  <h3 className="text-xl font-semibold">{product.item.title}</h3>
                  <h3 className="text-lg font-medium text-gray-700">₹{product.item.price}</h3>
                </div>
                <div className="flex gap-4 mt-4">
                  <p className="text-gray-600">{product.item.subcategory}</p>
                  <ul className="list-none">
                    <li>
                      <span className="font-semibold">Size: </span>
                      <span className="border-black border px-2 py-0.5 rounded-md bg-gray-100">{product.size}</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 gap-4 flex">
                  <p>Price: ₹{product.item.price}</p>
                  <p className="text-red-500 font-medium">Discount: ₹{product.discount}</p>
                </div>
                <div className="flex justify-between items-center mt-4 space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(product.quantity -1)}
                      className="bg-red-500 text-white text-[18px] px-2 py-0.5 rounded"
                      disabled={product.quantity === 1}
                    >
                      -
                    </button>
                    <p className="border text-gray-700 text-[18px] px-2 py-0.5 rounded">{product.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(product.quantity +1)}
                      className="bg-red-500 text-white px-2 py-0.5 text-[18px] rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct()}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <i className="ri-delete-bin-5-fill"></i>
                  </button>
                </div>
              </div>
            </div>
         
        </div>
        <div className="w-1/3 p-4">
          <div className="container mx-auto p-4 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Delivery</h3>
            <form>
              <input
                type="text"
                placeholder="Name"
                required
                className="block w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Address"
                required
                className="block w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Pincode"
                required
                className="block w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="City"
                required
                className="block w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="State"
                required
                className="block w-full p-2 mb-4 border rounded"
              />
              <input
                type="tel"
                placeholder="Phone No."
                required
                className="block w-full p-2 mb-4 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="block w-full p-2 mb-4 border rounded"
              />
              {/* <table className="w-full mb-4 text-left">
                <thead>
                  <tr>
                    <th className="py-2">Subtotal:</th>
                    <th className="py-2 text-right">₹{totalPrice.toFixed(2)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Discount:</td>
                    <td className="py-2 text-right">₹{totalDiscount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Delivery:</td>
                    <td className="py-2 text-right text-red-500 font-bold">Free</td>
                  </tr>
                  <tr>
                    <td className="py-2">Tax 8%:</td>
                    <td className="py-2 text-right">₹{totalTax.toFixed(2)}</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-2">Total:</td>
                    <td className="py-2 text-right">₹{totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table> */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4"
              >
                Proceed to checkout
              </button>
              <button
                type="button"
                className="w-full bg-gray-300 text-black py-2 px-4 rounded"
              >
                Continue Shopping
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
