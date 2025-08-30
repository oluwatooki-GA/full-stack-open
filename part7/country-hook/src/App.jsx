import React, { useState, useEffect } from 'react'
import axios from 'axios'

// custom hook for input fields
const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return { type, value, onChange }
}

// custom hook for fetching country data
const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (!name) return

        const fetchCountry = async () => {
            try {
                const res = await axios.get(
                    `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
                )
                setCountry({ found: true, data: res.data })
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setCountry({ found: false })
                } else {
                    console.error('Error fetching country:', err)
                }
            }
        }

        fetchCountry()
    }, [name])

    return country
}

// component for rendering a country
const Country = ({ country }) => {
    if (!country) return null
    if (!country.found) return <div>not found...</div>

    const { name, capital, population, flags } = country.data

    return (
        <div>
            <h3>{name.common}</h3>
            <div>capital {capital}</div>
            <div>population {population}</div>
            <img src={flags.svg} height="100" alt={`flag of ${name.common}`} />
        </div>
    )
}

// main app component
const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const handleSubmit = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input {...nameInput} />
                <button type="submit">find</button>
            </form>

            <Country country={country} />
        </div>
    )
}

export default App
