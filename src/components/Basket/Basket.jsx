import styles from './Basket.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { ROUTES } from '../../const';
import {
  getProductsBasket,
  removeProductBasket,
  updateProductsBasket,
} from '../../Redux/userSlice/userSlice';
import { formatPrice } from '../../utils';

import Button from '../UI/Button/Button';
import CardBasket from '../CardBasket/CardBasket';
import debounce from 'lodash.debounce';

const Basket = () => {
  const { productsBasket, isLoading } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const sum = `${productsBasket?.sumAll}`;
  const formatSumAll = formatPrice(sum);
  const sumSale = `${productsBasket?.sumAllSale}`;
  const formatSumAllSale = formatPrice(sumSale);
  const totalPrice = productsBasket?.sumAll - productsBasket?.sumAllSale;
  const formatTotalPrice = formatPrice(totalPrice);

  useEffect(() => {
    dispatch(getProductsBasket());
  }, [dispatch]);

  const handleClickDeleteBasketProduct = (id) => {
    dispatch(removeProductBasket(id)).then(() => {
      dispatch(getProductsBasket());
    });
  };

  const handleClick = debounce((count, id) => {
    const body = { count: count, productId: id };
    dispatch(updateProductsBasket(body)).then(() => {
      dispatch(getProductsBasket());
    });
  }, 1000);

  return (
    <div className={styles.basket}>
      <div className={styles.container}>
        {!isLoading ? (
          <div className={styles.wrapperLoading}>
            <AiOutlineLoading3Quarters color="#595fef" size={60} className="rotating-svg" />
          </div>
        ) : productsBasket?.data?.length === 0 ? (
          <div className={styles.head}>
            <h1>У вас пустая корзина</h1>
            <p>Хотите что-нибудь купить?</p>
            <Button to={ROUTES.ASSORTMENT}>Перейти в ассортимент</Button>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>
              Корзина <span>{productsBasket?.countAll}</span>
            </h1>
            <div className={styles.wrapper}>
              <div className={styles.wrapperCard}>
                {productsBasket?.data?.map((product) => (
                  <CardBasket
                    key={product.productId}
                    id={product.productId}
                    title={product.productTitle}
                    price={product.productPrice}
                    productImg={product.productImg}
                    count={product.productCount}
                    productSum={product.productSum}
                    sale={product.productSale}
                    remove={handleClickDeleteBasketProduct}
                    handleClick={handleClick}
                  />
                ))}
              </div>
              <div className={styles.cardSumma}>
                <h3>Детали заказа</h3>
                <p className={styles.text}>
                  {productsBasket?.countAll}{' '}
                  {productsBasket?.countAll === 1
                    ? 'товар'
                    : productsBasket?.countAll <= 4
                    ? 'товара'
                    : 'товаров'}
                  ..............{formatSumAll} ₽
                </p>
                <p className={styles.text}>Скидка................- {formatSumAllSale} ₽</p>
                <p className={styles.sale}>Следите за скидками на сайте</p>
                <p className={styles.text1}>Итого.....................{formatTotalPrice} ₽</p>
                <Button>Перейти к оплате</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
