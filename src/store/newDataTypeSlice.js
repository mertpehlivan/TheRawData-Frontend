import { createSlice } from "@reduxjs/toolkit";

export const newDataTypeSlice = createSlice({
    name:'newDataType',
    initialState:{
        value:null,
    },
    reducers:{
        updateDataType:(state,action)=>{
            state.value = action.payload
        },
        clearType:(state)=>{
            state.value = null
        }
    }
})

export const {updateDataType,clearType} = newDataTypeSlice.actions
export default newDataTypeSlice.reducer