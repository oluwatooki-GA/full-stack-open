import { useState, useEffect } from 'react'
import axios from 'axios'

// custom hook for input fields
const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => setValue(e.target.value)
    const reset = () => setValue('')

    return {
        type,
        value,
        onChange,
        onSubmit: reset
    }
}

// custom hook for working with resources
const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await axios.get(baseUrl)
                setResources(res.data)
            } catch (err) {
                console.error('Error fetching resources:', err)
            }
        }

        fetchResources()
    }, [baseUrl])

    const create = async (newResource) => {
        try {
            const res = await axios.post(baseUrl, newResource)
            setResources((prev) => [...prev, res.data])
        } catch (err) {
            console.error('Error creating resource:', err)
        }
    }

    return [resources, { create }]
}

// main app
const App = () => {
    const content = useField('text')
    const name = useField('text')
    const number = useField('text')

    const [notes, noteService] = useResource('http://localhost:3005/notes')
    const [persons, personService] = useResource('http://localhost:3005/persons')

    const handleNoteSubmit = (e) => {
        e.preventDefault()
        noteService.create({ content: content.value })
        content.onSubmit()
    }

    const handlePersonSubmit = (e) => {
        e.preventDefault()
        personService.create({ name: name.value, number: number.value })
        name.onSubmit()
        number.onSubmit()
    }

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button type="submit">create</button>
            </form>
            {notes.map((n) => (
                <p key={n.id}>{n.content}</p>
            ))}

            <h2>Persons</h2>
            <form onSubmit={handlePersonSubmit}>
                <div>
                    name <input {...name} />
                </div>
                <div>
                    number <input {...number} />
                </div>
                <button type="submit">create</button>
            </form>
            {persons.map((p) => (
                <p key={p.id}>
                    {p.name} {p.number}
                </p>
            ))}
        </div>
    )
}

export default App
