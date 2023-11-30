import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMyProfile from "../../../hooks/useMyProfile";
import useUser from "../../../hooks/useUser";


const AdminProfile = () => {
    const [users] = useUser();
    const [myProfile] = useMyProfile();

    return (
        <div>
            <SectionTitle heading="Admin Profile" subHeading="Admin"></SectionTitle>
            <div className="flex-col gap-2">
                <img className="lg:ml-56" src={users.user_image} alt="" />
                <h2 className="text-3xl text-center mt-3">{users.user_name}</h2>
                <h2 className="text-3xl text-center mt-3">Email: {users.email}</h2>
                <div className="flex gap-10 lg:ml-64 mt-3">
                    <button className="btn bt-sm">Bronze Badge: {users.bronze_badge}</button>
                    <button className="btn bt-sm ">Gold Badge: {users.bronze_badge}</button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;