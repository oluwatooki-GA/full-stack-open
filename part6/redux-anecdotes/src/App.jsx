import { useSelector, useDispatch } from 'react-redux'
import {addAnecdote, addVote} from "./reducers/anecdoteReducer.js";
import AnecdoteForm from "./components/AnecdoteForm.jsx";

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const createAnecdote = (event) => {
      event.preventDefault()
      dispatch(addAnecdote(event.target['new-anecdote'].value))
      event.target['new-anecdote'].value = ''
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
        <AnecdoteForm/>
    </div>
  )
}

export default App