import { CATEGORIES_ACTION_TYPE, Category } from "./catrgories.type";
import { CategoryAction, fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from "./catrgories.action";

export type categoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean,
    readonly error: Error | null;
}

const INTIAL_STATE: categoriesState = {
    categories: [],
    isLoading: false,
    error: null
};

export const categoriesReducer = (
    state = INTIAL_STATE,
    action = {} as CategoryAction
) => {
    if (fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true };
    }

    if (fetchCategoriesSuccess.match(action)) {
        return { ...state, categories: action.payload, isLoading: false };
    }

    if (fetchCategoriesFailure.match(action)) {
        return { ...state, error: action.payload, isLoading: false };
    }

    return state;
} 