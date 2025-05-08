import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../utils/axiosInstance";
export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
        const response = await axiosInstance.get("/api/v1/product/get-all-products");
        return response?.data?.data;
    })

const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
        loading:false,
        error:null,
    },
    reducers:{
        resetProductState:(state)=>{
            state.products=[];
            state.loading=false;
            state.error=null;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
        });
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    },
})

export const {resetProductState}=productSlice.actions;
export default productSlice.reducer;