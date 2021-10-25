import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

    const total = cart.reduce((total, prd) => (total + Number(prd.price * prd.quantity)), 0)
    const totalProduct = cart.reduce((total, prd) => (total + Number(prd.quantity)), 0)

    console.log(cart);
    return (
        <div>
            <h5>Product Item: {cart.length}</h5>
            <h5>Individual Products: {totalProduct}</h5>
            <h4>Total Price: {total}</h4>
        </div>
    );
};

export default Cart;