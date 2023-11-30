


const Tags = ({ tagPosts }) => {
    console.log(tagPosts)

    return (
        <div className="mx-10 my-5">

            {tagPosts &&
                (
                    <ul className="space-y-4">
                        {tagPosts.map((tagPost) => (
                            <li key={tagPost._id}>
                                <div className="h-72 bg-indigo-300 rounded-md p-4 w-full">
                                    <div className="flex space-x-6">
                                        <img className="w-[100px] h-[80px] rounded-full" src={tagPost.author_image} alt="" />
                                        <div>
                                            <p className="text-2xl font-medium">{tagPost.author_name}</p>
                                            <p className="text-lg text-gray-700 mt-2">{tagPost.post_time}</p>
                                            <h3 className="text-lg font-normal text-blue-600 mt-3">{tagPost.tag}</h3>
                                            <p className="text-xl font-medium">{tagPost.post_title}</p>
                                            <div className="flex gap-12 mt-4">
                                                <p className="text-base font-normal">Votes {tagPost.votes_count}</p>
                                                <p className="text-base font-normal">{tagPost.comments_count} Comments</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )

            }
        </div>
    );
};

export default Tags;