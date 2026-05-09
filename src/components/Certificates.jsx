import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Award } from 'lucide-react';
import styles from './Certificates.module.css';

const certificates = [
  {
    id: 1,
    title: "Programming in Java",
    org: "NPTEL (IIT Kharagpur) - Score: 55%",
    date: "2024",
    image: "/java-certificate.png",
    link: "https://drive.google.com/file/d/1bHwePdthZxv-TLBczLNetwMqFLSoQJQx/view?usp=sharing"
  },
  {
    id: 2,
    title: "Industry 4.0 & IIoT",
    org: "NPTEL (IIT Kharagpur) - Score: 67%",
    date: "2025",
    image: "/iiot.png",
    link: "https://drive.google.com/file/d/1_0UBUT9-EZlX2F_JgBuF-_eSvMaS0uOQ/view?usp=sharing"
  },
  {
    id: 3,
    title: "Privacy and Security in Online Social Media",
    org: "NPTEL (IIIT Hyderabad) - Score: 54%",
    date: "2025",
    image: "/privacy.png",
    link: "https://drive.google.com/file/d/1h5TgH-huiZN7Hr_x95uaiidFim28wSgz/view?usp=sharing"
  },
];

const Certificates = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 3000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isHovered]);

  return (
    <section id="certificates" className={styles.certSection}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className="section-title">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <p className={styles.subtitle}>
            A showcase of my academic achievements and professional skill validations.
          </p>
        </motion.div>

        <div 
          className={styles.carouselContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.carouselStage}>
            {certificates.map((cert, i) => {
              // Calculate relative position for 3D effect
              let offset = (i - index + certificates.length) % certificates.length;
              if (offset > certificates.length / 2) offset -= certificates.length;

              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              
              // Only show items near the center
              if (absOffset > 2) return null;

              return (
                <motion.div
                  key={cert.id}
                  className={`${styles.card} glass`}
                  initial={false}
                  animate={{
                    x: offset * 250,
                    scale: 1 - absOffset * 0.2,
                    zIndex: 10 - absOffset,
                    opacity: 1 - absOffset * 0.3,
                    rotateY: offset * -25,
                    filter: `blur(${absOffset * 2}px)`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className={styles.cardImage}>
                    <div className={styles.imagePlaceholder}>
                      <Award size={48} className={styles.certIcon} />
                      <img src={cert.image} alt={cert.title} className={styles.actualImage} onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.title}>{cert.title}</h3>
                    <p className={styles.org}>{cert.org}</p>
                    <p className={styles.date}>{cert.date}</p>
                    <a href={cert.link} className={`btn btn-primary ${styles.viewBtn}`}>
                      View Certificate <ExternalLink size={14} />
                    </a>
                  </div>
                  {isActive && <div className={styles.glowEffect} />}
                </motion.div>
              );
            })}
          </div>

          <button className={styles.navBtnLeft} onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className={styles.navBtnRight} onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={styles.indicators}>
          {certificates.map((_, i) => (
            <button
              key={i}
              className={`${styles.indicator} ${i === index ? styles.activeIndicator : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
