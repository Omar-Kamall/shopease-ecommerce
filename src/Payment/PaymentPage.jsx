import { memo, useEffect } from "react";
import { useCart } from "../Api/useCart";

const loadPaypalScript = (clientId) => {
  return new Promise((resolve) => {
    if (document.getElementById("paypal-sdk")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const CheckOut = ({ totalPrice, statePayment }) => {
  const { showCheckout, setShowCheckout } = statePayment;

  const { clearCart } = useCart();
  useEffect(() => {
    loadPaypalScript(
      "AbrJkWi15mxFArV8Tx5lu7HvLkSsDJxqNqPWyr-ac59WN_6ASAqCfTn860vYdQzN_S9SwaKYPowZOXJJ"
    ).then(() => {
      const paypalContainer = document.getElementById(
        "paypal-button-container"
      );
      if (
        window.paypal &&
        paypalContainer &&
        !paypalContainer.hasChildNodes()
      ) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: (typeof totalPrice === "number"
                        ? totalPrice.toFixed(2)
                        : "0.00"
                      ).toString(),
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then(() => {
                clearCart();
                setShowCheckout(false);
                alert("Transaction completed ...");
              });
            },
            onError: (err) => {
              console.error("PayPal Checkout error", err);
            },
          })
          .render("#paypal-button-container");
      }
    });
  }, [totalPrice, showCheckout, setShowCheckout, clearCart]);

  return (
    <div
      id="paypal-button-container"
      className="w-full max-w-lg min-w-70"
    ></div>
  );
};

export default memo(CheckOut);
