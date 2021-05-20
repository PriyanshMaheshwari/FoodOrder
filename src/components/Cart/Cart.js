import React,{Fragment, useContext, useState} from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount:1});
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {

        setIsSubmitting(true);
        await fetch('https://react-prac-34cc1-default-rtdb.firebaseio.com/oders.json',{
            method : 'POST',
            body : JSON.stringify({
                user : userData,
                orderedItems : cartCtx.items
            })
        })

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartitems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(
            (item) => <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)} /> 
        )}
    </ul>

    const modalActions = <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    let modalItem = <Fragment>
        {cartitems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
        {!isCheckout && modalActions}
    </Fragment>

    if(isSubmitting){
        modalItem = <p>Submitting...</p>
    }

    if(didSubmit){
        modalItem = <Fragment>
            <p>Order is placed!!</p>
            <button onClick={props.onClose} className={classes.button}>Close</button>
        </Fragment>
    }

    return(<Modal onClose={props.onClose}>
        {modalItem}
    </Modal>)
}

export default Cart;