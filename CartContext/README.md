# Step By Step Algo for this Project

## STEP 1:

Pehele step mai hum ek API le lenge jisme mock data rahega products ka aur us mock data ko use karenge hum ek custom hook mai (useProducts.js), vo custom hook ka ye kaam hoga. Custom hook bana lene se code clean rahega aur uska data kahi bhi use ho jayega. 

<ol>
<li>States define karna:</li>
<ol>
<li>Products ke liye (products and setProducts) ye ek <b><u><i>empty array</b></u></i> hoga. </li>
<li>Ek state hogi for error (error, setError) iski default value <i><u><b>null</b></u></i> hogi, jo ki API fail hone par (error condition) mai user ko batayega ki kya error hai.</li>
<li>Ek state hogi loading (loading, setLoading) iski default value <b><u><i>true</b></u></i> hogi, ye badically UI par show karega loading.. us interval ke beech jab API data fetch karegi aur show hoga data UI par.  </li>
</ol>
<li>useEffect hook - is step mai ek function (fetchData) define karenge useEffect mai jo data fetch karenga, ye function async function hoga.</li>
<ol>
<li>Within this function fetchData try, catch aur finally ka block bana lena.</li>
<ul>
<li>Try block mai actual API call hoga using fetch agar ye data <b><u><i> ok nahi hai (use ! for that see the logic) </b></u></i> </li> to throw new Error ("Network response was not ok") next step jo ki else mai hi fall karega usme ye data ko json mai convert karna aur store kar lena kissi variable mai aur setProducts mai pass kar dena. 
<li>Catch block is for cathing error aur isme console log hoga -  console.log("Error fetching the products ", error); aur  setError("Error in loading"); </li>
<li>Finally mai sirf setLoading ko false kar dena hai</li>
</ul>
<li>Function ko call karna within useEffect aur uska dependency arrray empty rahega.</li>
<li>Within useProduct function return {products, loading, error}</li>
<li>Finally export default useProduct</li>
</ol>
</ol>