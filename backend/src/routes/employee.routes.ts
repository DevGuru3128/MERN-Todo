import express from 'express';
import { getEmployees, createEmployee, deleteEmployee, updatedEmployee } from '../controllers/employee.controller';
import { validate } from '../middlewares/validate';
import { createEmployeeValidation, updateEmployeeValidation, deleteEmployeeValidation } from '../validations/employee.validation';

const router = express.Router();


router
    .route('/')
    .post(validate(createEmployeeValidation), createEmployee)
    .get(getEmployees)
router
    .route('/:id')
    .delete(validate(deleteEmployeeValidation), deleteEmployee)
    .put(validate(updateEmployeeValidation), updatedEmployee)

export default router