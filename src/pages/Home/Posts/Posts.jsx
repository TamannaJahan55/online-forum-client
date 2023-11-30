import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import './PostPage.css'
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Posts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [ascVotes, setAscVotes] = useState(false);

    const postPages = useLoaderData();
    console.log(postPages);

    useEffect(() => {
        fetch(`http://localhost:5000/post/post_time?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setAllPosts(data);
            });
    }, [currentPage, itemsPerPage])
   

    const handleSort = () => {
        const sortedData = [...allPosts].sort((a, b) => b.votes_count - a.votes_count);
        setAllPosts(sortedData);
        setAscVotes(true);
      };

    const { count } = useLoaderData();
    console.log(count);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    console.log(numberOfPages);

    const pages = [...Array(numberOfPages).keys()];
    console.log(pages)

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value)
        console.log(val)
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <section className="mx-10 my-5">
            <SectionTitle subHeading="newest to older" heading="Posts by Users"></SectionTitle>
            <button onClick={handleSort} className="btn btn-primary bg-indigo-300 text-black mb-4">Popularity by votes</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    allPosts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                }
            </div>

            <div className="mt-5">
                <div className="pagination">
                    <p>Current Page: {currentPage}</p>
                    <button onClick={handlePrevPage}>Prev</button>
                    {
                        pages.map(page => <button
                            onClick={() => setCurrentPage(page)}
                            key={page}
                            className={currentPage === page ? 'selected' : undefined}
                        >{page}</button>)
                    }
                    <button onClick={handleNextPage}>Next</button>
                    <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>

        </section>
    );
};

export default Posts;