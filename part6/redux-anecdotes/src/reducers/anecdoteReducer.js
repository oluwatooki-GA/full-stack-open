import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from "../services/anecdotes.js";

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState:[],
    reducers: {
        addVote(state, action) {
            const id = action.payload;
            const foundAnecdote = state.find(anecdote => anecdote.id === id);
            if (foundAnecdote) {
                foundAnecdote.votes += 1;
            }
            state.sort((a, b) => b.votes - a.votes);
        },
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload.sort((a, b) => b.votes - a.votes);
        }
    }
});
export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createNew(content);
        dispatch(appendAnecdote(newAnecdote));
    };
};

export const createVote = id => {
    return async dispatch => {
        await anecdotesService.updateVote(id);
        dispatch(addVote(id));
    };
};
export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
