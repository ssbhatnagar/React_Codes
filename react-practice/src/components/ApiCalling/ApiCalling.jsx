import useProducts from '../../hooks/useProducts';


const App = () => {

  const {products, error, loading} = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return(
    <div>
      {products.map((product) => 

      <li key={product.id}>
       {product.id} - {product.title}  - <b>{product.category}  
       </b> 
       </li>
      )}
    </div>
  )
  
  
}


export default App