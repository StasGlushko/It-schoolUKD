import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICourse } from '../../../types/Types'

interface ICoursesState {
  list: ICourse[]
}

const initialState: ICoursesState = {
  list: [],
}

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses(state, action: PayloadAction<ICourse[]>) {
      state.list = action.payload
    },
  },
})

export const { actions } = coursesSlice
export default coursesSlice.reducer