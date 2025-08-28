import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

const notificationSlice = createSlice({
    name: "notfication",
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload;
        },
        removeNotification() {
            return "";
        },
    },
});
export const setNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(addNotification(message));
        setTimeout(() => {
            dispatch(removeNotification());
        }, time * 1000);
    };
};
export default notificationSlice.reducer;
export const { addNotification, removeNotification } =
  notificationSlice.actions;
