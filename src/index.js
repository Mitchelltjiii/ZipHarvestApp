import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";


    const stripePromise = loadStripe("pk_test_51JmpUwGBqcLC10HcR83rJs3pzuuVNBccQnf6InpAaLtuTdo6SWH9ITX1QZcCFze1n2St0yk3PEa8flb4QHvSgMR000sINbKwaM")

    ReactDOM.render(
        <React.StrictMode>
            <div style={{width:"100%",height:"100%",backgroundColor:"#a83232",padding:"0px",margin:"0px",position:"absolute",top:"0px",bottom:"0px",left:"0px",right:"0px"}}>
                What the fuck
            </div>
        </React.StrictMode>,
        document.getElementById("root")
    );

/*<Elements stripe={stripePromise}>
                <App/>
            </Elements> */