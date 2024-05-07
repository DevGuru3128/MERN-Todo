import axios from "axios";
import { AppDispatch } from "../redux/store";
import config from "../config/config";
import { EmployeeType } from "../types/employee";
import StatusCode from "status-code-enum";

import { getAll, addOne, deleteOne, updateOne } from "../redux/reducers/features/employee";

export const getEmployees = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get(`${config.apiUrl}/employee`);
        if(res.status === StatusCode.SuccessOK) {
            const data:EmployeeType[] = res.data
            dispatch(getAll(data))
        } else {
            alert(res.status)
        }

    } catch (e) {
        alert(e)
    }
}

export const addEmployee = (newEmployee: EmployeeType) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.post(`${config.apiUrl}/employee`, newEmployee)
        if(res.status === StatusCode.SuccessCreated) {
            dispatch(addOne(res.data.employee))
            alert(res.data.message)
            return newEmployee
        } else {
            alert(res.status)
        }
    } catch(e) {
        alert(e)
    }
}

export const deleteEmployee = (id: number) => async(dispatch: AppDispatch) => {
    try {
        const res = await axios.delete(`${config.apiUrl}/employee/${id}`)
        if(res.status === StatusCode.SuccessOK) {
            dispatch(deleteOne(id))
            alert('Successfully deleted')
        } else {
            alert(res.status)
        }
    } catch(e) {
        alert(e)
    }
}

export const updateEmployee = (id: number, updated: EmployeeType) => async (dispatch: AppDispatch) => {
    const updatedData = {
        fullName: updated.fullName,
        email: updated.email,
        age: updated.age,
        country: updated.country,
        profilePicture: updated.profilePicture,
    }
    try {
        const res = await axios.put(`${config.apiUrl}/employee/${id}`, updatedData)
        if(res.status === StatusCode.SuccessOK) {
            dispatch(updateOne(res.data.employee))
            alert('Successfully updated')
        } else {
            alert(res.status)
        }
    } catch(e) {
        alert(e)
    }
}