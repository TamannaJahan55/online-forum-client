import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePost = () => {
    const axiosPublic = useAxiosPublic();
    const {data: allPosts = [], isPending: loading, refetch} = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await axiosPublic.get('post/post_time');
            return res.data;
        }
    })
    return [allPosts, loading, refetch]
};

export default usePost;