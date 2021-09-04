import React, { useEffect, useState } from 'react';

const OrderList = () => {
    const [cheakOutData, setCheakOutData] = useState([])
    console.log(cheakOutData);
    useEffect(() => {
        fetch('https://floating-meadow-92941.herokuapp.com/cheakOutData')
        .then(res =>res.json())
        .then(data => setCheakOutData(data))
    }, [])
    return (
        <div>
            {
                cheakOutData.map(pd => <li key={pd._id}>Name:{pd.displayName}, Email: {pd.email}</li> )
            }
        </div>
    );
};

export default OrderList;