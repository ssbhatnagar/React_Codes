import { useState, useEffect } from "react";

function useProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const rawData = await fetch("https://fakestoreapi.com/products");
        if (!rawData.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await rawData.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching the products ", error);
        setError("Error in loading");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
}
export default useProduct;
