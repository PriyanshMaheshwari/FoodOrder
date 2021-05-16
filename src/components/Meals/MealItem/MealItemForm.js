import React,{useRef,useState} from "react"
import Input from "../../UI/Input"
import classes from "./MealItemForm.module.css"

const MealItemForm = (props) => {

    const amountInputRef = useRef();
    const [amountIsValid,setAmountIsvalid] = useState(true); 

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsvalid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return(<form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef} label="Amount" input={{
            id : 'amount_' + props.id,
            min : 1,
            type : 'number',
            max : 5,
            defaultValue : 1,
            step : 1
        }}></Input>
        <button>+ Add</button>
        {!amountIsValid && <p>Enter valid amount i.e. from 1 to 5</p>}
    </form>)
}

export default MealItemForm;