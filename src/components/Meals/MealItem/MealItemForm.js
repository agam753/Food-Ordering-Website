import style from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = props => {
    const [formIsValid, setFormIsValid] = useState(true);
    const itemAmountRef = useRef();
    const submitHandler = e => {
        e.preventDefault();

        const eneteredAmount = +itemAmountRef.current.value;

        if(eneteredAmount < 1 || eneteredAmount > 5)
        {
            setFormIsValid(false);
            return;
        }

        setFormIsValid(true);
        props.onAddToCart(eneteredAmount);
    }
    return <form className={style.form} onSubmit={submitHandler}>
        <Input
            ref={itemAmountRef}
            label='Amount'
            input={{
                id:'amount',
                type:'number',
                max:'5',
                min:'1',
                defaultValue: '1'
            }}

        />
        <button>+ Add</button>
        {!formIsValid && <p className={style.inValid}>Enter valid amount (1-5)</p>}
    </form>
};

export default MealItemForm;