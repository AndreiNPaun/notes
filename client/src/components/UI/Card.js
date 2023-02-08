import classes from './Card.module.css';

// component which will apply a background colour and border styling
const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
