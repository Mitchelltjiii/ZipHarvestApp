import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";

(async () => {
    const {publishableKey} = await fetch('/config').then(r => r.json());
    const stripePromise = loadStripe(publishableKey)

    ReactDOM.render(
        <React.StrictMode>
            <Elements stripe={stripePromise}>
                <App/>
            </Elements>
        </React.StrictMode>,
        document.getElementById("root")
    );
})()
