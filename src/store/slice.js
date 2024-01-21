import { createSlice } from "@reduxjs/toolkit";
import { getAdvertsThunk, getAllAdverts } from "./thunk";

const slice = createSlice({
    name: "adverts",
    initialState: {
        adverts: [],
        allAdverts: [],
        loadMore: true,
    },
    reducers: {
        setLoadMore: (state, { payload }) => {
            state.loadMore = payload;
        },
    },

    extraReducers: builder => {
        builder.addCase(getAdvertsThunk.fulfilled, (state, { payload }) => {
            if (payload.length < 12) { state.loadMore = false }
            state.adverts = [...state.adverts, ...payload]
        }).addCase(getAllAdverts.fulfilled, (state, { payload }) => {
            state.allAdverts = payload
        })
    }
})
export const { setLoadMore } = slice.actions
export const rootReducer = slice.reducer