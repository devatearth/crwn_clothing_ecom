import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase-utils';
import { setCategoriesMap } from '../../store/categories/catrgories.action';
import CategoriesPreview from '../categories-preview/catrgories-preview';
import Category from '../category/category.component';
import './shop-style.scss'

const Shop = () => {
  console.log('inside shop comp ');
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryArray = await getCategoriesAndDocuments();
      console.log({ categoryArray });
      dispatch(setCategoriesMap(categoryArray));
    }
    getCategoriesMap();
  }, [dispatch]);

  useEffect(() => {
    console.log('dev');
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;