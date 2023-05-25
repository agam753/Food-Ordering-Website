import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import style from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
    const price = `$${props.meal.price.toFixed(2)}`;

    const cartCtx = useContext(CartContext);

    const addToCartHandler = amount => {

        const item = {
            name: props.meal.name,
            amount: amount,
            price: props.meal.price,
            id: props.meal.id
        }

        // console.log(item);

        cartCtx.addItem(item);
    }
    return (
        <li className={style.meal}>
            <div>
                <h3>{props.meal.name}</h3>
                <p className={style.description}>{props.meal.description}</p>
                <p className={style.price}>{price}</p>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
};

export default MealItem;