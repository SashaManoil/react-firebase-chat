import { userContants } from "../actions/constants";
import { IAction } from "../interfaces";

const initState = {
    users: [],
    conversations: []
}


const userReducer = (state = initState, action: IAction) => {
    switch (action.type) {
        case `${userContants.GET_REALTIME_USER}_REQUEST`:
            
            break;
        case `${userContants.GET_REALTIME_USER}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case `${userContants.GET_REALTIME_MESSAGES}`:
            state = {
                ...state,
                conversations: action.payload.conversations,
            }
            break;
    }

    return state;
}

export default userReducer;