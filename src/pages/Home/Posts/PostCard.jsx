import { Link } from "react-router-dom";


const PostCard = ({ post }) => {
    const { _id, author_image, author_name, post_title, tag, post_time, comments_count, votes_count } = post;

    return (
        <Link to={`/postDetails/${_id}`}>
            <div className="bg-emerald-300 h-72 rounded-md p-4">
                <div className="flex space-x-6">
                    <img className="w-[100px] h-[80px] rounded-full" src={author_image} alt="" />
                    <div>
                        <p className="text-2xl font-medium">{author_name}</p>
                        <p className="text-lg text-gray-700 mt-2">{post_time}</p>
                        <h3 className="text-lg font-normal text-blue-600 mt-3">{tag}</h3>
                        <p className="text-xl font-medium">{post_title}</p>
                        <div className="flex gap-12 mt-4">
                            <p className="text-base font-normal">Votes {votes_count}</p>
                            <p className="text-base font-normal">{comments_count} Comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;