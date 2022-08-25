import axios from 'axios';

// A mock function to mimic making an async request for data
export function getShows() {
    return axios.get("http://localhost:4000/shows");
}