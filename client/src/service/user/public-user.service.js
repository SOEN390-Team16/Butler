import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";
import { PublicUser } from "../../models/user/public-user.model.js";

const PublicUserService = {
  getAllUsers: async () => {
    const res = await axios.get(`${AppProperties.API_URL}/api/v1/pu`)
    return res.data.map(json => PublicUser.fromJson(json))
  },
  getPubicUser: async (userid) => {
    const res = await axios.get(`${AppProperties.API_URL}/api/v1/pu/${userid}`)
    return PublicUser.fromJson(res.data)
  },
  createPublicUser: async (publicUser) => {
    await axios.post(`${AppProperties.API_URL}/api/v1/pu`, publicUser)
  },
  pathPublicUser: async (id, publicUser) => {
    await axios.patch(`${AppProperties.API_URL}/api/v1/pu/${id}`, publicUser)
  },
  deletePublicUser: async (id) => {
    await axios.delete(`${AppProperties.API_URL}/api/v1/pu/${id}`)
  }
}

export default PublicUserService