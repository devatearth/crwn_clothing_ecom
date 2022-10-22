// import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../component/category-preview/category-preview.component';
// import Category from '../category/category.component';

import './shop-style.scss'

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className='shop-container'>
      {Object.keys(categoriesMap).map((key) => {
        const products = categoriesMap[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </div>
  );
};

export default Shop;