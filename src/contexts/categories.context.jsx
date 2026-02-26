import { createContext, useState, useEffect } from "react";

import { getDocumentsAndCategories } from '../utils/firebase/firebase.utils.js'



export const CategoriesContext = createContext({
   categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getDocumentsAndCategories();
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, [])

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> { children } </CategoriesContext.Provider>
    )
}