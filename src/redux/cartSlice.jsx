import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    productQuantities: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload; 
    const existingItem = state.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    
    updateQuantity: (state, action) => {    
      const { productId, newQuantity } = action.payload;
      
      // Update the quantity of the specific product in cartItems
      const productToUpdate = state.cartItems.find(item => item.id === productId);
      if (productToUpdate) {
        productToUpdate.quantity += newQuantity;
      }
      
      // Update the productQuantities object
      state.productQuantities = {
        ...state.productQuantities,
        [productId]: newQuantity,
      };
    },
    //   removeProduct: (state, action) => {
    //     const productIdToRemove = action.payload;
    //      state.cartItems = state.cartItems.filter(item => item.id !== productIdToRemove);
    //      delete state.productQuantities[productIdToRemove];
    //      delete state.cartItems[productIdToRemove]
    // },
  },
});      

export const { addToCart, updateQuantity,removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
