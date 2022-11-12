import { takeLatest, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase-utils'
import { fetchCategoriesSuccess, fetchCategoriesFailure, } from './catrgories.action';

import { CATEGORIES_ACTION_TYPE } from './catrgories.type';

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield* put(fetchCategoriesFailure(error as Error));
    }
}

export function* fetchCategorieSaga() {
    yield* takeLatest(
        CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}