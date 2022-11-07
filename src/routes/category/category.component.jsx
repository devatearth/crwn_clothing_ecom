import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../../component/product-card/product-card-component';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/categories.selector';
import './category.styles.scss';
import Spinner from '../../component/spinner/spinner.component';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      {isLoading ? <Spinner /> :
        <div className='category-container'>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      }
    </Fragment>
  );
};

export default Category;