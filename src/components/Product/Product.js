import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
    const {name,img,seller,price,stock,key} = props.product;
    return (
        <div className="product-area" >
            <div>
               <img src={img} alt="" />
            </div>
            <div className="product-name-area">
              <h2 className="product-name"><Link to={"/product/" +key}>{name}</Link></h2>
              <p><small>by : {seller}</small></p>
              <p>${price}</p>
              <p><small>only {stock} left in stock - order soon</small></p>
             { props.showButton && <button onClick={()=>props.handleAddProduct(props.product)} className="add-cart"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;