import classes from './Card.module.css';

// component which will apply a background colour and border styling
const Card = (props) => {
  return (
    <form className={`${classes.card} ${props.className}`}>
      {props.children}
    </form>
  );
};

export default Card;
