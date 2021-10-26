import React, { useEffect } from "react";

function StripeLink() {

  useEffect(() => {
    window.location.href = "https://buy.stripe.com/test_3csdU5eu3bkMeVa8ww";
  }, []);

  return (
    <div>
    </div>
  );
}

export default StripeLink;