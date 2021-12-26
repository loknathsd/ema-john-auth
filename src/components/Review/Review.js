import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false)

    const removeProduct =(productKey) =>{
    //    console.log("i am removed")
       const newCart = cart.filter(pd =>pd.key !== productKey);
       setCart(newCart);
       removeFromDatabaseCart(productKey);
       
    }
    const history = useHistory()
    const handleProceedCheckOut =()=>{
        history.push('/shipment')
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = saveCart[key]
            return product;
        })
        console.log(cartProducts)
        setCart(cartProducts);
    },[])
    let thankyou ;
    if(orderPlaced){
        thankyou = <img src={image} alt="" />
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            <h1>Cart Items : {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} product ={pd}></ReviewItem>)
                }
                {thankyou}
            </div>
            
            <div className="cart-container">
                <Cart cart = {cart} >
                    <button onClick={handleProceedCheckOut} className="add-cart">Proceed CheckOut</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;