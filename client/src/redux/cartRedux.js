import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],

    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    removeProduct: (state, action) => {
      const itemToRemove = state.products.find(item => action.id === item.id);
      const newItems = state.products.filter(
        item => item._id !== action.payload
      );

      // calculating the total
      const newTotal = itemToRemove.quantity * itemToRemove.price;
      newTotal = state.total - newTotal;
      // calculating the quantity
      const newQuantity = state.quantity - 1;

      // console.log(itemToRemove);
      return {
        ...state,
        products: newItems,
        total: newTotal,
        quantity: newQuantity,
      };
    },
    addQuantity: (state, action) => {
      // let products = state.products.map((item) => {
      //   if (item._id === action.product._id) {
      //     item.quantity += 1;
      //     console.log(item._id);
      //   }
      //   return item;
      // });
      // console.log(products);
      // state = {
      //   ...state,
      //   products: products,
      // };
    },
  },
});

export const { addProduct, removeProduct, addQuantity } = cartSlice.actions;
export default cartSlice.reducer;
