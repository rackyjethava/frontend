import axios from "axios";
import { BAKEND_URL } from "./Utiliti";
import Cookies from "js-cookie"
import { logout } from "../redux/slice/AuthSlice";

const axiosInstance=axios.create({
    baseURL:BAKEND_URL,
    withCredentials:true

});


axiosInstance.interceptors.request.use(
    (config)=>{
        const token=Cookies.get("accsesstoken");
        if(token){
            config.headers["Authorization"]="Bearer "+token
        }
        return config

    }

)



axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(BAKEND_URL + 'users/get-refreshtokan', {}, { withCredentials: true })
                
                console.log("axiosInstance generateNewTokens", response);
                
                if (response.status === 200) {
                    const { accsesstoken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${accsesstoken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../redux/store').configstore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;