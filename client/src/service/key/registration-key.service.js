import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";

const RegistrationKeyService = {
  generateKey: async (role) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/reg/gen/${role}`)
  },
  registerUser: async (key, userid) => {
    return await axios.patch(`${AppProperties.API_URL}/api/v1/reg`, {
      key: key,
      userid: userid
    })
  }
}

export default RegistrationKeyService