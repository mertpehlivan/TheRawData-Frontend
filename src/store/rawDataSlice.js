import { createSlice } from "@reduxjs/toolkit";

export const rawDataSlice = createSlice({
    name:'rawData',
    initialState:[
        {
            header:"Type the name of the raw data",
            rawData:[
                {
                    name:"",
                    previewUrl:"",
                    comment:"",
                    priceSuggestion:"",
                    rawDataUrl:"",
                    saveInfo: false,
                    rawDataEx:"",
                    previewEx:""
                }
            ]
        }
    ]
    ,
    reducers:{
        addDataBox: (state, action) => {
            console.log("arrtir")
            const newRawData = {
                name: "",
                previewUrl: "",
                comment: "",
                priceSuggestion: "",
                rawDataUrl: "",
                saveInfo: false,
                rawDataEx:"",
                previewEx:""
            };
          
            state[action.payload.index].rawData.push(newRawData);
        },
        deleteDataBox:(state,action)=>{
            state[action.payload.headerIndex].rawData.pop(action.payload.index)
        },
        updateHeader: (state,action) =>{
            state[action.payload.index].header = action.payload.header
        },
        addExperiment:(state)=>{
            const newExperiment = {
                header:"Data Default",
                rawData:[
                    {
                        name:"",
                        previewUrl:"",
                        comment:"",
                        priceSuggestion:"",
                        rawDataUrl:"",
                    }
                ]
            }
            state.push(newExperiment)
        },
        deleteExperiment:(state,action)=>{
            state.pop(action.payload.index)
        },
        addRawData:(state,action) =>{
            const newRawData = {
                name: action.payload.name,
                previewUrl: action.payload.previewUrl,
                comment: action.payload.comment,
                priceSuggestion: action.payload.priceSuggestion,
                rawDataUrl: action.payload.rawDataUrl,
                saveInfo: true,
                rawDataEx:action.payload.rawDataEx,
                previewEx:action.payload.previewEx
            };
              
              console.log(newRawData);
              
              const key = action.payload.key; // Key'i al
              
              // Eğer key varsa ve doğru bir değer içeriyorsa devam et
              if (key !== undefined && key >= 0 && key < state[action.payload.index].rawData.length) {
                state[action.payload.index].rawData[key] = newRawData;
              } else {
                console.error("Geçersiz key değeri:", key);
              }
              
        },
        clearRawData:(state)=>{
            state = []
        }
    }
})

export const {clearRawData,addRawData,addDataBox,updateHeader,addExperiment,deleteDataBox,deleteExperiment} = rawDataSlice.actions
export default rawDataSlice.reducer