import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";

const ReservationService = {
  getReservations: async () => {
    return await axios.get(`${AppProperties.API_URL}/api/v1/res/`);
  },

  getReservationByPropertyId: async (propertyId) => {
    return await axios.get(
      `${AppProperties.API_URL}/api/v1/res/property/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  getReservationByUserId: async (userId) => {
    return await axios.get(
      `${AppProperties.API_URL}/api/v1/res/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  addReservation: async (reservation) => {
    return await axios.post(
      `${AppProperties.API_URL}/api/v1/res/`,
      reservation,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  deleteReservation: async (reservationId) => {
    return await axios.delete(
      `${AppProperties.API_URL}/api/v1/res/${reservationId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};

export default ReservationService;
