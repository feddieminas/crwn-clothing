import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const REACT_APP_STRIPE_PK = process.env.REACT_APP_STRIPE_PK;

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = REACT_APP_STRIPE_PK;

    const onToken = token => {
        console.log(token);
        alert('PaymentSuccesful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );

};

export default StripeCheckoutButton;