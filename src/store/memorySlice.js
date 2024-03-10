import { createSlice } from "@reduxjs/toolkit";


export const memorySlice = createSlice({
    name:'memory',
    initialState:{
        value:0,
    },
    reducers:{
        addSize:(state,action)=>{
            state.value = action.payload
        },
        clearSize:(state)=>{
            state.value = 0
        }
    }
})

export const {addSize,clearData} = memorySlice.actions
export default memorySlice.reducer