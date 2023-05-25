import React from "react";
import style from './Checkout.module.css';
import useInput from "../../hooks/use-input";



const validatePinCode = pin => {
    if (pin.trim().length !== 6) return false;

    return Number.isInteger(+pin);
}

const Checkout = props => {

    const {
        enteredVal: enteredName,
        valIsValid: nameIsValid,
        valInvalid: nameInvalid,
        inputChangeHandler: nameInputChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: nameReset
    } = useInput(value => value !== '');
    const {
        enteredVal: enteredStreet,
        valIsValid: streetIsValid,
        valInvalid: streetInvalid,
        inputChangeHandler: streetInputChangeHandler,
        inputBlurHandler: streetInputBlurHandler,
        reset: streetReset
    } = useInput(value => value !== '');
    const {
        enteredVal: enteredCity,
        valIsValid: cityIsValid,
        valInvalid: cityInvalid,
        inputChangeHandler: cityInputChangeHandler,
        inputBlurHandler: cityInputBlurHandler,
        reset: cityReset
    } = useInput(value => value !== '');

    const {
        enteredVal: enteredPincode,
        valIsValid: pincodeIsValid,
        valInvalid: pincodeInvalid,
        inputBlurHandler: pincodeInputBlurHandler,
        inputChangeHandler: pincodeInputChangeHandler,
        reset: pincodeReset
    } = useInput(validatePinCode);

    let formValid = false;

    if(nameIsValid && streetIsValid && cityIsValid && pincodeIsValid)
        formValid = true;
    
    const orderPlacedHandler = event => {
        event.preventDefault();

        if(!formValid) return;


        console.log('form submitted')
        nameReset();
        cityReset();
        streetReset();
        pincodeReset();

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            pincode: enteredPincode
        });
    }

    const nameClasses = `${style.fields} ${nameInvalid ? style.invalid : ''}`
    const streetClasses = `${style.fields} ${streetInvalid ? style.invalid : ''}`
    const cityClasses = `${style.fields} ${cityInvalid ? style.invalid : ''}`
    const pincodeClasses = `${style.fields} ${pincodeInvalid ? style.invalid : ''}`
    return (
        <form className={style.form} onSubmit={orderPlacedHandler}>
            <div className={style.content}>
                <div className={nameClasses}>
                    <label htmlFor="name">Name</label>
                    <input
                        type='text'
                        id="name"
                        onChange={nameInputChangeHandler}
                        onBlur={nameInputBlurHandler}
                        value={enteredName}
                    />
                </div>
                <div className={streetClasses}>
                    <label htmlFor="street">Street</label>
                    <input
                        type='text'
                        id="street"
                        onChange={streetInputChangeHandler}
                        onBlur={streetInputBlurHandler}
                        value={enteredStreet}
                    />
                </div>
                <div className={pincodeClasses}>
                    <label htmlFor="pincode">PinCode</label>
                    <input type='text' id="pincode"
                        onChange={pincodeInputChangeHandler}
                        onBlur={pincodeInputBlurHandler}
                        value={enteredPincode}
                     />
                </div>
                <div className={cityClasses}>
                    <label htmlFor="city">City</label>
                    <input type='text' id="city"
                        onChange={cityInputChangeHandler}
                        onBlur={cityInputBlurHandler}
                        value={enteredCity}
                    />
                </div>
            </div>
            <div className={style.actions}>
                <button className={style.cancel} type="button" onClick={props.onCancel}>Cancel</button>
                <button disabled={!formValid}>Confirm</button>
            </div>
        </form>
    )
};

export default Checkout;