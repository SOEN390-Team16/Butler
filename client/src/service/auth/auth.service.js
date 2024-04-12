import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";

const AuthService = {
  login: async (email, password) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/login/`, {
      email,
      password
    })
  },

  registerPublicUser: async (userInfo) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/pu/`, userInfo)
  },

  registerCompany: async (company_name, email, password) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/cmc/`, {
      company_name,
      email,
      password
    })
  }
}

export default AuthService