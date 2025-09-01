import { createContext,useReducer,useContext } from "react";

const notificationsReducer = (state,action) => {
    console.log(action,state)
    switch (action.type) {
        case "ADD_NOTIFICATION": {
            return [...state, action.payload];
        }
        case "REMOVE_NOTIFICATION": {
            return state.filter(notification => notification.id !== action.payload.id);
        }
    }
}

const NotificationsContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications,dispatch] = useReducer(notificationsReducer,[])

    return (
        <NotificationsContext.Provider value={{notifications,dispatch}}>
            {children}
        </NotificationsContext.Provider>
    )
}

export const useNotifications = () => {
    const {notifications} = useContext(NotificationsContext);
    return notifications;
}

export const useNotificationHandler = () => {
    const { dispatch } = useContext(NotificationsContext);
    return (payload) => {
        dispatch({type:'ADD_NOTIFICATION',payload:payload});
        setTimeout(() => {
            dispatch({ type: "REMOVE_NOTIFICATION", payload })
        }, 5000)
    }
}