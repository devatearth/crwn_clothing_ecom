import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/categories.selector';
import CategoryPreview from '../../component/category-preview/category-preview.component';
import Spinner from '../../component/spinner/spinner.component';


const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  return (
    <>{isLoading ? <Spinner /> :
      categories ? Object.keys(categories).map((key) => {
        const products = categories[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      }) : ''
    }
    </>
  );
};

export default CategoriesPreview;