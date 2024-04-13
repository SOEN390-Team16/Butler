import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";
import { CondoManagementCompany } from "../../models/user/condo-management-company.model.js";

const CondoManagementCompanyService = {
  getAllCondoManagementCompanies: async () => {
    return await axios.get(`${AppProperties.API_URL}/api/v1/cmc`)
      .then(res => res.data.map(company => CondoManagementCompany.fromJson(company)))
  },
  getCondoManagementCompany: async (companyid) => {
    return await axios.get(`${AppProperties.API_URL}/api/v1/cmc/${companyid}`)
      .then(res => CondoManagementCompany.fromJson(res.data))
  },
  createCondoManagementCompany: async (condoManagementCompany) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/cmc/`, condoManagementCompany)
      .then(res => CondoManagementCompany.fromJson(res.data))
  },
  updateCondoManagementCompany: async (condoManagementCompany) => {
    return await axios.patch(`${AppProperties.API_URL}/api/v1/cmc/${condoManagementCompany.companyid}`,
      condoManagementCompany)
      .then(res => CondoManagementCompany.fromJson(res.data))
  },
  deleteCondoManagementCompany: async (companyid) => {
    return await axios.delete(`${AppProperties.API_URL}/api/v1/cmc/${companyid}`)
      .then(res => CondoManagementCompany.fromJson(res.data))
  }
}

export default CondoManagementCompanyService