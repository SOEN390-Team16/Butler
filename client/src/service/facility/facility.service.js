import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";

const FacilityService = {
  getFacilities: async () => {
    return await axios.get(`${AppProperties.API_URL}/api/v1/fa/`);
  },

  getFacilityByPropertyId: async (propertyId) => {
    return await axios.get(
      `${AppProperties.API_URL}/api/v1/fa/property/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  getFacilityByUserId: async (userId) => {
    return await axios.get(
      `${AppProperties.API_URL}/api/v1/fa/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  addFacility: async (facility) => {
    return await axios.post(`${AppProperties.API_URL}/api/v1/fa/`, facility, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  removeFacility: async (facilityId) => {
    return await axios.delete(
      `${AppProperties.API_URL}/api/v1/fa/${facilityId}`
    );
  },

  checkFacilityStatus: async (facilityId) => {
    return await axios.get(
      `${AppProperties.API_URL}/api/v1/res/status/${facilityId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};

export default FacilityService;
