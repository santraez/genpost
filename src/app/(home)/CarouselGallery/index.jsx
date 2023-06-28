"use cliente"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.sass";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const defaultImages = [
  "/default/1.png",
  "/default/2.png",
  "/default/3.png",
  "/default/4.png",
  "/default/5.png",
  "/default/6.png",
  "/default/7.png"
];

export function CarouselGallery({ result, currentImage, setCurrentImage }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const images = (result !== null) ? result?.urls : defaultImages;
  const imagesNumber = images.length || 7;
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === imagesNumber - 1 ? 0 : prevImage + 1));
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);
  return (
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[currentImage]}
          alt="ㅤ"
          className={styles.image}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        />
      </AnimatePresence>
  );
};
