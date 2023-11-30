import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import SocialLogin from "../../../components/SocialLogin/SocialLogin";

const JoinUs = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // create new user
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
                navigate(location?.state ? location?.state : '/');
            })
            .catch(error => console.log('Verify your email and password', error.message))
    }

    return (
        <div className="hero min-h-screen bg-emerald-300">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src='https://i.ibb.co/TR3rZpP/forum-7.jpg' alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-indigo-300">
                    <div className="card-body">
                        <h1 className="text-3xl text-center text-blue-600 font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' required placeholder="email" className="input input-bordered bg-emerald-300" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' required placeholder="password" className="input input-bordered bg-emerald-300" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary bg-emerald-300 text-blue-600" type="submit" value="Login" />
                            </div>
                        </form>
                    </div>
                    <p className='my-4 text-center'>New to Dialogue Forum ? <Link className='text-blue-600 font-bold' to="/register">Register</Link> </p>
                    <div className="text-center mx-auto">
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;