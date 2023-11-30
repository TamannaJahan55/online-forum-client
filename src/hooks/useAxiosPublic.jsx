import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://online-forum-server-beta.vercel.app'
})
const useAxiosPublic = () => {
    
    return axiosPublic;
};

export default useAxiosPublic;