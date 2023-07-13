import axios from "axios";

export const getTopic = (limit: number, offset: number) => {
    return axios.get('/topic/' + limit + '/' + offset);
}

export interface PostTopic {
    content: string;
}

export const postTopic = (data: PostTopic) => {
    return axios.post('/topic', data);
}