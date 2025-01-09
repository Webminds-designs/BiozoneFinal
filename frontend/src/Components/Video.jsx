import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { motion } from "framer-motion";

import content from "../content/videoContent";
import vid1 from "../Assest/videos/vid1.mp4";
import vid2 from "../Assest/videos/vid2.mp4";
import vid3 from "../Assest/videos/vid3.mp4";

export default function Video() {
  const [language, setLanguage] = useState("en");
  const [currentIndex, setCurrentIndex] = useState(1);
  const videos = [vid1, vid2, vid3];
  const videoRefs = useRef([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
      // Ensure only the middle video is auto-playing, others are paused
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const position = (index - currentIndex + videos.length) % videos.length;
          if (position === 1) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
      console.log("Current Index: ", currentIndex);
    }, [currentIndex]);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + videos.length) % videos.length
      );
    };

    const getPositionStyles = (index) => {
      const position = (index - currentIndex + videos.length) % videos.length;
      const baseTranslateX = 350; // Distance between slides
      const scale = position === 1 ? 1.2 : 0.8; // Larger for center video
      const rotation = position === 1 ? 0 : position === 0 ? 30 : -30; // Rotate left/right
      const translateX = baseTranslateX * (position === 0 ? -1 : position === 2 ? 1 : 0); // Offset for left/right
      const width = position === 1 ? "400px" : "250px"; // Larger for center video
      const height = position === 1 ? "400px" : "500px"; // Larger for center video

      return {
          transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotation}deg)`,
          zIndex: position === 1 ? 2 : 1,
          opacity: position === 1 ? 1 : 0.5,
          width: width,
          height: height,
      };
    };

  const currentContent = content[language];;

  return (
    <div className="container relative mx-auto flex flex-col items-center justify-center h-screen mt-32 mb-10 w-screen">
      {/* Header */}
      <motion.div
        className="text-center flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <p className="text-green-600 font-reddit uppercase text-sm font-semibold mb-3">
          {currentContent.title}
        </p>
        <h2 className="font-reddit text-[28px] xl:text-[40px] 2xl:text-[48px] text-primarytext mb-2 font-medium w-auto lg:text-nowrap">
          {currentContent.subtitle}
        </h2>
      </motion.div>

      {/* video carousel */}
      <div className="container relative mx-auto mt-20 flex flex-col items-center justify-center h-screen w-screen">

        <motion.div
          className="relative flex items-center justify-center w-full h-[500px]"
          style={{ perspective: "1000px" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={getPositionStyles(index)}
              transition={{ duration: 0.8 }}
              className="absolute rounded-lg bg-black overflow-hidden"
              onClick={() => console.log("video index: ", index)}
            >
              <div
                className="h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video}
                  className="h-full w-full object-cover"
                  loop
                  muted
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrow Icons */}
        <div className="flex justify-center gap-20 mt-8">
          <div className="cursor-pointer" onClick={prevSlide}>
            <GoArrowLeft size={25} color="#07958F" />
          </div>
          <div className="cursor-pointer" onClick={nextSlide}>
            <GoArrowRight size={25} color="#07958F" />
          </div>
        </div>

        {/* description and count */}
        <div className="flex justify-between w-full mt-10 px-2 lg:px-32">
          <p className="text-gray-500 mb-10 text-[14px] xl:text-[18px] 2xl:text-[18px] md:max-w-xl max-w-60">
            {currentContent.description}
          </p>
          <p className="text-primary1 md:text-5xl text-xl mb-10 font-bold font-reddit">
            {`0${currentIndex + 1} / 0${videos.length}`}
          </p>
        </div>

      </div>
    </div>
  );
}
