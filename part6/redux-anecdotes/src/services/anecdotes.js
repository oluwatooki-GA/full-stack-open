import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (content) => {
    const object = { content, votes:0 };
    const response = await axios.post(baseUrl, object);
    return response.data;
};
const updateVote = async (id) => {
    const initialVote = await (await axios.get(`${baseUrl}/${id}`)).data;
    console.log(initialVote);
    await axios.patch(`${baseUrl}/${id}`, {votes: initialVote.votes +1});
};

export default { getAll,createNew,updateVote };