import { createSlice } from "@reduxjs/toolkit";
import { getAdvertsThunk } from "./thunk";

const slice = createSlice({
    name: "adverts",
    initialState: {
        adverts: [],
        loadMore: true,
    },

    extraReducers: builder => {
        builder.addCase(getAdvertsThunk.fulfilled, (state, { payload }) => {
            if (payload.length < 12) { state.loadMore = false }
            state.adverts = [...state.adverts, ...payload]
        })
    }
})

export const rootReducer = slice.reducer