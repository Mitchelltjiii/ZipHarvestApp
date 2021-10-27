import React, { useState, useEffect } from 'react';

const ProductDisplay = () => (
  <section>
    <div className="product">
      <div className="description">
        <h3>Premium one</h3>
        <h5>$0.50 / month</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <input type="hidden" name="lookup_key" value="premiumone" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const SuccessDisplay = ({ sessionId }) => {
  console.log("Session ID: " + sessionId);
  return (
    <section>
      <div>
        <div>
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function StripeForm() {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  let [subscriptionId, setSubscriptionId] = useState('');


  async function getProducts(){
    console.log("Get Products");
    const response = await fetch(`/get-products`);
    const json = await response.json();
    try{
      console.log("products json: " + json);
    }catch(err){
  
    }
    try{
      console.log("Products json(STRING): " + JSON.stringify(json));
    }catch(err){
      
    }
  }
  
  getProducts();

  console.log("Stripeform load - subscriptionID: " + subscriptionId)

  async function getSession(sessionId){
    console.log("Try to get session");
    const response = await fetch(`/get-session/${sessionId}`);
    const json = await response.json();
    try{
      console.log("session json: " + json);
    }catch(err){
  
    }
    try{
      console.log("Session json(STRING): " + JSON.stringify(json));
    }catch(err){
      
    }
    try{
      console.log("Sub ID: " + json.subscription);
    }catch(err){

    }
    return json.subscription;
  }

  async function getSubscription(subscriptionId){
    console.log("Try to get subscription");
    const response = await fetch(`/get-subscription/${subscriptionId}`);
    const json = await response.json();
    try{
      console.log("sub json: " + json);
    }catch(err){
  
    }
    try{
      console.log("sub json(STRING): " + JSON.stringify(json));
    }catch(err){
      
    }
    return json.id;
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
      setSubscriptionId(getSubscription(getSession(query.get('session_id'))));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}



