import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log("Error fetching products:", err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product._id} className="border p-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
