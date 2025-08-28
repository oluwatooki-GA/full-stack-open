import {createContext, useContext, useReducer} from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
    case "SET_NOTIFICATION": {
        return action.payload;
    }
    case "REMOVE_NOTIFICATION": {
        return ''
    }
    default:
        return state
    }
}

const NotificationContext = createContext();


export const NotificationContextProvider = ({ children }) => {
    const [notification,notificationDispatch] = useReducer(notificationReducer,'')
    const setNotification = (content) =>{
        notificationDispatch({type:'SET_NOTIFICATION',payload:content})
        setTimeout(() => {
            notificationDispatch({type:'REMOVE_NOTIFICATION'})
        },5000)
    }
    return (
        <NotificationContext.Provider value={ [notification, notificationDispatch,setNotification] }>
            {children}
        </NotificationContext.Provider>
    )
}
export default NotificationContextProvider

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useSetNotification = () => {
    const notification = useContext(NotificationContext)
    return notification[2]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}