import { CATEGORIES_ACTION_TYPE } from "./catrgories.type";
const INTIAL_STATE = {
    categories: []
};

export const categoriesReducer = (state = INTIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP:
            return { ...state, categories: payload };

        default:
            return state;
    }
} 