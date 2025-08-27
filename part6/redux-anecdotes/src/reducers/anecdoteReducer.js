import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from "../services/anecdotes.js";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const foundAnecdote = state.find(anecdote => anecdote.id === id)
      if (foundAnecdote) {
        foundAnecdote.votes += 1
      }
      state.sort((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
      setAnecdotes(state, action) {
          return action.payload
      }
  }
})
export const initializeAnecdotes = () => {
    return async dispatch => {
        console.log('aaaaaaaa')
        const anecdotes = await anecdotesService.getAll()
        console.log(anecdotes)
        dispatch(setAnecdotes(anecdotes))
    }
}
export const { addVote, addAnecdote,setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
