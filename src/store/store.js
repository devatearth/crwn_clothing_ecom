import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const middleWare = [logger];
const enhancedMiddleWare = compose(applyMiddleware(...middleWare));
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, enhancedMiddleWare);

export const persistor = persistStore(store);