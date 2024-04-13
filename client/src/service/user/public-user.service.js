import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";
import { PublicUser } from "../../models/user/public-user.model.js";

const PublicUserService = {
  getAllUsers: async () => {
    return await axios.get(`${AppProperties.API_URL}/api/v1/pu`)
      .then(res => res.data.map(user => PublicUser.fromJson(user)))
  },
  getPubicUser: async (userid) => {
    return await axios.get(`${AppProperties.API_URL}/api/v1/pu/${userid}`)
      .then(res => PublicUser.fromJson(res.data))
  },
  createPublicUser: async (publicUser) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/pu`, publicUser)
      .then(res => PublicUser.fromJson(res.data))
  },
  updatePublicUser: async (publicUser) => {
    return await axios.patch(`${AppProperties.API_URL}/api/v1/pu/${publicUser.userid}`, publicUser)
      .then(res => PublicUser.fromJson(res.data))
  },
  deletePublicUser: async (id) => {
    return await axios.delete(`${AppProperties.API_URL}/api/v1/pu/${id}`)
  }
}

export default PublicUserService