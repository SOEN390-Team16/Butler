import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";

const CloudinaryImageService = {
  uploadImage: async (imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    return await axios.post(`${AppProperties.API_URL}/api/v1/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', },
    })
  }
}

export default CloudinaryImageService