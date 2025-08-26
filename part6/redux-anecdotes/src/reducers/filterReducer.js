const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.payload
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type:'CHANGE_FILTER',
        payload: filter
    }
}
export default filterReducer