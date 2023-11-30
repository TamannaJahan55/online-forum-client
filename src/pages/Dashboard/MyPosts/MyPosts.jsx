import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMyProfile from "../../../hooks/useMyProfile";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const MyPosts = () => {
    const axiosSecure = useAxiosSecure();
    const [myProfile, refetch] = useMyProfile();
    const {user} = useAuth();

    const handleDeletePost = (post) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/post/post_time/${user.email}/${post._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <SectionTitle heading="my posts" subHeading="All posts in table"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Post Title</th>
                            <th>Number of Votes</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProfile.map((post, index) => <tr key={post._id}>
                                <th>{index + 1}</th>
                                <td>{post.post_title}</td>
                                <td>{post.votes_count}</td>
                                <td><button className="btn btn-ghost bg-green-600">Comment</button></td>
                                <td>
                                    <button onClick={() => handleDeletePost(post)} className="btn btn-lg bg-red-500">
                                        <FaTrashAlt className="text-white"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPosts;