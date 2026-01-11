import  {useEffect, useState} from 'react'

function useProducts(){

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try{
        const rawData = await fetch('https://fakestoreapi.com/products')
        if(!rawData.ok){
          throw new Error("Error in fetching api")
        }
        const data = await rawData.json();
        setProducts(data);
      }catch(error){
        console.log("error in fetching api", error)
        setError("Error in loading")
      }finally{
        setLoading(false)
      }
    }
    fetchAPI();
  }, [])

  return {products, error, loading}
  
}

export default useProducts;