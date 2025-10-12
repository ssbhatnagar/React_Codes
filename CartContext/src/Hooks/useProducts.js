import React, {useEffect, useState} from 'react'

function useProducts(){

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const rawData = await fetch('https://dummyjson.com/products');
                if(!rawData.ok){
                    throw new error("Network response is not ok");
                }
                const data = await rawData.json();
                setProducts(data);
            }catch(error){
                console.log("Error in fetching data: ", error)
                setError("Error in fetching data")
            }finally{
                setLoading(false)          
            }
        };
        fetchData();
    },)

    return {products, loading, error};
}
export default useProducts