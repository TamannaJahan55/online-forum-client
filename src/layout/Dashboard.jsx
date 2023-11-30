import { FaBitbucket, FaComments, FaHome, FaUpload, FaUsers } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {

    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-indigo-300">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                                <li><NavLink to="/dashboard/adminProfile"><FaHome></FaHome>Admin Profile</NavLink></li>
                                <li><NavLink to="/dashboard/users"><FaUsers></FaUsers>Manage Users</NavLink></li>
                                <li><NavLink to="/dashboard/comments"><FaComments></FaComments>Reported Comments</NavLink></li>
                                <li><NavLink to="/dashboard/announcement"><IoIosNotificationsOutline></IoIosNotificationsOutline>Make Announcement</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to="/dashboard/myProfile"><FaHome></FaHome>My Profile</NavLink></li>
                                <li><NavLink to="/dashboard/addPost"><FaUpload></FaUpload>Add Post</NavLink></li>
                                <li><NavLink to="/dashboard/myPosts"><FaBitbucket></FaBitbucket>My Posts</NavLink></li>
                            </>
                    }
                
                {/* shared nav links */}
                <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                </ul>
            
            </div>
            {/* dashboard content */}
            <div className="flex-1 bg-emerald-300 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;