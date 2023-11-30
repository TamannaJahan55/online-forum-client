import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { IoIosNotificationsOutline } from "react-icons/io";
import useAdmin from "../../../hooks/useAdmin";
import { SlBadge } from "react-icons/sl";
import useUser from "../../../hooks/useUser";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [users] = useUser();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navLinks = <>
        <li><NavLink to='/'
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-black underline font-bold" : ""}>
            Home
        </NavLink></li>

        {user?.email ? <>
            <li><NavLink to='/membership'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-white underline font-bold" : ""}>
                Membership
            </NavLink></li>

        </>

            : <li><NavLink to='/joinUs'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-black underline font-bold" : ""}>
                Join Us
            </NavLink></li>
        }

        <li>
            <NavLink to='/dashboard/announcement'>
                <button className="btn btn-sm bg-indigo-300 border-none">
                    <IoIosNotificationsOutline className="text-xl"></IoIosNotificationsOutline>
                    <div className="badge badge-secondary">+{ }</div>
                </button>
            </NavLink>
        </li>
    </>

    return (
        <div>
            <div className="navbar bg-indigo-300 h-20 mb-8 max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex-col text-center">
                        <Link to='/' className="btn btn-ghost normal-case text-xl mt-3">
                            <img src="" alt="" />
                        </Link>
                        <a className="btn btn-ghost normal-case text-xs md:text-xl lg:text-xl font-mono text-black">Dialogue Forum</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {users?.bronze_badge ? <div className="flex gap-3">
                        <button className="btn btn-xs"><SlBadge className="text-xl text-gray-400"></SlBadge></button>
                        <button className="btn btn-xs bg-amber-500"><SlBadge className="text-xl text-amber-600"></SlBadge></button>
                    </div>
                    :
                    " "
                    }
                    {
                        user?.email ? <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} alt={user.displayName} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="btn btn-sm  btn-ghost">{user.displayName}</button>

                                </li>
                                <li className="text-center items-center">
                                    {
                                        user && isAdmin && <Link to='/dashboard/adminProfile'><button className="btn btn-sm  btn-ghost">Dashboard</button></Link>
                                    }
                                    {
                                        user && !isAdmin && <Link to='/dashboard/myProfile'><button className="btn btn-sm  btn-ghost">Dashboard</button></Link>
                                    }

                                </li>
                                <li>
                                    <button className="btn btn-sm  btn-ghost"
                                        onClick={handleLogOut}
                                    >Logout</button>

                                </li>
                            </ul>
                        </div>
                            :
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;