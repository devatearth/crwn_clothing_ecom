import { useEffect } from "react";
import { createContext, useState } from "react";
import { onUserAuthChangedLister } from "../utils/firebase/firebase-utils";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});


export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const userAuth = onUserAuthChangedLister((user) => {
            if (user) { createUserDocumentFromAuth(user); }
            setCurrentUser(user);
        });
        return userAuth;
    })

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
