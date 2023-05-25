import { useState } from "react";


// every key-stroke
const useInput = (validateValue) => {
    const [enteredVal, setEnteredVal] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    
    const valIsValid = validateValue(enteredVal);
    const valInvalid = !valIsValid && isTouched;

    const inputChangeHandler = event => {
        setIsTouched(true);
        setEnteredVal(event.target.value);
    }
    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredVal('');
        setIsTouched(false);
    }


    return {
        enteredVal, 
        valIsValid,
        valInvalid,
        inputChangeHandler,
        inputBlurHandler,
        reset
    }
};

export default useInput;