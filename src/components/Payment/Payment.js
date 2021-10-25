import React, { useState } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

 const Payment = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message)
      setPaymentSuccess(null)
    } else {

      setPaymentSuccess('Wellcome, Payment Successfull and your purchase is confirmed')
      alert("Congrasulations; Your Parchase is Successfull")
      setPaymentError(null)
      console.log('[PaymentMethod]', paymentMethod);
      props.paymentSuccess(paymentMethod.id, paymentMethod.card)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div style={{borderRadius: "3px", border: "1px solid black", padding: "8px"}}>
            <CardElement 
            options={{
                style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                    color: '',
                    },
                },
                invalid: {
                    color: 'red',
                },
                },
            }}
            /></div> <br/>
          <button className="btn btn-success form-control" type="submit" disabled={!stripe}>
            Pay Bill and Confirm Parchase
          </button>
    </form>
        {
          paymentError && <p className="text-center pt-5" style={{color: 'red'}}>{paymentError}</p>
        }
        {
          paymentSuccess && <p className="text-center pt-5" style={{fontSize: "12px", color: 'green'}}>{paymentSuccess}</p>
        }
    </div>
  );
};

export default Payment;