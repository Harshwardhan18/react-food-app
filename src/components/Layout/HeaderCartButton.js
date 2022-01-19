import { Fragment, useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const numberOfItems = ctx.items.reduce((acc, item) => acc + item.amount, 0);
  const btnClass = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
  
  useEffect(() => {
    if (ctx.items.length === 0) { return}
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => setBtnIsHighlighted(false), 200);

    return () => clearTimeout(timer);
   }, [ctx.items]);
  return (
    <Fragment>
      <button className={btnClass} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
                    <span className={classes.badge}>{ numberOfItems }</span>
      </button>
    </Fragment>
  );
};

export default HeaderCartButton;
