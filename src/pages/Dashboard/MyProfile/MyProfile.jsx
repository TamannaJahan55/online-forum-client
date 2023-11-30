import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMyProfile from "../../../hooks/useMyProfile";
import useUser from "../../../hooks/useUser";


const MyProfile = () => {
    const [users] = useUser();
    console.log(users);
    const [myProfile] = useMyProfile();
    console.log(myProfile);

    return (
        <div>
            <SectionTitle heading="My Profile" subHeading="user"></SectionTitle>
            <div className="flex-col gap-2">
                <img className="lg:ml-56" src={users.user_image} alt="" />
                <h2 className="text-3xl text-center mt-3">{users.user_name}</h2>
                <h2 className="text-3xl text-center mt-3">Email: {users.email}</h2>
                <div className="flex gap-10 lg:ml-64 mt-3">
                    <button className="btn bt-sm">Bronze Badge: {users.bronze_badge}</button>
                    <button className="btn bt-sm ">Gold Badge: {users.bronze_badge}</button>
                </div>
            </div>
            <div className="my-4">
                <h2 className="text-3xl text-center mb-4">My 3 Recent Posts:</h2>
                <ul className="space-y-4">
                    {myProfile.map((myPosts) => (
                        <li key={myPosts._id}>
                            <div className="h-72 bg-indigo-300 rounded-md p-4 w-2/3 lg:ml-40">
                                <div className="flex space-x-6">
                                    <img className="w-[100px] h-[80px] rounded-full" src={myPosts.author_image} alt="" />
                                    <div>
                                        <p className="text-2xl font-medium">{myPosts.author_name}</p>
                                        <p className="text-lg text-gray-700 mt-2">{myPosts.post_time}</p>
                                        <h3 className="text-lg font-normal text-blue-600 mt-3">{myPosts.tag}</h3>
                                        <p className="text-xl font-medium">{myPosts.post_title}</p>
                                        <div className="flex gap-12 mt-4">
                                            <p className="text-base font-normal">Votes {myPosts.votes_count}</p>
                                            <p className="text-base font-normal">{myPosts.comments_count} Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyProfile;