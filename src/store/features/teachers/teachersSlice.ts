import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITeachers } from '../../../types/Types'

interface ITeachersState {
  list: ITeachers[]
}

const initialState: ITeachersState = {
  list: [],
}

export const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setTeachers(state, action: PayloadAction<ITeachers[]>) {
      state.list = action.payload
    },
  },
})

export const { actions } = teachersSlice
export default teachersSlice.reducer