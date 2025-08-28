import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAll, updateAnecdote} from "./requests.js";
import {useSetNotification} from "./NotificationContext.jsx";

const App = () => {
    const queryClient = useQueryClient();
    const setNotification = useSetNotification();
    const {isError,isPending,data: anecdotes} = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll
    })

    const updateAnecdoteMutation = useMutation(
        {
            mutationFn: updateAnecdote,
            onSuccess: (data) => {
                queryClient.invalidateQueries({queryKey:['anecdotes']})
                setNotification(`anecdote '${data.content}' voted`)
            }
        }
    )

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate(anecdote)
    }

    if (isError) {
        return (<p>anecdote service not available due to problems with the server</p>)
    }
    if (isPending) {
        return (<p>Loading...</p>)
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
            has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
