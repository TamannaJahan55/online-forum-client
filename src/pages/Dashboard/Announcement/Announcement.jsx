import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { IoIosNotificationsOutline } from "react-icons/io";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Announcement = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imgFile = { image: data.author_image[0] }
        const res = await axiosPublic.post(image_hosting_api, imgFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the post item data to the server with the image url 
            const announcementPost = {
                author_name: data.author_name,
                email: data.email,
                title: data.title,
                description: data.description,
                author_image: res.data.data.display_url
            }
            // 
            const postRes = await axiosSecure.post('/announcement', announcementPost);
            console.log(postRes.data);
            if (postRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.author_name} is added to the announcement.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }
    return (
        <div>
            <SectionTitle heading="Make Announcements" subHeading="Form"></SectionTitle>
               <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* author name */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Author Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Author Name"
                                {...register('author_name', { required: true })}
                                required
                                className="input input-bordered w-full bg-indigo-300" />
                        </div>
                        {/* author email */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Author Email*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Author Email"
                                {...register('email', { required: true })}
                                required
                                className="input input-bordered w-full bg-indigo-300" />
                        </div>
                        {/* title */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Title*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Title"
                                {...register('title', { required: true })}
                                className="input input-bordered w-full bg-indigo-300" />
                        </div>
                        {/* post description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea {...register('description')} className="textarea textarea-bordered h-24 bg-indigo-300" placeholder="Description"></textarea>
                        </div>

                        {/* author image */}
                        <div className="form-control w-full my-6">
                            <input {...register('author_image', { required: true })} type="file" className="file-input w-full max-w-xs bg-indigo-300" />
                        </div>

                        <button className="btn bg-indigo-300">
                           <IoIosNotificationsOutline></IoIosNotificationsOutline> Make Announcement
                        </button>
                    </form>
                </div>
            </div>
       
    );
};

export default Announcement;