import React from 'react';

const CheakOutData = ({pd, index}) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 m-3 text-center text-white" style={{ padding: "20px", borderRadius: "5px", background: "#6c0092", boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"}}>
            <h6>Order No: {index + 1 }</h6>
            <h5>{pd.displayName}</h5> 
            <p>{pd.email}</p>
            <p>Address: {pd.shippingData.address}</p>
            <p>District: {pd.shippingData.district}</p>
            <p>Upzilla: {pd.shippingData.upzilla}</p>
        </div>
    );
};

export default CheakOutData;