
/**
 * So here is the very basic algorithm for the filtering of products when you get data 
 * from the api. Fetching data from api is easy but the main problem is how to do the filter
 * of data. 
 * ALGORITHM FOR FULL QUESTION INCLUDING API CALLING PART
 * 
 * 1. create a custom hook with 3 states those are - products (jisme products store honge),
 * second is error jo by default null rahega, third is loading jiski initial value hogi true.
 * 
 * 2. Ab kya karna hai ? - create a useEffect( () => {}, []) isme ek function banao async function 
 * usme try catch block banao aur fetch ka use karke data ko call karo, 
 * 
 * 3. try block mai data fetch karna hai check if(!rawData.ok) {thow new Error ("the api is not working")}
 * uske baad data ko json mai convert kar ke setData use kar ke data mai sey karwa do.
 * 
 * 4. catch block error catch ke liye hai uske baad finally mai loading ko false kar do.
 * 
 * 5. data ko use karo aur list bana lo map ka use kar ke.
 * 
 * HERE COMES THE FILTER PART - 
 * 
 * 
 * 
 */



import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';

const App = () => {
  const { products, error, loading } = useProducts();

  // STEP 1: state variable for categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [userQuery, setUserQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  // STEP 2: unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // STEP 3: checkbox toggle
  function handleCategoryChange(category) {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }

  // STEP 4: filtered products
  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter(p =>
        selectedCategories.includes(p.category)
      );

  const searchResults = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(userQuery.toLowerCase())
  );

  return (
    <div>
      {/* STEP - JSX of checkbox */}
      <h2>Filters</h2>
      {categories.map(category => (
        <label key={category} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          {category}
        </label>
      ))}

      <hr />
      <label>
        search bar
        <input
          type="text"
          placeholder='Type here for search'
          onChange={(e) => setUserQuery(e.target.value)}
          value={userQuery}
        />
      </label>
      {/* <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.id} - {product.title} - <b>{product.category}</b>
          </li>
        ))}
      </ul> */}
      <ul>
        {/* Ab hum final searchResults par map chalayenge */}
        {searchResults.map(product => (
          <li key={product.id}>
            {product.id} - {product.title} - <b>{product.category}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
