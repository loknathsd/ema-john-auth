import React from 'react';

import Review from '../Review/Review';

const Cart = (props) => {
    const cart =props.cart;
    // console.log(cart.price)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
         total = total + product.price *product.quantity;
         debugger;
        }
    const tax = (total *0.1).toFixed(2)
    const taxNumber = parseFloat(tax);
    const grandTotal = (total+taxNumber).toFixed(2)

    // let total = 

    return (
        <div>
            <h2>Order Summary</h2>
            <h3>Items ordered : {cart.length}</h3>
            <p>Tax : {taxNumber}</p>
            <h3>Total : {grandTotal}</h3>
            <br />
            {
                props.children
            }

        </div>
    );
};

export default Cart;