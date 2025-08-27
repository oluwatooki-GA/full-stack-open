import {createSlice} from '@reduxjs/toolkit'
const initialState = ''

const notificationSlice = createSlice({
    name: 'notfication',
    initialState,
    reducers: {
        addNotification(state,action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export default notificationSlice.reducer
export const {
    addNotification,
    removeNotification
} = notificationSlice.actions