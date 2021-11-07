import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";


    const stripePromise = loadStripe("pk_test_51JmpUwGBqcLC10HcR83rJs3pzuuVNBccQnf6InpAaLtuTdo6SWH9ITX1QZcCFze1n2St0yk3PEa8flb4QHvSgMR000sINbKwaM")

    ReactDOM.render(
        <React.StrictMode>
           <div style={{backgroundColor:"#a83232",height:"100%",width:"100%"}}>
               Fuck
           </div>
        </React.StrictMode>,
        document.getElementById("root")
    );

/* <Elements stripe={stripePromise} style={{innerHeight:"100%",outerHeight:"100%",innerWidth:"100%",outerWidth:"100%"}}>
                <App style={{innerHeight:"100%",outerHeight:"100%",innerWidth:"100%",outerWidth:"100%"}}/>
            </Elements>*/