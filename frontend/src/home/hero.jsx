import React from "react";
import HeroSectionCard from "./HeroSectionCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSection = () => {
  const homeData = [
    {
      heading: "Explore the sights of the Andaman and Nicobar Islands",
      subheading: "The place called heaven on earth",
      src: "https://images.pexels.com/photos/2403207/pexels-photo-2403207.jpeg",
    },
    {
      heading: "Discover the beauty of Paris",
      subheading: "City of Love",
      src: "https://paristickets.tours/wp-content/uploads/2022/09/paris-at-spring.webp",
    },
    {
      heading: "Experience the wonders of New York City",
      subheading: "The city that never sleeps",
      src: "https://images.unsplash.com/photo-1572402554573-3380b6197404?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      heading: "Marvel at the grandeur of the Grand Canyon",
      subheading: "Nature's masterpiece",
      src: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=1600&q=80",
    },
    {
      heading: "Get lost in the charm of Kyoto",
      subheading: "Tradition meets modernity",
      src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  return (
    <section className="max-w-[1800px] mx-auto w-full h-[85vh] mt-6 rounded-[25px] overflow-hidden relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        
        {homeData.map((data, index) => (
          <SwiperSlide key={index} className="h-[90vh]">
            <HeroSectionCard
              heading={data.heading}
              subheading={data.subheading}
              src={data.src}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
