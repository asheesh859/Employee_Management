const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { connectMongoose } = require('./models/db');
const EmployeeRouter = require('./Router/employee.router');
const authRouter = require('./Router/auth.router');
const port = 8000;
const cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/employee', EmployeeRouter);
app.use('/auth', authRouter);

connectMongoose('mongodb://127.0.0.1:27017/employee-management').then(() => {
    console.log("Database connected!..");
})

app.listen(port, () => {
    console.log('express server start at 8000 port');
})