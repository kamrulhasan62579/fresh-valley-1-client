import React, { useEffect, useState } from 'react';

const Home = () => {
    const [getProducts, setGetProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:4008/products')
        .then(res => res.json())
        .then(data => setGetProducts(data))
    }, [])
    return (
        <div>
            {
                getProducts.map(pd => <div>
                    <h1>{pd.name}</h1>
                    <img style={{width: '300px'}} src={pd.image} alt=""/>
                </div> )
            }
           
        </div>
    );
};

export default Home;