import { Link } from 'react-router-dom';
import styles from './Reviews.module.scss';
import { ROUTES } from '../../const';

const Reviews = () => {
  const reviews = [
    "./img/reviews1.jpg", './img/reviews2.jpg', "./img/reviews3.jpg", "./img/reviews4.jpg"
  ]
  return (
    <div className={styles.reviews}>
      <div className={styles.container}>
        <h1 className={styles.title}>Отзывы наших покупателей:</h1>
        <h2 className={styles.subtitle}>Посмотреть и оставить отзыв вы можете в группе<Link className={styles.link} to={ROUTES.VK_GROUP}> ВК</Link>.</h2>
        <div className={styles.wrapper}>
          {reviews.map(review => <img width={580} height={250} src={review} alt={review}/>)}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
