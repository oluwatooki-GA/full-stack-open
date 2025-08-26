import {addAnecdote} from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const createAnecdote = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target['new-anecdote'].value))
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