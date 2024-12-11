import React from 'react';
import HeroImg from '../assets/HeroImg.jpg';

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row border border-gray-400">
        {/* Hero left side */}
        <div className="flex w-full sm:w-1/2 items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className="flex items-center gap-2">
              <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
            </div>
          </div>
        </div>
        {/* Hero right side (image) */}
        <div className="w-full sm:w-1/2">
          <img 
            src={HeroImg} 
            alt='hero' 
            className='w-[850px] h-[800px] object-cover object-center  transition-transform duration-300 ease-in-out' 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
