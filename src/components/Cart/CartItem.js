import style from './CartItem.module.css';

const CartItem = props => {
    const amount = `x ${props.amount}`;
    const price = `$${props.price.toFixed(2)}`;
    return (
        <li className={style['cart-item']}>
            <div className={style.content}>
                <h3>{props.name}</h3>
                <span className={style.price}>{price}</span>
                <span className={style.amount}>{amount}</span>
            </div>
            <div className={style.actions}>
                <button id={style.decrease} onClick={props.onRemove} type='button'>-</button>
                <button onClick={props.onAdd} type='button'>+</button>
            </div>
        </li>
    )
};

export default CartItem;