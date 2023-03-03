/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { createSlice } from "@reduxjs/toolkit";

export const { actions, reducer } = createSlice({
  name: "navigationReducer",
  initialState: {
    showCart: false,
  },
  reducers: {
    toggleCart: (state, {payload}) => {
      state.showCart = !payload;
    },
  },
});
