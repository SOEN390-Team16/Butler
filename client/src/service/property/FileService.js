import axios from "axios";
import { AppProperties } from "../../config/app.properties.js";

const FileService = {
  getPropertyFilesByPropertyId: async (propertyId) => {
    return await axios.get(`${AppProperties.API_URL}/api/v1/pp/${propertyId}/files`)
  },
  uploadPropertyFilesWithPropertyId: async (files, propertyId) => {
    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file);
    }
    return await axios.post(`${AppProperties.API_URL}/api/v1/pp/${propertyId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', },
    })
  },
  deletePropertyFilesByPropertyId: async (fileId, propertyId) => {
    return await axios.delete(`${AppProperties.API_URL}/api/v1/pp/${propertyId}/files/${fileId}`)
  }
}

export default FileService
