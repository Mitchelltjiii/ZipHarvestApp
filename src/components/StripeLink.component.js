import React, { useEffect } from "react";

function StripeLink() {

  useEffect(() => {
    window.location.href = "https://buy.stripe.com/test_3csdU5eu3bkMeVa8ww";
  }, []);

  return (
    <div>
      <h2>Stripe</h2>
    </div>
  );
}

export default StripeLink;