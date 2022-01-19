import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    )
    {
      setAmountIsValid(false);
      return
    }
    props.onAddToCart(+enteredAmount);
  }
  

      return (
        <form className={classes.form} onSubmit={submitHandler}>
          <Input
            label='Amount'
            ref={amountInputRef}
            input={{
              id: 'amount' + props.id,
              type: 'text',
              min: '1',
              max: '5',
              step: '1',
              defaultValue: '1',
            }}
          />
          <button type='submit'>Add</button>
          {!amountIsValid && <p>Please enter a valid amount (1-5</p>}
        </form>
      );
}

export default MealItemForm;