import axios from "axios";
import { BAKEND_URL } from "./Utiliti";
import Cookies from "js-cookie"

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

export default axiosInstance;