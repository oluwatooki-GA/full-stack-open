import {useEffect, useState} from 'react'
import {addPersons, deletePerson, getPersons, updatePerson} from './services/persons.js'
import Notification from "./components/Notification.jsx";

const Filter = ({ inputFilter,searchTerm }) => {
    return (
        <div>
            filter shown with a <input value={searchTerm} onChange={inputFilter}/>
        </div>
    );
};


const PersonForm = ({ addName,newName,setNewName,newNumber,setNewNumber }) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName}
                             onChange={(event) => setNewName(event.target.value)}/>
            </div>
            <div>
                number: <input value={newNumber}
                               onChange={(event) => setNewNumber(event.target.value)}/>
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};


const Persons = ({searchedPersons, deleteName}) => {
    // console.log(searchedPersons)
    return (
        <div>

            { searchedPersons.map(person =>
                <div key={person.id} style={{display: 'flex','gap':25,'align-items':'center'}}>
                    <p key={person.name}>{person.name} {person.number} </p>
                    <button style={{height: 25}} onClick={ () => deleteName(person)}>delete</button>
                </div>
            )}

        </div>
    );
};


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchedPersons, setSearchedPersons] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [message, setMessage] = useState(null)


    const resetPersonsList = () => {
        getPersons().then(response => {
            setPersons(response)
            setSearchedPersons(response.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())))
        })
    }

    const inputFilter = (event) => {
        event.preventDefault()
        setSearchTerm(event.target.value)
        setSearchedPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()) ))
    }

    const addName = (event) => {
        event.preventDefault()
        const foundPerson = persons.find(person => person.name === newName)

        const newPerson = {
            name: newName, number: newNumber,
            id: String(Math.max(...persons.map(person => Number(person.id))) + 1)
        }

        if (foundPerson !== undefined) { // if you found a person
            if (confirm(`${newName} already exists, do you want to replace it?`)) {
                updatePerson(foundPerson.id, {name: newName, number: newNumber}).then( () => {
                    setNewName('')
                    setNewNumber('')
                    setMessage({color:'green',message:`updated ${newPerson.name}`})

                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    resetPersonsList()
                }).
                catch((error) => {
                    setMessage({color:'red',message:`The information of ${newPerson.name} has already been removed from the server`})
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
            }
            return

        }

        addPersons(newPerson).then( () => {
            setNewName('')
            setNewNumber('')
            setMessage({color:'green',message:`Added ${newPerson.name}`})

            setTimeout(() => {
                setMessage(null)
            }, 5000)
            resetPersonsList()
        }).catch((error) => {
            setMessage({color:'red',message:`There was an error adding ${newPerson.name}\nerror: ${error}`})

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        })

    }

    const deleteName = (person) => {
        if ( window.confirm(`do you really want to delete ${person.name}?`) ) {
            deletePerson(person.id).then(resetPersonsList)
        }
    }

    useEffect(() => {
        getPersons().then(response => {
            setPersons(response)
            setSearchedPersons(response)
            })
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
            { message &&
                <Notification message={message.message} color={message.color}/>
            }
            <Filter searchTerm={searchTerm} inputFilter={inputFilter} />

            <h3>Add a new number</h3>

            <PersonForm addName={addName} newName={newName} newNumber={newNumber}
                        setNewNumber={setNewNumber} setNewName={setNewName}/>

            <h2>Numbers</h2>

            <Persons searchedPersons = {searchedPersons} deleteName={deleteName}/>
        </div>
    )
}

export default App