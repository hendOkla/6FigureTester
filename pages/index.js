import React from 'react';
import Navbar from "@/components/_App/Navbar";
import MainBanner from '@/components/PCRepair/MainBanner';
import AboutUsContent from '@/components/PCRepair/AboutUsContent';
import CTA from '@/components/PCRepair/CTA';
import Feedback from '@/components/Common/FeedbackStyleTwo';
import Footer from "@/components/_App/Footer";
import SliderVideo from '@/components/Slider/SliderVideo';

const PCRepair = () => {
    return (
        <>
            <Navbar />

            <MainBanner />

            <AboutUsContent />

            <CTA />

            {/* <SliderVideo/> */}

            <Feedback />

            <Footer />
        </>
    )
}

export default PCRepair;