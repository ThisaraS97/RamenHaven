import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './ImageSlider.css'; // Import the custom CSS
import { FaArrowRight } from 'react-icons/fa';
import slideImage1 from './slideImage1.png'; // Update the path to your image
import slideImage2 from './Woman-in-kimono-and-furoshiki-box.png'; // Update the path to the second image

const ImageSlider = () => {
  return (
    <div className="image-slider-container">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000, // Auto slides every 5 seconds
          disableOnInteraction: false, // Keeps autoplay running even after user interaction
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="slide-content">
            <div className="slide-image">
              <img src={slideImage1} alt="Matcha and Snacks" />
            </div>
            <div className="slide-text">
              <h1>Bring The Best Of Japan To Your Home</h1>
              <p>
                We specialize in food, beauty, health & home to bring your favorite Japanese flavors, design, and wellness-related products closer to you, no matter where you are.
              </p>
              <button className="shop-now-button">
                Shop Now <FaArrowRight />
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="slide-content">
            <div className="slide-image">
              <img src={slideImage2} alt="Sign Up" />
            </div>
            <div className="slide-text">
              <h1>Join Us & Stay Updated</h1>
              <p>
                Sign up for our newsletter to receive the latest updates on new arrivals, exclusive offers, and more.
              </p>
              <button className="sign-up-button">
                Sign Up <FaArrowRight />
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
