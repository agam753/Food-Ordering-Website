import React, { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import style from './CartButton.module.css';
import CartContext from "../../store/cart-context";

const CartButton = props => {
    const cartCtx = React.useContext(CartContext);

    const [btnBump, setBtnBump] = useState(false);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((val, item) => {
        return val + item.amount;
    }, 0);

    useEffect(() => {
        if (items.length === 0)
            return;

        setBtnBump(true);

        const timer = setTimeout(() => {
            setBtnBump(false);
        }, 300);

        // if we rapidly add or remove items then timer can be running in background

        return () => {
            clearTimeout(timer);
        }

    }, [items]);
    const btnClasses = `${style.btn} ${btnBump ? style.bump : ''}`;

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={style.btnIcon}>
                <CartIcon />
            </span>
            <span className={style.btnText}>Your Cart</span>
            <span className={style.btnNum}>{numberOfCartItems}</span>
        </button>
    )
};

export default CartButton;