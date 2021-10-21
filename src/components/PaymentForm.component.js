import { withRouter } from "react-router-dom";
import React from "react";
import {CardElement, useElements} from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardElement = elements.getElement(CardElement);
        console.log(cardElement);
    }
    return (
    <form onSubmit={handleSubmit}>
            <CardElement/>
            <button>Pay</button>
        </form>)
}



export default withRouter(PaymentForm);