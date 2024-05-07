import { Employee } from "../interface/Employee";

// DB
import { connect } from '../database'

const getRecords = async () => {
    const conn = await connect();
    const employees = await conn.query('SELECT * FROM employees')
    return employees[0]
}

const createRecord = async (employee: Employee) => {
    const conn = await connect()
    const result = await conn.query('SELECT * FROM employees WHERE email = ?', employee.email);
    const existEmployee = JSON.parse(JSON.stringify(result[0]))
    if(existEmployee.length > 0) {
        return {status: 400, message: 'Employee is already registered'}
    } else {
        const conn = await connect();
        const created = await conn.query('INSERT INTO employees SET ?', [employee]);
        return {status: 201, createdEmployee: { ...employee, id: JSON.parse(JSON.stringify(created[0]))['insertId'] }, message: 'Successfully created'}
    }
}

const deleteRecord = async (id: number) => {
    const conn = await connect()
    await conn.query('DELETE FROM employees WHERE id = ?', [id])
}

const updateRecord = async (id: number, updatedEmployee: Employee) => {
    const conn = await connect()
    const updated = await conn.query('UPDATE employees set ? WHERE id = ?', [updatedEmployee, id])
    return {status: 200, updatedEmployee, message: 'Successfully updated'}
}

export const employeeService = {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
}