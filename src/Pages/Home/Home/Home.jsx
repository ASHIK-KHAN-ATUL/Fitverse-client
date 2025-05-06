import React from 'react';
import Banner from '../Banner/Banner';
import { Helmet } from 'react-helmet-async';
import FeaturedSection from '../../../Commonents/FeaturedSection/FeaturedSection';
import AboutSection from '../../../Commonents/AboutSection/AboutSection';
import Reviews from '../../../Commonents/Reviews/Reviews';
import FeaturedClasses from '../../../Commonents/FeaturedClasses/FeaturedClasses';
import NewsletterSection from '../../../Commonents/NewsletterSection/NewsletterSection';

const Home = () => {
    return (
        <div >
            <div className=''>
                <Banner></Banner>
                <FeaturedSection></FeaturedSection>
                <AboutSection></AboutSection>
                <FeaturedClasses></FeaturedClasses>
                <Reviews></Reviews>
                <NewsletterSection></NewsletterSection>
            </div>
        </div>
    );
};

export default Home;