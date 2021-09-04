import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

    const total = cart.reduce((total, prd) => (total + Number(prd.price * prd.quantity)), 0)

    console.log(cart);
    return (
        <div>
            <h4>Cart Length: {cart.length}</h4>
            <h4>Total Price: {total}</h4>
        </div>
    );
};

export default Cart;