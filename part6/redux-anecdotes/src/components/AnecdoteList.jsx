import {useDispatch, useSelector} from "react-redux";
import {createVote} from "../reducers/anecdoteReducer.js";
import {setNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector( ({filter,anecdotes}) => {
        return anecdotes.filter( anecdote => anecdote.content.includes(filter) );
    });

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(createVote(anecdote.id));
        dispatch(setNotification(`you voted ${anecdote.content}`,4));
    };
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;