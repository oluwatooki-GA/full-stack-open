import { useState } from 'react'
const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
]
const App = () => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(anecdotes.map( () =>0))

    function getRandomAnecdote () {
        return Math.floor(Math.random() * anecdotes.length)

    }

    function voteFunc() {
        const copy = [ ...votes ];
        copy[selected] +=1;
        setVotes(copy)
    }

    return (
        <div>
            {anecdotes[selected]}
            <div>
                <button onClick={() => setSelected(getRandomAnecdote())}>next anecdote</button>
                <button onClick={() => voteFunc() }>vote</button>
            </div>
            has {votes[selected]} votes

            <h2>Anecdote with the most votes</h2>
            <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
            has { Math.max(...votes) } votes

        </div>
    )
}

export default App