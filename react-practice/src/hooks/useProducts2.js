import {useEffect, useState} from "react"

function useProducts2(){

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchAPI = async() => {
            try{
                const rawData = await fetch('https://fakestoreapi.com/products')
                if(!rawData.ok){
                    throw new Error ("Error in fetching API")
                }
                const products = await rawData.json();
                setData(products)
            }catch(error){
                console.log("Error in fetching data", error)
                setError("Error in loading")
            }finally{
                setLoading(false)
            }
        }
        fetchAPI();
        
    }, [])

     return {data, error, loading}

}
export default useProducts2;