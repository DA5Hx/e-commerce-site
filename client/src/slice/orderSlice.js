import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getOrders = createAsyncThunk('orders/getOrders',async(token,{rejectWithValue})=>{
    console.log(token);
    const res = await fetch('http://localhost:4000/api/orders/',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    const data=await res.json();

    console.log(data)
    if(res.ok)
    {
        if(data.order.length!==0)
            localStorage.setItem('orders',JSON.stringify(data.order));
        return data.order;
    }
    else
        return rejectWithValue(data.err);
})

export const addOrder = createAsyncThunk('orders/addOrder',async(token,{rejectWithValue})=>{
    const res = await fetch('http://localhost:4000/api/orders/',{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({})
    })

    const data=await res.json();

    if(res.ok)
    {
        localStorage.removeItem('cart');
        return data.order;
    }
    else
        return rejectWithValue(data.err);
})

const orderSLice = createSlice({
    name:'orders',
    initialState:{
        loading:false,
        error:null,
        orders:null,
        order:null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getOrders.pending,(state)=>{
                state.loading=true;
            })
            .addCase(getOrders.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.loading=false;
                state.error=null;
                state.orders=action.payload;
            })
            .addCase(getOrders.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload?action.payload:'Cannot get Orders List';
            })
            .addCase(addOrder.pending,(state,action)=>{
                state.loading=true;
            })
            .addCase(addOrder.fulfilled,(state,action)=>{
                state.loading=false;
                state.error=null;
                state.order=action.payload;
            })
            .addCase(addOrder.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload?action.payload:'Cannot Add Order';
            })
    }
})

export default orderSLice.reducer;