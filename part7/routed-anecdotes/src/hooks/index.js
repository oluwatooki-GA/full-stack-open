import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event,type = 'a') => {
        if (type === 'a') {
            setValue(event.target.value)
        } else {
            setValue('')
        }

    }
    return {
        type,
        value,
        onChange
    }
}