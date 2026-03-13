import {useEffect, useState} from "react"
import { useResolvedPath } from "react-router-dom";

function useProducts2(){

    const [products, setProducts] = useState([]);
    const [error, setrError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async () =>{
            try{
                const rawData = await fetch('https://fakestoreapi.com/products')
                if(!rawData.ok){
                    throw new Error("There is an error in fetching the API")
                }
                const data = await rawData.json();
                setProducts(data);
            }catch(error){
                setrError("Error in fetching data from API")
                console.log("Error in fetching data from API")
            }finally{
                setLoading(false)
            }
        }
        fetchAPI();
    }, [])

    return {products, error, loading}
    
}
export default useProducts2;