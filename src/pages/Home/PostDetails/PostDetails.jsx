import { useLoaderData } from "react-router-dom";
import { GrLike, GrDislike } from "react-icons/gr";
import { FaShare } from "react-icons/fa";

const PostDetails = () => {

    const details = useLoaderData();
    console.log(details);

    const { author_image, author_name, post_title, post_description, tag, post_time, comments_count, votes_count } = details || '';

    return (
        <div>
            <div className="md:p-14 lg:p-24">
                <h2 className="text-3xl text-center text-emerald-300 font-extrabold mb-4">Product Details</h2>
                <div className="p-10 bg-emerald-200 bg-opacity-40 border border-indigo-700 rounded">
                    <div className="max-w-6xl mx-10 md:mx-40 lg:mx-40 ">
                        <div className="box-content rounded-lg w-full bg-indigo-400 shadow-xl shadow-violet-300">
                            <div className="card-body items-center text-center">
                                <h2 className="text-2xl font-semibold text-emerald-200">{author_name}</h2>
                                <img className="w-1/5 rounded-full" src={author_image} alt="" />
                                <p className="text-lg font-medium">{post_time}</p>
                                <p className="text-lg font-medium text-blue-800">{tag}</p>
                                <p className="text-xl font-medium text-emerald-300">{post_title}</p>
                                <p className="text-base font-normal">Short Description: {post_description}</p>
                                <div className="flex gap-10">
                                    <div className="flex gap-2 bg-gray-200 rounded-2xl p-1">
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm"><GrLike></GrLike></button>
                                            <p className="text-xl font-medium">{votes_count}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <p className="text-xl font-medium">|</p>
                                            <button className="btn btn-sm"><GrDislike></GrDislike></button>
                                            <p className="text-xl font-medium"></p>
                                        </div>
                                    </div>
                                    <button className="btn btn-md rounded-2xl"><FaShare></FaShare>Share</button>
                                </div>
                               
                                <div className="card-actions">

                                    <button className="btn text-black normal-case bg-gray-200">Comments {comments_count}</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;