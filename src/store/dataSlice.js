import { createSlice } from "@reduxjs/toolkit";


export const dataSlice = createSlice({
    name:'data',
    initialState:{
        value:[],
    },
    reducers:{
        addData:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {addData} = dataSlice.actions
export default dataSlice.reducer