import { compose, createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const sagaMiddleware = createSagaMiddleware();


const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware,]
    .filter((middleware): middleware is Middleware => Boolean(middleware));;

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const enhancedMiddleWare = composeEnhancer(applyMiddleware(...middleWares));

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
};
const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, enhancedMiddleWare);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

