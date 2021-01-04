import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import logo from "../tshirt_icon.png";
import { totalAmount } from "./helper/cartHelper";

const paymentStripe = (products, amount, address, setSuccess, success) => {
  const auth = isAuthenticated();
  const onToken = (token) => {
    // let amount = totalAmount();
    const body = {
      token,
      products,
      address,
      user: auth.user,
      amount: totalAmount(),
    };
    const headers = {
      "Content-Type": "application/json",

      Authorization: `Bearer ${auth.token}`,
    };
    return fetch(`${API}/payment/gateway_stripe/${auth.user._id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 200) {
        setSuccess(!success);
      }
      console.log(response.json());
    });
  };
  const loadPayment = () => {
    return (
      <StripeCheckout
        image={logo}
        name={"My Tshirt"}
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPEPK}
        amount={amount * 100}
      >
        <button className="btn btn-danger">Pay with stripe</button>
      </StripeCheckout>
    );
  };
  return <div className="m-4">{loadPayment()}</div>;
};

export default paymentStripe;
