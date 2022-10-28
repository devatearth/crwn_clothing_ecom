import { useEffect, createContext, useReducer } from "react";
import { onUserAuthChangedLister, createUserDocumentFromAuth } from "../utils/firebase/firebase-utils";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

const INTIAL_STATE = {
    currentUser: null,
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: payload };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}


export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INTIAL_STATE);
    const { currentUser } = state;
    const setCurrentUser = (user) =>
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unSubscribe = onUserAuthChangedLister((user) => {
            if (user) { createUserDocumentFromAuth(user); }
            setCurrentUser(user);
        });
        return unSubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
