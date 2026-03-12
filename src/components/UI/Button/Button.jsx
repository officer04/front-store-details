import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const Button = ({ children, styleMargin, styleWidth, styleColor, to, ...props }) => {
  if (to) {
    return (
      <Link to={to} className={`${styles.button} ${styleColor}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${styles.button} ${styleMargin} ${styleWidth}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
