import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide1 from '../../../assets/home/forum 2.jpg'
import slide2 from '../../../assets/home/forum 3.jpg'
import slide3 from '../../../assets/home/forum 6.jpg'
import slide4 from '../../../assets/home/forum 12.jpg'
import slide5 from '../../../assets/home/forum5.jpg'
import { useState } from 'react';
import Tags from '../tags/tags';
import ReactSearchBox from 'react-search-box';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Banner = () => {
    const [searchInput, setSearchInput] = useState('');
    const [tagPosts, setTagPost] = useState([]);
    const axiosPublic = useAxiosPublic();


    const handleSearch = () => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get(`/post/post_time/tag/${searchInput}`);
                setTagPost(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (searchInput) {
            fetchData();
        }
    };

    return (
        <div className='relative'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                </SwiperSlide>
            </Swiper>

            <div className='w-2/3 absolute z-[5] top-80 lg:ml-40'>
                <ReactSearchBox
                    placeholder="Search for tags............."
                    data={[
                        {
                            key: "#food",
                            value: "#food"
                        },
                        {
                            key: "#travel",
                            value: "#travel"
                        },
                        {
                            key: "#books",
                            value: "#books"
                        }
                    ]}
                    value={searchInput}
                    onSelect={handleSearch}
                    onFocus={() => {
                        console.log("This function is called when is focussed");
                    }}
                    onChange={(value) => setSearchInput(value)}
                    autoFocus
                    leftIcon={<>🎨</>}
                    iconBoxSize="48px"
                />


            </div>

            <div className='mx-10 my-5 border border-emerald-500 w-2/3 lg:ml-44'>
                <div>
                    <SectionTitle heading="tags in posts" subHeading="search results"></SectionTitle>
                    <Tags tagPosts={tagPosts}></Tags>
                </div>
            </div>
        </div>
    );
};

export default Banner;