import React, { useContext, useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Layout from "../../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../../context/data/Mycontext";
import { appfb } from "../../../firebase/firebase";
import { get, getDatabase, ref, remove } from "firebase/database";
  
function Dashboard() {
  const context = useContext(MyContext);
  const { allproducts } = context;
  const [product, setproduct] = useState("");
  if (!allproducts || allproducts.length === 0) {
    return (
      <Layout>
        <div className="text-2xl ">No Data</div>
      </Layout>
    );
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Flatten the nested products array and update the state
    const flattenedProducts = allproducts.flatMap((productArray) =>
      productArray.products.map((product) => ({
        ...product,
       }))
    );
    setProducts(flattenedProducts);
  }, [allproducts]);
   console.log(products);
  const deletehandle = async (product) => {
    const db = getDatabase(appfb);
    const productRef = ref(db, `Men/${product.subcategory}`);
    try {
      // Fetch all products under the subcategory
      const snapshot = await get(productRef);
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        // Find the product with the matching title
        for (const key in productsData) {
          if (productsData[key].title === product.title) {
            // Remove the product
            await remove(ref(db, `Men/${product.subcategory}/${key}`));
            // Update the local state
            setProducts(products.filter((p) => p.title !== product.title));
            console.log("Product deleted successfully:", product);
            break;
          }
        }
      } else {
        console.log("No products found in the specified subcategory.");
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };
  
const navigate = useNavigate()
  const updatehandle = (product) => {
     navigate('/updateproduct',{state:{product}})
   };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Tabs defaultIndex={0}>
          <TabList className="flex space-x-4">
            <Tab className="cursor-pointer py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded">
              Products
            </Tab>
            <Tab className="cursor-pointer py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded">
              Orders
            </Tab>
            <Tab className="cursor-pointer py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded">
              Users
            </Tab>
          </TabList>

          {/* product section */}
          <TabPanel>
            <h1 className="text-center mb-5 text-3xl font-semibold underline mt-5">
              Product Details
            </h1>
            <Link to={"/addproduct"}>
              <button type="button" className="p-2 px-4 bg-gray-500 mb-4 ml-5">
                Add Product
              </button>
            </Link>
            <div className="border rounded shadow">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Id.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 border-b dark:border-gray-700"
                    >
                      <td className="px-6 py-4 text-black">{index}</td>
                      <td className="px-2 py-2 font-medium text-black whitespace-nowrap">
                        <img
                          className="w-14"
                          src={product.imageUrl}
                          alt="img"
                        />
                      </td>
                      <td className="px-6 py-4 text-black">{product.title}</td>
                      <td className="px-6 py-4 text-black">₹{product.price}</td>
                      <td className="px-6 py-4 text-black">
                        {product.categoryName}
                      </td>
                      <td className="px-6 py-4 text-black">
                        {new Date(parseInt(product.date)).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 cursor-pointer text-black">
                          <div onClick={() => deletehandle(product)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </div>
                          <div onClick={() => updatehandle(product)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* // oreder section */}
          <TabPanel>
            <h2 className="text-xl font-semibold mt-4">All Orders</h2>
            <div className="">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Payment Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pincode
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="bg-gray-50 border-b dark:border-gray-700">
                    <td className="px-6 py-4 text-black">1</td>
                    <td className="px-6 py-4">
                      <img
                        className="w-16"
                        src="https://dummyimage.com/720x400"
                        alt="Product"
                      />
                    </td>
                    <td className="px-6 py-4 text-black">Product Title</td>
                    <td className="px-6 py-4 text-black">₹100</td>
                    <td className="px-6 py-4 text-black">Category Name</td>
                    <td className="px-6 py-4 text-black">Customer Name</td>
                    <td className="px-6 py-4 text-black">Customer Address</td>
                    <td className="px-6 py-4 text-black">123456</td>
                    <td className="px-6 py-4 text-black">123-456-7890</td>
                    <td className="px-6 py-4 text-black">
                      customer@example.com
                    </td>
                    <td className="px-6 py-4 text-black">12 Aug 2019</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            {/* user section */}
            <h2 className="text-xl font-semibold mt-4">All Users</h2>
            <div className="">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
                  <tr>
                    <th className="px-6 py-3" scope="col">
                      s .no
                    </th>
                    <th className="px-6 py-3" scope="col">
                      Name
                    </th>
                    <th className="px-6 py-3" scope="col">
                      Address
                    </th>
                    <th className="px-6 py-3" scope="col">
                      Pincode
                    </th>
                    <th className="px-6 py-3" scope="col">
                      Phone Number
                    </th>
                    <th className="px-6 py-3" scope="col">
                      Email
                    </th>
                    <th className="px-6 py-3" scope="col">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="bg-gray-50 border-b dark:border-gray-700">
                    <td className="px-6 py-4 text-black">1</td>
                    <td className="px-6 py-4 text-black">Name</td>
                    <td className="px-6 py-4 text-black">Add</td>
                    <td className="px-6 py-4 text-black">111111</td>
                    <td className="px-6 py-4 text-black">123-456-7890</td>
                    <td className="px-6 py-4 text-black">
                      customer@example.com
                    </td>
                    <td className="px-6 py-4 text-black">12 Aug 2019</td>
                  </tr>
                </tbody>
              </table>
            </div>{" "}
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Dashboard;
