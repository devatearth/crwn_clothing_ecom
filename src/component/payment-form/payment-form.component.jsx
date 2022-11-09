import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user-selector";

import { FormContainer } from "./payment-form.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button-component";

import { PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount * 100,
            }),
        }).then((res) => {
            return res.json();
        });

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "guest",
                    address: { "city": "mumbai", "country": "US", "line1": "unr", "line2": "thane", "postal_code": "421005", "state": "maharashtra" },
                },
            },
        });

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment Successful!");
            }
        }
        setIsProcessingPayment(false);
    };

    return (
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment:</h2>
            <CardElement />
            <PaymentButton
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                isLoading={isProcessingPayment}
            >
                Pay Now
            </PaymentButton>
        </FormContainer>
    );
};
export default PaymentForm;