import axios from "axios";
import { jwtDecode } from "jwt-decode";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials:true,
});


const axiosRefresh = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});


axiosInstance.interceptors.request.use(async (config) => {

    const currentUser = JSON.parse(localStorage.getItem("currentLoggedUser"));
    let accessToken = currentUser?.accessToken || null;

    if(accessToken){
        const decode = jwtDecode(accessToken);
        if(decode.exp * 1000 < Date.now()){
            try {
                const res = await axiosRefresh.get('/auth/refresh-token');
                accessToken = res?.data?.accessToken;
                const updatedUser = {...currentUser, accessToken};
                localStorage.setItem('currentLoggedUser', JSON.stringify(updatedUser))
            } catch (error) {
                console.error(error?.message);
                localStorage.removeItem('currentLoggedUser');
                window.location.href = '/login';
            }
        }
        config.headers.authorization = `Bearer ${accessToken}`
    }
    return config
})


export default axiosInstance;