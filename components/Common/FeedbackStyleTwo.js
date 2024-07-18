import React,{ useState } from 'react';
import NavbarUser from "@/components/_App/NavbarUser";
import { getDictionary } from "getDictionary";
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { Height } from '@mui/icons-material';

const FeedbackStyleTwo = () => {
    const router = useRouter();
    const { locale } = router;
  
    const [reviewList,setReviewList] = useState([]);    
    const [translations, setTranslations] = useState(null);

    React.useEffect(() => {
        //for translation 
        async function fetchTranslations() {
            const translations = await getDictionary(locale);
            setTranslations(translations);
        }        
        setReviewList([]);       
        fetchReviewList();   
        fetchTranslations(); 
    },[]);

    function fetchReviewList(){
        axios.get(`/api/displayReview` ).then(res=>{
            /* console.log (id); */
            if(res.data.status === 200){
                setReviewList(res.data.reviews)
                console.log(res.data.reviews);
            }
        });
    } 




    return (
        <>
            <div className="feedback-area ptb-80">
                <div className="container">
                    <div className="section-title">
                        <h2>What users Saying</h2>
                        <div className="bar"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>

                    <div className="testimonials-slides-box">
                        <Swiper
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 6000,
                                pauseOnMouseEnter: true,
                            }}
                            modules={[Pagination, Autoplay]}
                            className="testimonials-slides"
                        >


                            {reviewList.length ? 
                                (
                                    reviewList.map((item)=>{
                                        return(                                                            
                                            <SwiperSlide>
                                                <div className="single-feedback-item">
                                                    <div className="client-info align-items-center">
                                                        <div className="image">
                                                            <img style={{width: '100px', height: '100px'}}
                                                                src={item.image ? `https://6figure-earner.com/LarReApi/public/${item.image}` : '/images/logo.png'}
                                                                alt="image"
                                                            />
                                                        </div>
                                                        <div className="title">
                                                            <h3>{item.username || 'Unknown'}</h3>
                                                        </div>
                                                    </div>
                                                    <p>{item[`review`]}</p>
                                                </div>
                                            </SwiperSlide>                                                          
                                        )
                                    })
                                ) : (
                                    <div className="section-title">
                                        <h4>there is no review yet</h4>
                                    </div>                        
                                )
                            }
                            
                        </Swiper>
                    </div>
                </div>

                {/* Shape Images */}
                <div className="shape1">
                    <img src="/images/shape1.png" alt="shape" />
                </div>
                <div className="shape2 rotateme">
                    <img src="/images/shape2.svg" alt="shape" />
                </div>
                <div className="shape4">
                    <img src="/images/shape4.svg" alt="shape" />
                </div>
                <div className="shape5">
                    <img src="/images/shape5.png" alt="shape" />
                </div>
                <div className="shape6 rotateme">
                    <img src="/images/shape4.svg" alt="shape" />
                </div>
                <div className="shape7">
                    <img src="/images/shape4.svg" alt="shape" />
                </div>
                <div className="shape8 rotateme">
                    <img src="/images/shape2.svg" alt="shape" />
                </div>
            </div>
        </>
    );
}

export default FeedbackStyleTwo;
