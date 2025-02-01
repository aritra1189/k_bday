import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pic1 from "./img/pic1.jpg";
import Pic2 from "./img/pic2.jpg";
import Pic3 from "./img/pic3.jpg";
import Pic4 from "./img/pic4.jpg";
import Pic5 from "./img/pic5.jpg";
import { CakeCeremony } from "./CakeCeremony"; // Import Cake Cutting Page
interface PhotoGalaeryProps {
  onComplete: () => void;
}
interface Photo {
  url: string;
  caption: string;
  
}

const photos: Photo[] = [
  {
    url: Pic1,
    caption:
      "Happy Birthday to the one who knows all my secrets and still chooses to stay! Here's to another year of laughter, chaos, and making memories.",
  },
  {
    url: Pic2,
    caption:
      "To my partner-in-crime, my therapist, and my biggest cheerleader—happy birthday, queen! The world shines brighter with you in it. 👑✨",
  },
  {
    url: Pic3,
    caption:
      "Cheers to you on your special day! Life’s an adventure, and I’m glad I get to navigate it with you by my side. 🥂💖",
  },
  {
    url: Pic4,
    caption:
      "Happy Birthday to my forever confidant and the person who makes life so much brighter! Love you to the moon and back. 🌙❤️",
  },
  {
    url: Pic5,
    caption:
      "On your special day, I just want to remind you how amazing, beautiful, and inspiring you are. Cheers to many more memories together! 🥳✨",
  },
];

export const PhotoGallery: React.FC<PhotoGalaeryProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCakeCutting, setShowCakeCutting] = useState(false); // State to navigate to Cake Cutting Page

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000); // Change image every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <AnimatePresence mode="wait">
      {!showCakeCutting ? (
        <motion.div
          key="photoGallery"
          className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-300 to-purple-500 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-5xl text-center mb-6 text-white font-bold shadow-md">
            You are amazing ❤️
          </h2>

          {/* Photo Display */}
          <div className="relative w-full max-w-4xl aspect-[16/9]">
            <AnimatePresence mode="wait">
              {photos.map(
                (photo, index) =>
                  index === currentIndex && (
                    <motion.div
                      key={index}
                      className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1 }}
                    >
                      <img
                        src={photo.url}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-2xl"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                        <p className="text-white text-xl text-center font-medium">
                          {photo.caption}
                        </p>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Button to Navigate to Cake Cutting Page */}
          <motion.button
            className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCakeCutting(true)} // Change state to show Cake Ceremony
          >
            Well, I have something interesting for you, Krixx ❤️
          </motion.button>
        </motion.div>
      ) : (
        <CakeCeremony onComplete={() => console.log("Cake Ceremony Done!")} />
      )}
    </AnimatePresence>
  );
};

