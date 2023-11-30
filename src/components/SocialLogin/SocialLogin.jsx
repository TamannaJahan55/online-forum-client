import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2'


const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    user_name: result.user?.displayName,
                    user_image: result.user?.photoURL,
                    email: result.user?.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User created successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            
                        }
                        navigate('/');
                    })
           
            .catch(error => console.log(error));
        })
    }

return (
    <div className="p-8">
        <div className="divider"></div>
        <div>
            <button onClick={handleGoogleSignIn} className="btn bg-emerald-300 text-indigo-600">
                <FaGoogle className="mr-2"></FaGoogle>
                Google
            </button>
        </div>
    </div>
)
};

export default SocialLogin;