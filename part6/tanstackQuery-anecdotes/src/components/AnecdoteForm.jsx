import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests.js";
import { useSetNotification} from "../NotificationContext.jsx";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const setNotification = useSetNotification();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['anecdotes']});
            setNotification(`New Anecdote '${data.content}' Added`);
        },
        onError: (err) => {
            setNotification(`${err?.response?.data?.error || err.message}`);
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        newAnecdoteMutation.mutate({content,votes:0})
        event.target.anecdote.value = ''

    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
