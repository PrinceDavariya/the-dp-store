import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/data/Mycontext";
import Layout from "../../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getDatabase, push, ref, set } from "firebase/database";
import { appfb } from "../../firebase/firebase";

function Cart() {
  const {
    cartproduct,
    setCartproduct,
    setDeliveryDetails,
    setorederdetail,
    setcartlength,
  } = useContext(MyContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("cartproduct");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  // Ensure local storage is updated whenever products change
  useEffect(() => {
    if (!orderPlaced) {
      localStorage.setItem("cartproduct", JSON.stringify(products));
    }
  }, [products, orderPlaced]);

  // Ensure products are updated when cartproduct changes
  useEffect(() => {
    if (cartproduct && cartproduct.item && cartproduct.item.title) {
      setProducts((prevProducts) => {
        const existingProductIndex = prevProducts.findIndex(
          (product) =>
            product.item.title === cartproduct.item.title &&
            product.size === cartproduct.size
        );

        if (existingProductIndex !== -1) {
          // If the product with the same title and size exists, update the quantity
          const updatedProducts = [...prevProducts];
          updatedProducts[existingProductIndex].quantity += cartproduct.quantity;
          return updatedProducts;
        } else {
          // If the product with the same title and size doesn't exist, add it to the cart
          return [...prevProducts, cartproduct];
        }
      });
    }
  }, [cartproduct]);

  useEffect(() => {
    setcartlength(products);
  }, [products]);

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    setCartproduct(updatedProducts);
    localStorage.setItem("cartproduct", JSON.stringify(updatedProducts));
    toast.success("Item Remove Successfully");
  };

  const handleQuantityChange = (index, delta) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity: Math.max(1, product.quantity + delta) } : product
    );
    setProducts(updatedProducts);
    setCartproduct(updatedProducts);
  };

  const taxRate = 0.08;
  const calculateTax = (price) => (price * taxRate).toFixed(2);

  const totalPrice = products.reduce((total, product) => total + product.item.price * product.quantity, 0);
  const totalDiscount = products.reduce((total, product) => total + product.discount * product.quantity, 0);
  const totalTax = products.reduce((total, product) => total + parseFloat(calculateTax(product.item.price * product.quantity)), 0);
  const totalAmount = totalPrice - totalDiscount + totalTax;

  // State variables to hold delivery details
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSaveDeliveryDetails = async (e) => {
    e.preventDefault();
    const deliveryInfo = {
      name,
      address,
      pincode,
      city,
      state,
      phone,
      email,
    };
    const orderInfo = {
      deliveryInfo,
      products,
      totalPrice,
      totalDiscount,
      totalTax,
      totalAmount,
    };
    setorederdetail(orderInfo);
    setDeliveryDetails(deliveryInfo);

    // Save data to Firebase
    const db = getDatabase(appfb);
    const newOrderRef = push(ref(db, 'orders'));
    set(newOrderRef, orderInfo)
      .then(() => {
        toast.success("Your Order Confirmed");
        localStorage.removeItem("cartproduct");
        setOrderPlaced(true);
        // Navigate to home after a brief delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error saving data to Firebase: ", error);
        toast.error("Failed to confirm order. Please try again.");
      });
  };

  if (products.length === 0) {
    return (
      <Layout>
        <div className="w-full h-screen flex m-auto items-center justify-center text-4xl font-bold">
          Your cart is empty
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="flex flex-wrap min-h-screen">
        <div className="w-2/3 p-2">
          <h1 className="w-full text-center text-2xl font-bold m-5">
            Your Cart
          </h1>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center w-full p-2 rounded-lg border mb-4"
            >
              <div>
                <img
                  src={product.item.imageUrl}
                  alt={product.item.title}
                  className="w-36 h-full object-cover"
                />
              </div>
              <div className="ml-4 mr-2 w-full">
                <div className="flex gap-6 justify-between">
                  <h3 className="text-xl font-semibold">
                    {product.item.title}
                  </h3>
                  <h3 className="text-lg font-medium text-gray-700">
                    ₹{product.item.price}
                  </h3>
                </div>
                <div className="flex gap-4 mt-4">
                  <p className="text-gray-600">{product.item.subcategory}</p>
                  <ul className="list-none">
                    <li>
                      <span className="font-semibold">Size: </span>
                      <span className="border-black border px-2 py-0.5 rounded-md bg-gray-100">
                        {product.size}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 gap-4 flex">
                  <p>Price: ₹{product.item.price}</p>
                  <p className="text-red-500 font-medium">
                    Discount: ₹{product.discount}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 space-x-4">
                  <div className="flex items-center font-bold space-x-2">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="bg-red-500 text-white text-[18px] px-2.5 py-0.5 rounded"
                      disabled={product.quantity === 1}
                    >
                      -
                    </button>
                    <p className="border font-medium text-gray-700 text-[18px] px-2 py-0.5 rounded">
                      {product.quantity}
                    </p>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="bg-red-500 text-white px-2 py-0.5 text-[18px] rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <i className="ri-delete-bin-5-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/3 p-4">
          <div className="container mx-auto p-4 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Delivery</h3>
            <form onSubmit={handleSaveDeliveryDetails}>
              <input
                type="text"
                placeholder="Name"
                required
                className="block w-full p-2 mb-4 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Address"
                required
                className="block w-full p-2 mb-4 border rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <input
                type="number"
                placeholder="Pincode"
                required
                className="block w-full p-2 mb-4 border rounded"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              <input
                type="text"
                placeholder="City"
                required
                className="block w-full p-2 mb-4 border rounded"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                type="text"
                placeholder="State"
                required
                className="block w-full p-2 mb-4 border rounded"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />

              <input
                type="tel"
                maxLength={10}
                placeholder="Phone No."
                required
                className="block w-full p-2 mb-4 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="block w-full p-2 mb-4 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <table className="w-full mb-4 text-left">
                <thead>
                  <tr>
                    <th className="py-2">Subtotal:</th>
                    <th className="py-2 text-right">
                      ₹{totalPrice.toFixed(2)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Discount:</td>
                    <td className="py-2 text-right">
                      ₹{totalDiscount.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Delivery:</td>
                    <td className="py-2 text-right text-red-500 font-bold">
                      Free
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Tax 8%:</td>
                    <td className="py-2 text-right">₹{totalTax.toFixed(2)}</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-2">Total:</td>
                    <td className="py-2 text-right">
                      ₹{totalAmount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
                <button
                  type="submit"
                  className="bg-blue-500 mt-4 ml-[30%] text-white px-6 font-semibold py-2 rounded"
                >
                  Order Confirm
                </button>
              </table>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
