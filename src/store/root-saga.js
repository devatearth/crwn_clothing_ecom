import { all, call } from 'redux-saga/effects';

import { fetchCategorieSaga } from './categories/category.saga';
import { userSagas } from './user/user.sage';

export function* rootSaga() {
    yield all([call(fetchCategorieSaga), call(userSagas)]);
}