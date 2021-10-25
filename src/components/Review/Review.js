import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../Utilities/DatabaseManager';
import Cart from '../Cart/Cart';
import ReviewProducts from '../ReviewProducts/ReviewProducts';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [getProducts, setGetProducts] = useState([]);

    useEffect(() => {
        fetch('https://floating-meadow-92941.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setGetProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(getProducts.length){
            const cartProducts = productKeys.map(key => {
                const product = getProducts.find(pd => pd._id === key)
                product.quantity = savedCart[key]
                return product;
            })
            setCart(cartProducts)
        }
    }, [getProducts])
    
    const handleRemove = (id) => {
    console.log(id);
    const sameProduct = cart.find(pd => pd._id === id);
    let newCart ;
    let count = 1 ;
    if(sameProduct ){
        count = sameProduct.quantity - 1;
        sameProduct.quantity = count;
        newCart = [...cart];
        addToDatabaseCart(id, count);
         
    }
    if(sameProduct.quantity < 1){
        const others = cart.filter(pod => pod._id !== id);
        newCart = [...others];
        removeFromDatabaseCart(id)
      }
      setCart(newCart);
    }
    return (
        <div className=" w-100 row d-flex justify-content-center">
           <div className="col-md-12 col-lg-11 col-xl-10 col-xxl-9 col-12 col-sm-12">
                <div>
                <h4 className="text-center">Order List</h4>
               <ReviewProducts cart={cart} handleRemove={handleRemove}></ReviewProducts>
            </div>
            <div>
                 <Cart cart={cart}></Cart>
                 <Link style={{textDecoration:"none"}} to="/cheakOut">
                
                    <Button variant="contained" color="primary">
                       Proceed To Cheakout
                    </Button>

                </Link>
            </div>
           </div>
        </div>
    );
};

export default Review;



