const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const app = express()


app.use(express.json())

app.use(morgan('tiny'))
app.use(cors())
morgan.token('post', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

app.use(express.static('dist'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    // console.log(persons)
    response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params
    const person = persons.find(person => person.id === id)

    if ( person ) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})



app.post('/api/persons',(req, res) => {
    const { name , number } = req.body

    const personExists = persons.find(person => person.name === name )
    if ( !name || ! number  ) {
        res.json({ 'error':'No name or number' })
    } else if (personExists) {
        res.json({ 'error': 'name must be unique' })
    } else {
        const person = { name: name,number: number, id: String(Math.floor(Math.random() *1000000)) }
        persons.push(person)
        res.json(person)
    }
})



app.delete('/api/persons/:id',(request, response) => {
    const { id } = request.params
    persons = persons.filter(person => Number(person.id) !== Number(id))
    response.status(204).end()

})
app.get('/info',(request,response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT =  process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
