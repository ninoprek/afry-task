import axios from "axios";

const API_URL = "/api/employees/";

// Create new employee
const createEmployee = async (employeeData, token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, employeeData, config);

  return response.data;
}

// Remove employee
const removeEmployee = async (employeeData, token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + "remove", employeeData, config);

  return response.data;
}

// add employee
const addEmployee = async (employeeData, token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + "add", employeeData, config);

  return response.data;
}

// Get unemployed
const getUnemployed = async (token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + 'unemployed', config);

  return response.data;
}

// Get employees
const getEmployees = async (token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config);

  return response.data;
}

const employeeService = {
  createEmployee,
  removeEmployee,
  addEmployee,
  getUnemployed,
  getEmployees
}

export default employeeService;