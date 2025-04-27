// candidatesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    candidates: []  
  },
  reducers: {
    addCandidate: (state, action) => {
      state.candidates.push(action.payload);  
    },
  },
});

export const { addCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;

