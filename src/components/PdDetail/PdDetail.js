import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const PdDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd=> pd.key === productKey)
    console.log(product)
    return (
        <div>
            <h1> {productKey} Detail is coming sooon</h1>
            <Product showButton = {false} product = {product}></Product>
        </div>
    );
};

export default PdDetail;