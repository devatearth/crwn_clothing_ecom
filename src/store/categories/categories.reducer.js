import { CATEGORIES_ACTION_TYPE } from "./catrgories.type";
const INTIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
};

export const categoriesReducer = (state = INTIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: payload };
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
            return { ...state, error: payload };
        default:
            return state;
    }
} 