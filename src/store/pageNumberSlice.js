import { createSlice } from "@reduxjs/toolkit";


export const pageNumberSlice = createSlice({
    name:'pageNumber',
    initialState:{
        value:0,
    },
    reducers:{
        increase:(state)=>{
            state.value =  state.value + 1
        },
        decrease:(state)=>{
            state.value =  state.value - 1
        }
    }
})

export const {increase, decrease} = pageNumberSlice.actions
export default pageNumberSlice.reducer