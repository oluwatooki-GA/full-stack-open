import {createAnecdote} from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";
import {setNotification} from "../reducers/notificationReducer.js";


const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote = async (event) => {
        event.preventDefault();
        dispatch(createAnecdote(event.target['new-anecdote'].value));
        dispatch(setNotification(`you created '${event.target['new-anecdote'].value}'`,6));

        event.target['new-anecdote'].value = '';
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='new-anecdote'/></div>
                <button type={"submit"}>create</button>
            </form>
        </div>

    );
};

export default AnecdoteForm;