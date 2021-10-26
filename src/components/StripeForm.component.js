import React, { useState, useEffect } from "react";
const handleTryStripe = (event) => {
  tryStripe();
};

function tryStripe(){
fetch('/create-checkout-session', {
  method: 'POST',
})
.then(function(response) {
  return response.json();
})
.then(function(session) {
  return stripe.redirectToCheckout({ sessionId: session.id });
})
.then(function(result) {
  // If `redirectToCheckout` fails due to a browser or network
  // error, you should display the localized error message to your
  // customer using `error.message`.
  if (result.error) {
    alert(result.error.message);
  }
});
}
const ProductDisplay = () => (
  <div>
    <Button color="secondary" type="submit" variant="contained" onClick={handleTryStripe}>Try Stripe</Button> 
  </div>
  /*<section>
    <div>
      <div>
      <h3>Premium</h3>
      <h5>$0.50</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>*/
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function StripeForm() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}
