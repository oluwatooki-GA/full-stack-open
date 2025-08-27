
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import {useEffect} from "react";
import anecdotesService from "./services/anecdotes.js";
import {setAnecdotes} from "./reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        anecdotesService.getAll().then(response => {
            dispatch(setAnecdotes(response));
        })
    },[])
  return (
    <div>
      <h2>Anecdotes</h2>
        <Notification/>
        <Filter/>
        <AnecdoteList/>
        <AnecdoteForm/>
    </div>
  )
}

export default App