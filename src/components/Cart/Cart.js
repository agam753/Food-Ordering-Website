import React, { useContext, useState } from 'react';
import style from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';



const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({
            ...item,
            amount: 1
        })
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const checkoutHandler = event => {
        setIsCheckout(true);
    }

    const orderSubmitHandler = async user => {
        setSubmittingOrder(true);
        const response = await fetch('https://react-http-de5da-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user,
                orderedItems: cartCtx.items
            })
        });

        if (response.ok) {
            setSubmittingOrder(false);
            setOrderSubmitted(true);
            cartCtx.clearCart();
        }

    }

    const cartItems = <ul className={style['cart-items']}>
        {cartCtx.items.map(meal => {
            return <CartItem
                key={meal.id}
                name={meal.name}
                price={meal.price}
                amount={meal.amount}
                onAdd={cartItemAddHandler.bind(null, meal)}
                onRemove={cartItemRemoveHandler.bind(null, meal.id)}
            />
        })}
    </ul>;

    const actions = <div className={style.actions}>
        <button onClick={props.onHideCart} className={style['button--alt']}>Close</button>
        {hasItems && <button className={style.button} onClick={checkoutHandler} >Order</button>}
    </div>;

    // main modal content
    const modalContent = <React.Fragment>
        {cartItems}
        <div className={style.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        {isCheckout && <Checkout onConfirm={orderSubmitHandler} onCancel={props.onHideCart} />}

        {!isCheckout && actions}
    </React.Fragment>

    // order placed message
    const orderPlaced = <React.Fragment>
        <span className={style.placedText}>Order placed successfully.</span>
        <button onClick={props.onHideCart} className={style.placedButton}>Close</button>
    </React.Fragment>

    return <Modal onHideCart={props.onHideCart}>
        {!submittingOrder && !orderSubmitted && modalContent}
        {submittingOrder && <p className={style.placedText}>We're processing your order..</p>}
        {orderSubmitted && orderPlaced}
    </Modal>
}

export default Cart;