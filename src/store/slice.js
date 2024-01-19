import { createSlice } from "@reduxjs/toolkit";
import { getAdvertsThunk } from "./thunk";

const slice = createSlice({
    name: "adverts",
    initialState: {
        adverts: [],
    },
    extraReducers: builder => {
        builder.addCase(getAdvertsThunk.fulfilled, (state, { payload }) => {
            state.adverts = payload
            console.log(payload);

        })
    }
})

export const rootReducer = slice.reducer