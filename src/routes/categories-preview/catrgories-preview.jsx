import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector';
import CategoryPreview from '../../component/category-preview/category-preview.component';


const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesMap);
  return (
    <>
      {categories ? Object.keys(categories).map((key) => {
        const products = categories[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      }) : ''}
    </>
  );
};

export default CategoriesPreview;