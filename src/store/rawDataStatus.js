import { createSlice } from "@reduxjs/toolkit";


export const rawDataStatusSlice = createSlice({
    name:'rawDataStatus',
    initialState:{
        value:true,
    },
    reducers:{
        statusUpdate:(state,action)=>{
            state.value = action.payload
        },
        statusClear:(state)=>{
            state.value = 0
        }
    }
})

export const {statusUpdate,statusClear} = rawDataStatusSlice.actions
export default rawDataStatusSlice.reducer