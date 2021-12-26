import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'

const Shop = () => {
const first10 = fakeData.slice(0,10);
const [products , setProducts] = useState(first10)
const [cart , setCart] = useState([]);
useEffect(()=>{
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    const previousKey = productKeys.map(existingKey =>{
        const product = fakeData.find(pd =>pd.key === existingKey)
        product.quantity = saveCart[existingKey];
        return product;
    })
    setCart(previousKey)
    // console.log(saveCart)
},[])
// console.log(first10)
  const handleAddProduct = (product) => {
    const toBeAdded = product.key;
    const sameProduct = cart.find(pd => pd.key ===toBeAdded);
    let count = 1;
    let newCart;
    if(sameProduct){
        count = sameProduct.quantity +1;
        sameProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAdded);
        newCart = [...others,sameProduct]
    }
    else{
            product.quantity = 1;
            newCart = [...cart,product];
    }
       setCart(newCart); 
       
       addToDatabaseCart(product.key,count)
  }
    return (
        <div className="shop-container">
           <div className="product-container">
               {
                   products.map(pd => <Product key={pd.key} showButton={true} handleAddProduct ={handleAddProduct} product = {pd} ></Product>)
               }
                   
           </div>
           <div className="cart-container">
              <Cart cart ={cart}>
                   <Link to="/review">
                    <button className="add-cart">Order Review</button>
                   </Link>
               </Cart>
           </div>
        </div>
    );
};

export default Shop;