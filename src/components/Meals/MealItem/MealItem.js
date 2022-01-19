import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';


const MealItem = ({ id, name, description, price }) => {
  const priceFormatted = `$${price.toFixed(2)}`;
  const cartContext = useContext(CartContext);
  const addToCartHandler = amt => {
    cartContext.addItem({ id, name, description, price, amount: amt });
   }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceFormatted}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
