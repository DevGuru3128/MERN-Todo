import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeType } from '../../../types/employee'

type EmployeeInitStateType = {
    data: EmployeeType[]
}

const initialState: EmployeeInitStateType = {
    data: []
}


export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        getAll: (state, action: PayloadAction<EmployeeType[]>) => {
            state.data = [...action.payload]
        },
        addOne: (state, action: PayloadAction<EmployeeType>) => {
            state.data.push(action.payload)
        },
        deleteOne: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter((employee) => employee.id !== action.payload)
        },
        updateOne: (state, action: PayloadAction<EmployeeType>) => {
            state.data = state.data.map((employee) => {
                if(employee.id !== action.payload.id) return employee;
                else return action.payload
            })
        }
    },
})

export const { getAll, addOne, deleteOne, updateOne } = employeeSlice.actions
export default employeeSlice.reducer
