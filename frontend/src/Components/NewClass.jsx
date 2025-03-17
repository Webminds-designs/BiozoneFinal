import React from "react";
import banner from "../Assest/Web_Images/CMBannernew.jpeg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const NewClass = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  console.log(language);
  return (
    <div
      className={` w-full h-fit flex flex-col items-center justify-center py-5 mt-5 ${
        language === "si" ? "font-indumathi" : ""
      }`}
    >
      <h3 className=" text-green-600 font-reddit uppercase text-sm font-semibold mb-3 ">
        <span className={`${language === "si" ? "font-amantha" : ""}`}>
          {language === "en" ? "Announcements" : "දැනුම්දීම"}
        </span>
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="w-fit text-[25px] xl:text-[52px] mt-2 lg:mt-0 2xl:text-[64px] font-semibold leading-tight ease-linear mb-2">
          {language === "en" ? "Our New Announcement" : "අපගේ නව දැනුම්දීම"}
        </h1>
      </motion.div>
      <img
        className="h-auto w-full md:3/4 lg:w-3/5 rounded-lg "
        src={banner}
        alt="banner"
      />
    </div>
  );
};

export default NewClass;
