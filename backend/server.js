const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5001;
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/companies/', require('./routes/companyRoutes'));
app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/employees/', require('./routes/employeeRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));