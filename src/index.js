import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";


    const stripePromise = loadStripe("pk_test_51JmpUwGBqcLC10HcR83rJs3pzuuVNBccQnf6InpAaLtuTdo6SWH9ITX1QZcCFze1n2St0yk3PEa8flb4QHvSgMR000sINbKwaM")

    ReactDOM.render(
        <React.StrictMode>
            <div style={{position:"absolute",top:"0px",bottom:"0px",left:"0px",right:"0px"}}>
                <Elements stripe={stripePromise}>
                    <App/>
                </Elements>
            </div>
        </React.StrictMode>,
        document.getElementById("root")
    );

/* */