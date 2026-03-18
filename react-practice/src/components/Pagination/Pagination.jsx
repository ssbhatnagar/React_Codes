import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductsCard";
import PaginationControls from "./components/PaginationControls";
import Styles from '../Pagination/Css/Pagination.module.css'


// Step 1 think of how many products you want on one page, hum 10 products dikaheynge ek page par
const PAGE_SIZE = 10;

function Pagination() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    // step 5 current page state banao
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {

        const fetchAPI = async () => {

            try {
                const rawData = await fetch('https://dummyjson.com/products?limit=500');
                if (!rawData.ok) {
                    throw new Error("Error in fetching the API");
                }
                const data = await rawData.json();
                setProducts(data.products);   // take a look on the DS it is object that is getting returned we need array to use map that is the reason i used data.products, Products is array
            } catch (error) {
                console.log("error in fetching api", error)
                setError("Error in loading")
            } finally {
                setLoading(false);
            }

        }
        fetchAPI();
    }, [])


    // step 2 total products nikal lo
    const totalProducts = products.length;
    // step 3 total number of pages ?
    const totalNoOfPages = Math.ceil(totalProducts / PAGE_SIZE) // Math.ceil round off kar dega decimal ko next number mai lets say 19.5 hai to 20 ho jayega
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE

    function handlePageChange(n) {
        setCurrentPage(n)
    }

    function goToPrevPage() {
        setCurrentPage((prev) => prev - 1)
    }


    function goToNextPage() {
        setCurrentPage((prev) => prev + 1)
    }

    return (
        <div>
            <h1>Pagination</h1>
            <h4>Below is list of products</h4>
            {/* step 4 array banao 10 pages ke liyeaur uspar map lagao */}
            <PaginationControls
            totalNoOfPages={totalNoOfPages}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            />
            <div>
                {products.length === 0 ? <h3>No Products Found</h3> :
                    <div className={Styles.ProductsContainer} >
                        {/* slice ka use karo so that ek page par kitne cards dikhenge control ho sake, 0, 10 ka matlab hai ki 0 se 10 dikhao lets say start ho 2 to end hoga 20  */}
                        {products.slice(start, end).map((prod) =>
                            <ProductCard
                                key={prod.id}
                                image={prod.thumbnail}
                                title={prod.title}
                            />
                        )}
                    </div>
                }
            </div>
        </div>
    )

}

export default Pagination;