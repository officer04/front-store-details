import styles from './Card.module.scss';

import { Link } from 'react-router-dom';

import { ROUTES } from '../../const';

const Card = ({title, text, img, id}) => {
  return (
    <Link className={styles.card} to={`${ROUTES.PRODUCTS}/${id}`}>
      <img src={img} alt={img} />
      <div className={styles.wrapper}>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default Card;
