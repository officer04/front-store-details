import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsBasket } from '../Redux/userSlice/userSlice';

import { getCategoryById, getProductsByCategory } from '../Redux/productsSlice/productsSlice';


export const useCategoryData = (categoryId) => {
  const dispatch = useDispatch();
  const { products, category, isLoading, error } = useSelector(({ products }) => products);

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategory(categoryId));
      dispatch(getCategoryById(categoryId));
    }
    dispatch(getProductsBasket());
  }, [categoryId, dispatch]);

  return { products, category, isLoading, error };
};