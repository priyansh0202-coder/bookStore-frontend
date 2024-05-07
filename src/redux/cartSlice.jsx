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
            state.cart = action.payload;
        }
    }
})

export default cartSlice.reducer;
export const { addtoCart, removeFromCart } = cartSlice.actions;
