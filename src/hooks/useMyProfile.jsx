import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch, data: myProfile = []} = useQuery({
        queryKey: ['myProfile', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/post/post_time/${user.email}`)
            return res.data;
        }
    })
    return [myProfile, refetch];
};

export default useMyProfile;