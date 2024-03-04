import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: "http://hortzcloud.com:3000/api",
});

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
            { data },
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
            { data },
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
