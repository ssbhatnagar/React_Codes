 './Css/ProductsCard.module.css'
import Styles from'../Css/ProductsCard.module.css'

function ProductCard({image, title}){
    return(
        <div className={Styles.ProductsCard} >
            <img className={Styles.ProductsImg} src={image} alt="title"/>
            <span>{title}</span>
        </div>
    )
}

export default ProductCard;