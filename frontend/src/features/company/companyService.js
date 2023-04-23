import axios from "axios";

const API_URL = "/api/companies/";

// Create new company
const createCompany = async (companyData, token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, companyData, config);

  return response.data;
}

// Get a company
const getCompany = async (companyId) => {
  const response = await axios.get(API_URL + companyId);

  return response.data;
}

// Delete a company
const deleteCompany = async (companyId, token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + companyId, config);

  return response.data;
}

// Get all companies
const getCompanies = async (token) => {
  const config = {
    headers:  {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config);

  return response.data;
}

const companyService = {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompany
}

export default companyService;