import React, {useState, useEffect} from 'react';

function useProducts(){

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async() =>{
            try{
                const rawData = await fetch('https://fakestoreapi.com/products')
                if(!rawData.ok){
                    throw new Error("Error in fetching the data");
                }
                const data = await rawData.json();
                setProducts(data);
            }catch(error){
                setError("There is an error in fetching api")
                console.log("Error in fetching")
            }finally{
                setLoading(false);
            }
        }
        fetchAPI();
    }, [])

    return {products, error, loading}

}
export default useProducts