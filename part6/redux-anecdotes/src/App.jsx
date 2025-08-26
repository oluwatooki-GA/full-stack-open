import { useSelector, useDispatch } from 'react-redux'
import {addAnecdote, addVote} from "./reducers/anecdoteReducer.js";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
        <AnecdoteList/>
        <AnecdoteForm/>
    </div>
  )
}

export default App