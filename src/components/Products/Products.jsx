import styles from './Products.module.scss';

import { useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import React from "react"

import CardProduct from '../CardProduct/CardProduct';
import { useCategoryData } from './../../hooks/useCategoryData';

const CategoryTitle = ({ className, children }) => {
  <h1 className={className}>{children}</h1>;
};

const ProductsList = React.memo(({ products }) => (
  <div className={styles.wrapper}>
    {products?.map((product) => (
      <CardProduct key={product._id} id={product._id} {...product} />
    ))}
  </div>
));

const Products = () => {
  const { id } = useParams();
  const { products, category, isLoading } = useCategoryData(id);

  return (
    <div className={styles.products}>
      <div className={styles.container}>
        <CategoryTitle className={styles.title}>
          {!isLoading ? 'Название категории' : category?.title}
        </CategoryTitle>
        {!isLoading ? (
          <div className={styles.wrapperLoading}>
            <AiOutlineLoading3Quarters color="#595fef" size={60} className="rotating-svg" />
          </div>
        ) : (
          <div className={styles.wrapper}>
            <ProductsList products={products}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
