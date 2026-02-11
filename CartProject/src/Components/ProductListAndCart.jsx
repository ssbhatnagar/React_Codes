import React, { useState } from "react"; // 1. useState fixed
import useProducts from "../Hooks/useProducts";

function ProductListAndCart() {
  const { products, loading, error } = useProducts();

  // STEP 1 CREATE A STATE FOR STORING THE CATEGORIES
  const [selectedCategories, setSelectedCategories] = useState([])
  // ye array hi categories ko store karegi

  // STEP 2 CREATE AN ARRAY OF ALL THE CATEGORIES
  const categories = [... new Set(products.map((prod) => prod.category))]
  // yaha na maine ek categories name ki ek array bana li hai jisme sari categories jo bhi hai vo unique (set use kara hai jisse vo unique rahe duplicacy na ho) add ho jayengi
//   console.log(categories) // ye sirf dekhne ke liye hai ki theek store hui ya nahi


// STEP 3 CREATE HANDLER FUNCTION 
function handleCategoryChange(category){
    setSelectedCategories((prev) =>
    prev.includes(category) ? prev.filter((c) => c!==category) : [...prev, category])
}
/**
 * yaha na hum selectedCategories array ko set kar rahe (products nahi mile hai yaha se, sirf selected categories jisko user ne select kiya uski array bani hai) hai using setSelectedCategories vo kaise? 
 * humne ek handler function banaya jiske parameter mai category hai ab ye us category ko check karega kya ye category already present (prev.filter((c) => c!==category) is line se) hai?? ya nahi agar nahi hai to vo usko populate kar dega with [...prev, category] se hi
*/

// STEP 4 FILTER PRODUCTS LOGIC
const filteredProducts = selectedCategories.length === 0 ? products : products.filter((p) =>
selectedCategories.includes(p.category));
 
/**
 * yaha dekho ab actual array banayi hai products ki jo bhi category user ne select ki uski humne array banayi upar mai in step 2 ab un selected categories ko use karna hai un products ko alag karne mai jo user ne select kiye to yaha vo hi ho raha hai. Agar selected categories ki lenght 0 hai matlab user ne koi categories select nahi ki to products ko directly filteredProducts mai daal do ohterwise products mai filter lagao har product (p) par iterate karo aur selectedCategories mai se jinki bhi category match kare usko include kar do
 */

  if (error) return <div>Error in loading API</div>;
  if (loading) return <div>loading API data ...</div>;
  


  return (
    <div>
        {/* STEP 5 HERE WE USED CATGORIES ARRAY TO POPULATE CHECK BOX */}
        <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <label key={cat} style={{ marginRight: "15px", cursor: "pointer", textTransform: "capitalize" }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
            />
            {cat}
          </label>
        ))}
      </div>
      <hr/>
      {/* STEP 6 FINALLY PRINTED THE SELECTED ARRAY */}
      {/* Filtered array  */}
<h3>Filtered products list ({filteredProducts.length})</h3>
<ul>
            {filteredProducts.map((filterProd) =>
            <li key={filterProd.id}>
                {filterProd.title}
            </li>
            )}
        </ul>
<hr/>
<h3>All products list</h3>

      {/* Actual array */}
        <ul>
            {products.map((prod) =>
            <li key={prod.id}>
                {prod.title}
            </li>
            )}
        </ul>
    
    </div>
  );
}

export default ProductListAndCart;