import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

/* LAS FUNCIONES QUE HACEN LOS LLAMADOS A LAS APIS SE ENCUENTRAN EN LA CARPETA DE REQUESTS */

export const getAllShows = createAsyncThunk('',
    async () => {
        const { data } = await axios.get("http://localhost:4000/shows");
        return data;
    }
);