import { useEffect, useState } from "react";
import { createContext } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase-utils";

export const CategoriesContext = createContext({
    products: [],
    setProducts: () => { },
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(() => {
        const getCategoriesMap = async () => {
            const map = await getCategoriesAndDocuments();
            setCategoriesMap(map);
        }
        getCategoriesMap();
    }, []);

   const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}