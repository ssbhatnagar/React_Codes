import { useState } from "react"

const Items = [
    {
        id: 1,
        title: "Blue T shirt",
        category: "mens",
        price: "200"
    },
    {
        id: 2,
        title: "Black shirt",
        category: "womens",
        price: "200"
    },
    {
        id: 3,
        title: "trimer",
        category: "electronics",
        price: "200"
    },
    {
        id: 4,
        title: "white T shirt",
        category: "womens",
        price: "200"
    },
    {
        id: 5,
        title: "Black T shirt",
        category: "mens",
        price: "250"
    },
]

function FilterBasics() {
    
    const [products, setProducts] = useState(Items);
    const [selectedCategories, setSelectedCategoreis] = useState([]);

    const categories = [... new Set(products.map((p) => p.category))]
    console.log(categories);

    function handleCategoryToggle(e){
        const {value, checked} = e.target;
        setSelectedCategoreis((prev) => 
            checked ? [...prev, value] : prev.filter((cat) => cat !== value)
        );
    }

    const filteredProducts = selectedCategories === 0 ? products : products.filter((p) => selectedCategories.includes(p.category));
    
    
    return (
        <div>
            <h1>Here is the actual product list</h1>
            <ul>
                {products.map((prod) => 
                <li key={prod.id}>
                    {prod.title} - {prod.price} - {prod.category}
                </li>
                )}
            </ul>
            <h1>Here is filtered categories</h1>
            {categories.map((cat) => 
            <label key={cat}>
                {cat}
            <input
            type="checkbox"
            value={cat}
            onChange={handleCategoryToggle}
            checked={selectedCategories.includes(cat)}
            />
            </label>
            )}
            <ul>
                {filteredProducts.map((prod) => 
                <li key={prod.id}>
                    {prod.title} - {prod.price} - {prod.category}
                </li>
                )}
            </ul>
        </div>
    )

}
export default FilterBasics