import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addtoCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            console.log("cccc", state.cart.cart)
            console.log("cccc", action.payload)
            state.cart = action.payload;
        }
    }
})

export default cartSlice.reducer;
export const { addtoCart, removeFromCart } = cartSlice.actions;
