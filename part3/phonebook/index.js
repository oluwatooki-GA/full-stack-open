require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// ===== Middlewares =====
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

// Custom morgan token for POST
morgan.token('post', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

// ===== Utility Middlewares =====
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

// ===== Routes =====

// Get all persons
app.get('/api/persons', async (req, res, next) => {
  try {
    const people = await Person.find()
    res.json(people)
  } catch (error) {
    next(error)
  }
})

// Get person by ID
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// Create new person
app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body
    if (!name || !number) {
      return res.status(400).json({ error: 'No name or number' })
    }

    const personExists = await Person.findOne({ name })
    if (personExists) {
      return res.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({ name, number })
    const savedPerson = await person.save()
    res.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

// Update person
app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body

    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )

    res.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

// Delete person
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Info route
app.get('/info', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
    )
  } catch (error) {
    next(error)
  }
})

// ===== Error & Unknown Endpoint Handlers =====
app.use(unknownEndpoint)
app.use(errorHandler)

// ===== Server =====
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
