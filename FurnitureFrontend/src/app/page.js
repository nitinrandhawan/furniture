import HeroSection from "./Components/HeroSection/Page";
import TopTrending from "./Components/TopTrending/page"
import Collection from '@/app/Components/Collections/page'
import Carousel from "./Components/Carousel/page";
import ReelSection from "./Components/ReelSection/reelSection";
import FloatingWhatsApp from "./Components/FloatingWhatsApp/page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FAQ from "./Components/Faq/FAQ";
import AnimatedCard from '@/app/Components/AnimatedCard/page'
import TestimonialSlider from "./Components/Testimonial/page";


export default function Home() {
  return (
    <>
     <HeroSection/>
     <FloatingWhatsApp/>
      <ReelSection/>
      <TopTrending/>
      <Collection/>
      <Carousel/>
      <AnimatedCard/>
      <TestimonialSlider/>
      <FAQ />

    </>
   
  );
}
