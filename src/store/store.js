import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();


const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware,].filter(
    Boolean
);

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const enhancedMiddleWare = composeEnhancer(applyMiddleware(...middleWares));

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, enhancedMiddleWare);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

