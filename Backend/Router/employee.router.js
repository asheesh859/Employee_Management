const { Router } = require('express')
const router = Router();
const { EmployeeController } = require('../controllers/employee.controller')
const { auth } = require('../middleware/auth')

router.post('/addEmployee', auth, EmployeeController.addEmployee);
router.get('/', EmployeeController.getAllEmployee);
router.get('/:id', EmployeeController.getEmployeeById);
router.delete('/deleteEmployee/:id', EmployeeController.deleteEmployee);
router.put('/employee/update/:id', EmployeeController.updateEmployee);
router.post('/search',auth, EmployeeController.searchEmployee);

module.exports = router