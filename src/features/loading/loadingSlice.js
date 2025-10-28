import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading : false,
  message: ""
}

export const loadingSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state, action) => {
        state.loading = true,
        state.message = action.payload || ""
    },
    hideLoader: (state) => {
        state.loading = false,
        state.message = ""
    }
  }
})


export const { showLoader, hideLoader } = loadingSlice.actions

export default loadingSlice.reducer