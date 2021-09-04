import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../Utilities/DatabaseManager';
import Cart from '../Cart/Cart';
import HomeProducts from '../HomeProducts/HomeProducts';

const Home = () => {
    const [cart, setCart] = useState([]);
    // console.log(cart);
    const [getProducts, setGetProducts] = useState([])
    useEffect(() => {
        fetch('https://floating-meadow-92941.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setGetProducts(data))
    }, [])


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        if(getProducts.length){
            const cartProducts = productKeys.map(key => {
                const product = getProducts.find(pd =>pd._id === key)
                product.quantity = savedCart[key]
                return product; 
            })
            setCart(cartProducts);
        }

    }, [getProducts])

    const handleClick = (pd) => {
   
       const sameProduct = cart.find(pod => pod._id === pd._id)
       let newCart;
       let count = 1;
       if(sameProduct){
           count = sameProduct.quantity + 1 ;
           sameProduct.quantity = count;
           const others = cart.filter(prd => prd._id !== pd._id)
           newCart = [...others, sameProduct];

       }
       else{
           pd.quantity = 1;
           newCart = [...cart, pd];
       }
       setCart(newCart);
       addToDatabaseCart(pd._id, count)
    }

    return (
        <div style={{display: 'flex'}}>
           <div>
            {
                getProducts.map(pd => <HomeProducts key={pd._id} product={pd} >
                <Button onClick={() => handleClick(pd)} variant="contained" color="primary">Add To Cart</Button>
                </HomeProducts> )
            }
           </div>
           <div>
               <Cart cart={cart}></Cart>
                <Link to="/review">
                
                    <Button variant="contained" color="primary">
                        Review Product
                    </Button>

                </Link>
           </div>
        </div>
    );
};

export default Home;