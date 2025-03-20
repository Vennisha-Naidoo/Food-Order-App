import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error.jsx";
import { useActionState } from "react";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, error, sendRequest, clearData } = useHttp("http://localhost:3000/orders", requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function checkoutAction(prevState, formData) {

        const customerData = Object.fromEntries(formData.entries());

        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        );
    }

    const [ formState, formAction, isSending ] = useActionState(checkoutAction, null);


    let actions = (
        <>
        <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
        <Button>Confirm Order</Button>
        {/* <Button disabled={ isSending }>{ isSending ? "Confirming Order" : "Confirm Order"}</Button> */}
        </>
    )

    if (isSending) {
        actions = <span>Sending Order...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === "checkout"} onClose={ handleFinish }>
            <h2>Order Successful!</h2>
            <p>
                You will recieve further updates in a few minutes!
            </p>
            <p className="modal-actions">
                <Button onClick={ handleFinish }>Close</Button>
            </p>
        </Modal>
    }

    return <Modal
        open={userProgressCtx.progress === "checkout"} onClose={handleCloseCheckout}>
        <form action={ formAction }>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="Email Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>

            {
                error &&
                <Error title="Failed To Checkout!" message={ error } />
            }

            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}