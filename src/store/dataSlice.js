import { createSlice } from "@reduxjs/toolkit";


export const dataSlice = createSlice({
    name:'data',
    initialState:{
        value:[],
    },
    reducers:{
        addData:(state,action)=>{
            state.value = action.payload
        },
        clearData:(state)=>{
            state.value = []
        }
    }
})

export const {addData,clearData} = dataSlice.actions
export default dataSlice.reducer