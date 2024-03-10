import { configureStore } from "@reduxjs/toolkit";
import newDataTypeReducer from "./newDataTypeSlice"
import rawDataReducer from "./rawDataSlice";
import dataReducer from "./dataSlice";
import pageNumberReducer from "./pageNumberSlice";
import usernReducer from "./userSlice";
import memoryReducer from "./memorySlice"
import rawDataStatusReducer from "./rawDataStatus";
export default configureStore({
    reducer:{
        newDataType : newDataTypeReducer,
        rawData: rawDataReducer,
        data: dataReducer,
        pageNumber: pageNumberReducer,
        user: usernReducer,
        memory:memoryReducer,
        rawDataStatus:rawDataStatusReducer

    }
})