import axios from 'axios'

const apiClient = axios.create({
    // baseURL: 'https://my-json-server.typicode.com/Lemonka93/real-world-vue',
    baseURL: "http://localhost:3000",
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})
export default {
    getEvents(perPage, page) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEvent(id) {
        return apiClient.get('/events/' + id)
    },
    putEvent(id, event) {
      return apiClient.put("/events/" + id, event);
    },
    postEvent(event) {
      return apiClient.post("/events", event);
    },
};
