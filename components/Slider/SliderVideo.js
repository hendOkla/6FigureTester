import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SliderVideo = () => {
    const [curseList, setCurseList] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        axios.get(`/api/view-videoReview`)
        .then(res => {
            if (res.data.status === 200) {
            setCurseList(res.data.VideoReview);
            setIsDataLoaded(true);
            }
        })
        .catch(error => {
            console.error('Error fetching video reviews:', error);
        });
    }, []);

    useEffect(() => {
        if (isDataLoaded) {
        const swiperScript = document.createElement('script');
        swiperScript.src = 'https://unpkg.com/swiper@8/swiper-bundle.min.js';
        swiperScript.onload = initializeSlider;
        document.body.appendChild(swiperScript);

        const ioniconsESMScript = document.createElement('script');
        ioniconsESMScript.type = 'module';
        ioniconsESMScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
        document.body.appendChild(ioniconsESMScript);

        const ioniconsScript = document.createElement('script');
        ioniconsScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
        ioniconsScript.setAttribute('nomodule', '');
        document.body.appendChild(ioniconsScript);
        }
    }, [isDataLoaded]);

    
    function initializeSlider() {
        const trandingSliderScript = document.createElement('script');
        trandingSliderScript.innerHTML = `
        var TrandingSlider = new Swiper('.tranding-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: 'auto',
            coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            },
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            }
        });
        `;
        document.body.appendChild(trandingSliderScript);
    }


    return (
        <section id="tranding">
            <div className="section-title">
                <h2>What users Saying</h2>
                <div className="bar"></div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="container">
                <div className="swiper tranding-slider">
                    <div className="swiper-wrapper">

                        {
                            curseList.map((item)=>{
                                return(     
                                    <div className="swiper-slide tranding-slide">
                                        <div className="tranding-slide-img">
                                        <iframe width="560" height="315" src={item.iframeVideo}   title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                        </div>
                                        <div className="tranding-slide-content">
                                            <div className="tranding-slide-content-bottom">
                                                <h2 className="food-name">{item.customerName}</h2>
                                            </div>
                                        </div>
                                    </div> 
                                )
                            })
                        }

                    </div>
                    <div className="tranding-slider-control">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SliderVideo;