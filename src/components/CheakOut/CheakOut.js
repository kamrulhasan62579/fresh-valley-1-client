import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import {loadStripe} from '@stripe/stripe-js';
import Payment from '../Payment/Payment';
import { getDatabaseCart } from '../../Utilities/DatabaseManager';
import { Elements } from '@stripe/react-stripe-js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JV4qEDYOdxmFjYeqBHciTENM07sfu1LN2qcqY8LkD30Tl3w3xdntVPmHs15MB7KH0vY01asUPXFInDKrabNknGk00JYK0gGxC');


const CheakOut = () => {
    // const [value, setValue] = useState('female');

    // const handleChange = (event) => {
    //   setValue(event.target.value);
    // }

    const [shippingData, setShippingData] = useState(null);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => setShippingData(data);

    // cart update
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


    // post order data to back end
    const paymentSuccess = (id, card) => {
        console.log(id);
        const newData = {shippingData : shippingData, ...loggedInUser,  cart: cart, paymentId: id, paymentCard: card}
        console.log(newData);
        fetch('https://floating-meadow-92941.herokuapp.com/cheakOutData', {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    // payment mathod selection:::::
    const [selectMethod, setSelectMethod] = useState(null);
    return (
        <div>
            <div style={{display: shippingData ? 'none' : 'block', paddingTop: "20px"}}>
            
            <div className="row d-flex justify-content-center">
               <h4 className="text-center">Fill up the informaton</h4>
               <form className="col-md-5" onSubmit={handleSubmit(onSubmit)}>  

                <input className="form-control" placeholder="Full Name" {...register("name", { required: true })} />
                {errors.name && <span>Name is required</span>}

                <br/>

                <input className="form-control" placeholder="Address" {...register("address", { required: true })} />
                {errors.address && <span>Address is required</span>}

                <br/>

                <input className="form-control" placeholder="District Name" {...register("district", { required: true })} />
                {errors.district && <span>District Name is required</span>}

                 <br/>

                <input className="form-control" placeholder="Upzilla Name" {...register("upzilla", { required: true })} />
                {errors.upzilla && <span>Upzilla Name is required</span>}

                <br/>

                <input className="form-control" placeholder="Post Code" {...register("postCode", { required: true })} />
                {errors.postCode && <span>Post Code is required</span>}

                 <br/>

                <input className="form-control btn btn-success" type="submit" />
            </form>

            </div>

            <br/><br/>
 
            </div>

              <div  style={{display: shippingData ? 'block' : 'none', paddingTop: "30px"}}>

           
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-5">
                            <FormControl component="fieldset">
                            <FormLabel component="legend">Select Payment Method</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1"  >
                                <FormControlLabel onClick={() => setSelectMethod(true)} value="Stripe Payment Method" control={<Radio />} label="Pay with Stripe" />
                                <FormControlLabel onClick={() => setSelectMethod(false)} value="SSLCOMMERZ Payment Method" control={<Radio />} label="Pay with sslcommerz" />
                            </RadioGroup>
                        </FormControl>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center pt-5">
                        <div className="col-md-5">
                                {
                            selectMethod ?  
                            <div>
                            <Elements stripe={stripePromise}>
                                <Payment paymentSuccess={paymentSuccess}></Payment>
                            </Elements>
                            </div>
                            :
                            <div>
                            
                            <h5>SSLcommerz Pyment Method</h5>

                            </div>
                            }
                        </div>
                    </div>

                </div>                    
           
        </div>
    );
};

export default CheakOut;