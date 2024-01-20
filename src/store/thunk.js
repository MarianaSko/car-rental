import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../api/api'


export const getAdvertsThunk = createAsyncThunk('adverts/get', async (page, thunkApi) => {
    try {
        const response = await api.get(`/advert?page=${page}&limit=12`);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
})