import { Link } from 'react-router-dom';
import styles from './ButtonLink.module.scss';

const ButtonLink = ({ children, styleColor, ...props }) => {
  return (
    <Link className={`${styles.buttonLink} ${styleColor}`} {...props}>
      {children}
    </Link>
  );
};

export default ButtonLink;
