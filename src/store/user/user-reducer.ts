import { USER_ACTION_TYPES } from "./user.types";
import { UserData } from "../../utils/firebase/firebase-utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, UserAction } from "./user.action";
export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};
const INTIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INTIAL_STATE, action: UserAction) => {
    if (signInSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    }

    if (signOutSuccess.match(action)) {
        return { ...state, currentUser: null };
    }
    if (
        signOutFailed.match(action) ||
        signInFailed.match(action) ||
        signUpFailed.match(action)
    ) {
        return { ...state, error: action.payload };
    }
    return state;
}