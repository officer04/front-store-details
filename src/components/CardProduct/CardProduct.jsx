import styles from './CardProduct.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { addProductBasket, getProductsBasket, toggleIsAuth } from '../../Redux/userSlice/userSlice';
import { ROUTES } from '../../const';
import { formatPrice } from '../../utils';

import Button from '../UI/Button/Button';

const CardProduct = ({ title, price, id, imgUrl, isSale }) => {
  const { productsBasket, user, isAuth } = useSelector(({ user }) => user);
  const [isLoad, setIsload] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sale = price * 0.85;
  const formattedPrice = formatPrice(price);
  const formattedSale = formatPrice(sale);
  const handleClick = (e, id) => {
    dispatch(toggleIsAuth(!!localStorage.getItem('token')));
    if (!isAuth) return navigate(ROUTES.LOGIN);

    setIsload(false);
    
    if (productsBasket?.data?.find((item) => item.productId === id)) {
      navigate(ROUTES.BASKET);
      return;
    }
    const productsInfo = {
      productId: id,
      userId: user.id,
    };
    dispatch(addProductBasket(productsInfo)).then((res) => {
      dispatch(getProductsBasket()).then(() => {
        setIsload(true);
      });
    });
  };
  return (
    <div className={styles.cardProduct}>
      <img width={200} height={200} className={styles.img} src={imgUrl} alt={imgUrl} />
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.wrapper}>
        {isSale && <p className={styles.sale}>{formattedSale} ₽</p>}
        {isSale ? (
          <p className={styles.priceSale}>{formattedPrice} ₽</p>
        ) : (
          <p className={styles.price}>{formattedPrice} ₽</p>
        )}
        {isSale && <p className={styles.countSale}>-{isSale}%</p>}
      </div>
      <Button styleWidth={styles.styleWidth} onClick={(e) => handleClick(e, id)}>
        {/* {productsBasket?.data?.find((item) => item.productId === id)
          ? 'Уже в корзине'
          : !isLoad
          ? <AiOutlineLoading3Quarters color="white" size={12} className="rotating-svg" />
          : 'Добавить в корзину'} */}
        {productsBasket?.data?.find((item) => item.productId === id) ? (
          'Уже в корзине'
        ) : !isLoad ? (
          <AiOutlineLoading3Quarters color="white" size={12} className="rotating-svg" />
        ) : (
          'Добавить в корзину'
        )}
      </Button>
    </div>
  );
};

export default CardProduct;
