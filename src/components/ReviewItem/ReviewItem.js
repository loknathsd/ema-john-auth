import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key ,price} = props.product;
     const itemStyle ={
         borderBottom : '2px solid gray',
         margin : '50px 100px',
         paddingBottom :'10px',
        //  marginLeft : '100px'

     }
    return (
        <div style={itemStyle}>

            <h3 className="product-name">{name}</h3>
            <p>Quantity : {quantity}</p>
            <p>Price : {price}</p>
            
            <button onClick ={()=>props.removeProduct(key)} className="add-cart">Remove</button>
        </div>
    );
};

export default ReviewItem;