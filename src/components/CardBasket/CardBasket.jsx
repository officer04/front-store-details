import styles from './CardBasket.module.scss';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

import { formatPrice } from '../../utils';

const CardBasket = ({
  productImg,
  price,
  count,
  title,
  remove,
  id,
  handleClick,
  productSum,
  sale,
}) => {
  const [counts, setCount] = useState(count);
  const increment = () => {
    if (counts === 10) return;
    setCount((prev) => prev + 1);
    handleClick(counts + 1, id);
  };

  const decrement = () => {
    if (counts === 1) return;
    setCount((prev) => prev - 1);
    handleClick(counts - 1, id);
  };

  const formattedPrice = formatPrice(productSum);
  const sales = productSum * ((100 - sale) / 100);
  const formattedPriceSale = formatPrice(sales);

  return (
    <div className={styles.cardBasket}>
      <img width={150} height={170} src={productImg} alt="" />
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.wrapper}>
        <div className={styles.wrapperRight}>
          <div className={styles.wrapperButton}>
            <button onClick={decrement}>
              <FaMinus />
            </button>
            <p>{counts}</p>
            <button onClick={increment}>
              <FaPlus />
            </button>
          </div>
          <div className={styles.wrapperSale}>
            {sale ? (
              <>
                <p className={styles.priceSale}>{formattedPriceSale} ₽</p>
                <span className={styles.price}>{formattedPrice}</span>
              </>
            ) : (
              <p className={styles.priceSale}>{formattedPrice} ₽</p>
            )}
          </div>
        </div>
        <p className={styles.remove} onClick={() => remove(id)}>
          Удалить
        </p>
      </div>
    </div>
  );
};

export default CardBasket;
