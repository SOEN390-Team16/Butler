import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://hortzcloud.com:3000/api",
});

export const fetchPublicUser = async (userid) => {
  const token = localStorage.getItem('token')

  try {
    const response = await api.get(`/v1/pu/${userid}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    toast.error(`Something went wrong ${error.message}`);
    throw error;
  }
};

export const generateRegistrationKey = async (role) => {
  const token = localStorage.getItem('token')

  try {
    const response = await api.post(`/v1/reg/gen/${role}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    toast.error(`Something went wrong ${error.message}`);
    throw error;
  }
};

export const activateRegistrationKey = async (key) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token')

  try {
    const response = await api.patch(`/v1/reg/`, {key: key, userid: userData.userId}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    toast.success("Successfully registered!");
    return response;
  } catch (error) {
    toast.error(`Something went wrong ${error.message}`);
    throw error;
  }
};


export const getCondoOwners = async () => {
  try {
    const response = await api.get("/v1/co/getCondoOwners", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong executing 'getCondoOwners'")
    throw error;
  }
};

export const addCondoOwner = async (data) => {
  try {
    const response = await api.post("/v1/co/addCondoOwner",
      {data},
      {
        timeout: 10 * 1000,
      });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong executing 'addCondoOwner'");
    throw error;
  }
};

export const getPublicUsers = async () => {
  try {
    const response = await api.get("/v1/pu/getPublicUsers", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong executing 'getPublicUsers'")
    throw error;
  }
};

export const addPublicUser = async (data) => {
  try {
    const response = await api.post("/v1/pu/addPublicUser",
      {data},
      {
        timeout: 10 * 1000,
      });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong executing 'addPublicUser'");
    throw error;
  }
};

 
// Get all operational costs
export const getTotalOperationCost = async () => {
  try{
    const response = await api.get('/v1/api/v1/op', {
      timeout: 10 * 1000,
    });
    if(response.status === 400 || response.status === 500){
      throw response.data
    }
    return response.data
  }catch(err){
    toast.error("error getting the Operational costs")
    throw err;
  }
}

