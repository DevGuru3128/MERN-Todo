import { Request, Response } from 'express'

// Interfaces
import { Employee } from '../interface/Employee'

import { employeeService } from '../services/employee.service'

export const getEmployees = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const employees = await employeeService.getRecords();
        return res.json(employees)
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
}

export const createEmployee = async (req: Request, res: Response) => {
    const newEmployee: Employee = req.body;
    try {
        const result = await employeeService.createRecord(newEmployee)
        return res.status(result.status).send({employee: result.createdEmployee, message: result.message})
    } catch(e) {
        console.log(e)
        return res.status(500).json('Internal Server Error')
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await employeeService.deleteRecord(id);
        return res.json('Successfully deleted')
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const updatedEmployee = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedEmployee: Employee = req.body;
    try {
        const result = await employeeService.updateRecord(id, updatedEmployee);
        return res.status(result.status).send({employee: {...result.updatedEmployee, id}, message: result.message})
    } catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}