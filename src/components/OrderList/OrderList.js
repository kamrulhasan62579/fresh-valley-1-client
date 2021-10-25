import React, { useEffect, useState } from 'react';
import CheakOutData from '../CheakOutData/CheakOutData';

const OrderList = () => {
    const [cheakOutData, setCheakOutData] = useState([])
    console.log(cheakOutData);
    useEffect(() => {
        fetch('https://floating-meadow-92941.herokuapp.com/cheakOutData')
        .then(res =>res.json())
        .then(data => setCheakOutData(data))
    }, [])
    return (

            <div style={{ padding: "20px"}} className="w-100 m-0 row d-flex justify-content-center">
            {
                cheakOutData.map((pd, index) => <CheakOutData index={index} key={index} pd={pd}></CheakOutData>)
            }
        </div>

    );
};

export default OrderList;