import { CATEGORIES_ACTION_TYPE } from "./catrgories.type";

export const setCategoriesMap = (categories) => (
    {
        type: CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP,
        payload: categories
    }
);