import { all, call } from 'typed-redux-saga/macro';

import { fetchCategorieSaga } from './categories/category.saga';
import { userSagas } from './user/user.sage';

export function* rootSaga() {
    yield* all([call(fetchCategorieSaga), call(userSagas)]);
}