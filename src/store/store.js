import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";

const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk,].filter(
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

export const persistor = persistStore(store);