import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUpload } from "react-icons/fa";
import Swal from 'sweetalert2'

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddPost = () => {
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
            const postItem = {
                author_name: data.author_name,
                email: data.email,
                post_title: data.post_title,
                post_time: data.post_time,
                post_description: data.post_description,
                tag: data.tag,
                votes_count: data.votes_count,
                author_image: res.data.data.display_url
            }
            // 
            const postRes = await axiosSecure.post('/post', postItem);
            console.log(postRes.data);
            if (postRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.author_name} is added to the post.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div>
            <SectionTitle heading="add a post" subHeading="Form"></SectionTitle>
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
                    {/* post title */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Post Title*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Post Title"
                            {...register('post_title', { required: true })}
                            className="input input-bordered w-full bg-indigo-300" />
                    </div>
                    {/* post time */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Post Time*</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Post Time"
                            {...register('post_time', { required: true })}
                            className="input input-bordered w-full bg-indigo-300" />
                    </div>
                    {/* post description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Post Description</span>
                        </label>
                        <textarea {...register('post_description')} className="textarea textarea-bordered h-24 bg-indigo-300" placeholder="Post Description"></textarea>
                    </div>
                    <div className="flex gap-6">
                        {/* tag */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Tag*</span>
                            </label>
                            <select defaultValue="default" {...register("tag", { required: true })}
                                className="select select-bordered w-full bg-indigo-300">
                                <option disabled value="default">Select a tag</option>
                                <option value="#food">#food</option>
                                <option value="#books">#books</option>
                                <option value="#travel">#travel</option>
                                <option value="#mindfulness">#mindfulness</option>
                                <option value="#pets">#pets</option>
                            </select>
                        </div>

                        {/* votes */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Votes Count*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Votes Count"
                                {...register('votes_count', { required: true })}
                                className="input input-bordered w-full bg-indigo-300" />
                        </div>
                    </div>

                    {/* author image */}
                    <div className="form-control w-full my-6">
                        <input {...register('author_image', { required: true })} type="file" className="file-input w-full max-w-xs bg-indigo-300" />
                    </div>

                    <button className="btn bg-indigo-300">
                        <FaUpload></FaUpload> Add Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;