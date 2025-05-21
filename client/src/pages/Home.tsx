import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularDestinations from "@/components/home/PopularDestinations";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedHotels from "@/components/home/FeaturedHotels";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import ContactSection from "@/components/home/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>TravelEase - Book Travel Appointments Online</title>
        <meta name="description" content="Book travel appointments online without phone calls or emails. Find the best destinations and accommodations for your next trip." />
        <meta property="og:title" content="TravelEase - Book Travel Appointments Online" />
        <meta property="og:description" content="Book travel appointments online without phone calls or emails. Find the best destinations and accommodations for your next trip." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelease.com" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff" />
      </Helmet>
      <Hero />
      <Features />
      <PopularDestinations />
      <HowItWorks />
      <FeaturedHotels />
      <Testimonials />
      <CallToAction />
      <ContactSection />
    </>
  );
};

export default Home;
