import { getDatabase, onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { appfb } from "../../firebase/firebase"; 
import MyContext from "../../context/data/Mycontext";
import { useNavigate } from "react-router-dom";

function Allproduct({ data }) {
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // context
  const context = useContext(MyContext);
  const { addProduct, producturl } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!producturl) {
      console.error("No category data provided.");
      setLoading(false);
      return;
    }

    const db = getDatabase(appfb);
    const categoriesRef = ref(db, producturl);

    const unsubscribe = onValue(categoriesRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const categoriesArray = Object.entries(fetchedData).map(([date, products]) => ({
          products: Object.entries(products).map(([productId, product]) => ({
            ...product,
            id: productId,
          })),
        }));
        setProductCategories(categoriesArray);
        addProduct(categoriesArray);
        setLoading(false);
      } else {
        console.error("No data available.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [producturl]);

 
  const handleProductClick = async (products) => {
    navigate("/productshow", { state: { products } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-11 text-center w-full mt-11">
        Category
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : productCategories.length > 0 ? (
          productCategories.map((category, index) => (
            <div
              key={index}
              className="border rounded shadow cursor-pointer"
              onClick={() => handleProductClick(category.products)}
            >
              <div className="h-[350px] w-[350px] overflow-hidden">
                {category.products.map((product) => (
                  <React.Fragment key={product.id}>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-auto mb-1 transition-transform duration-300 transform hover:scale-110"
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default Allproduct;
