import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalAmount = "$" + ctx.totalAmount.toFixed(2);
  const hasItems = ctx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckoutOpen(true);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-food-app-a241a-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        items: ctx.items,
      })
    })
    setIsSubmitting(false);
    ctx.clearCart();
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkoutBtns = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCartHide}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClick={props.onCartHide}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckoutOpen && <Checkout onCancel={props.onCartHide} onConfirm={submitOrderHandler}/>}
      {!isCheckoutOpen && checkoutBtns}
    </Modal>
  );
};

export default Cart;
