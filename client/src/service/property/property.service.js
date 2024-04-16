import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";

const PropertyService = {
  getProperties: async () => {
    const token = localStorage.getItem("token");
    return await axios.get(`${AppProperties.API_URL}/api/v1/pp/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getPropertiesByCompanyId: async (property_id) => {
    return await axios.get(
      `${AppProperties.API_URL}/api/v1/pp/company/${property_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
  getPropertiesByUserId: async (user_id) => {
    return await axios.get(
      `${AppProperties.API_URL}/api/v1/pp/user/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  addProperty: async (
    propertyName,
    propertyAddress,
    numberOfCondoUnits,
    numberOfParkingUnits,
    numberOfLockers
  ) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/pp/`, {
      propertyName,
      propertyAddress,
      numberOfCondoUnits,
      numberOfParkingUnits,
      numberOfLockers,
    });
  },
};

export default PropertyService;
