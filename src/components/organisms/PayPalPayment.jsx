import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PAYPAL_ID } from "../../constants/env";
import { CartContext } from "../../context/CartContext";

const PayPalPayment = ({ value, order }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_ID,
      }}
    >
      <PayPalButtons
        createOrder={(_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value,
                },
                custom_id: order.id,
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((res) => {
            if (res.status === "COMPLETED") {
              navigate("/pago-exitoso");
              dispatch({ type: "CLEAR_CART" });
            } else {
              alert("Tu pado no se procesó. Intenta nuevamente.");
            }
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
