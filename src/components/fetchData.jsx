import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData =createAsyncThunk('fetchData', async(url)=>{
        const data = await fetch(url);
        return data.json();
})

const getDataSlice= createSlice({
    name:'data',
    initialState:{
        loading:false,
        data:[],
        error:false
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchData.pending,(state)=>{
            state.loading =true;
        })
           .addCase(fetchData.fulfilled,(state,action)=>{
            state.loading =false;
             state.data=action.payload;
             state.error;
        })
            .addCase(fetchData.rejected, (state)=>{
            state.loading=false;
             state.error = true;
        })
    }
})
export default getDataSlice.reducer;
