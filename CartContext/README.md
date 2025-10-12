# Step By Step Algo for this Project

## step 1:

Pehele step mai hum ek API le lenge jisme mock data rahega products ka aur us mock data ko use karenge hum ek custom hook mai (useProducts.js), vo custom hook ka ye kaam hoga.

<ol>
<li>States define karna:</li>
<ol>
<li>products ke liye (products and setProducts) ye ek empty array hoga. </li>
<li>Ek state hogi for error (error, setError) iski default value null hogi, jo ki API fail hone par (error condition) mai user ko batayega ki kya error hai.</li>
<li>Ek state hogi loading (loading, setLoading) iski default value true hogi, ye badically UI par show karega loading.. us interval ke beech jab API data fetch karegi aur show hoga data UI par.  </li>
</ol>
<li>useEffect hook - is step mai ek function (fetchData) define karenge useEffect mai jo data fetch karenga, ye function async function hoga.</li>
<ol>
<li>within this function fetchData try catch aur finally ka block bana lena</li>
<li>Try catch mai actual API call hoga using fetch agar uska response ok hai to phir us data ko json mai convert karenge aur further setProducts mai data pass kar denge</li>
</ol>
</ol>