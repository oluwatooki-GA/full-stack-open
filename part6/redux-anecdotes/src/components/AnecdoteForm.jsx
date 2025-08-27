import {addAnecdote} from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";
import {addNotification, removeNotification} from "../reducers/notificationReducer.js";
import anecdotesService from "../services/anecdotes.js";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const createAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = await anecdotesService.createNew(event.target['new-anecdote'].value)
        dispatch(addAnecdote(newAnecdote))
        dispatch(addNotification(`you created '${event.target['new-anecdote'].value}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        },5000)
        event.target['new-anecdote'].value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name='new-anecdote'/></div>
                <button type={"submit"}>create</button>
            </form>
        </div>

    );
};

export default AnecdoteForm;