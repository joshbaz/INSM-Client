import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SLIDER_IMAGES = [
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/image.png",
    alt: "Mothers collaborating in community programme",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/Frame%202.png",
    alt: "Vocational skills training session",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/coorporate.png",
    alt: "Corporate alliance partnership meeting",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/IMAAGE.png",
    alt: "Community outreach and impact",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/24d67f7bedf75fdebe204784ab41ceb9f7e96699.png",
    alt: "Empowering mothers across Uganda",
  },
];

const ImageSlider = () => {
  return (
    <section className="w-full bg-white py-10 md:py-16 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.15}
        centeredSlides={true}
        spaceBetween={12}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 1.2, spaceBetween: 16 },
          1024: { slidesPerView: 1.3, spaceBetween: 20 },
        }}
      >
        {SLIDER_IMAGES.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[300px] md:h-[520px] overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gallery link */}
      <div className="text-center mt-6">
        <Link
          to="/what-we-do/gallery"
          className="text-sm font-secondary text-brand-dark-400 hover:text-brand-dark transition-colors underline underline-offset-2"
        >
          Click here to view more photos
        </Link>
      </div>
    </section>
  );
};

export default ImageSlider;
