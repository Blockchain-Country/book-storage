import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload }
    },
    setAuthorFilter: (state, action) => {
      return { ...state, author: action.payload }
    },
    resetAllFilters: () => {
      return initialState
    },
  },
})

export const { setTitleFilter, setAuthorFilter, resetAllFilters } =
  filterSlice.actions

export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorFilter = (state) => state.filter.author

export default filterSlice.reducer
