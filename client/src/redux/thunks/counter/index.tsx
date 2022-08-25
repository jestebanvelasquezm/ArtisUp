import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCount, otherFetchCount } from "../../requests/counterAPI";

/* LAS FUNCIONES QUE HACEN LOS LLAMADOS A LAS APIS SE ENCUENTRAN EN LA CARPETA DE REQUESTS */

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const { data } = await fetchCount(amount);
        if (typeof data === "number") {
            return data;
        }
    }
);

export const otherIncrementAsync = createAsyncThunk(
    'counter/otherFetchCount',
    async (amount: number) => {
        const { data } = await otherFetchCount(amount);
        if (typeof data === "number") {
            return data;
        }
    }
);