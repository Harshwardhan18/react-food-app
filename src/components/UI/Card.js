import classes from './Card.module.css';

const Card = ({ children, className, style }) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
