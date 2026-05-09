import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code, User, Mail } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Gradient Orbs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Side: Text Content */}
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={`badge ${styles.badge}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            subham khandual | CS Student
          </motion.div>

          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Innovating with AI. <br />
            Building scalable solutions. <span className="text-gradient">Creating real-world impact.</span>
          </motion.h1>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Passionate AI enthusiast and MERN stack developer with strong problem-solving skills and 
            expertise in building scalable, efficient, and user-focused applications. Skilled in 
            creating modern web solutions, writing clean and optimized code, and transforming 
            innovative ideas into impactful digital experiences through continuous learning and 
            innovation.
          </motion.p>

          <motion.div 
            className={styles.actionBtns}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
              Resume PDF <Download size={18} />
            </a>
          </motion.div>

          <motion.div 
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="https://github.com/SubhamKhandual007" target="_blank" rel="noreferrer" className={styles.socialIcon}><Code size={20} /> <span className={styles.socialText}>GitHub</span></a>
            <a href="https://www.linkedin.com/in/subham-khandual/" target="_blank" rel="noreferrer" className={styles.socialIcon}><User size={20} /> <span className={styles.socialText}>LinkedIn</span></a>
            <a href="mailto:subhamkhandual215@gmail.com" className={styles.socialIcon}><Mail size={20} /> <span className={styles.socialText}>Email</span></a>
          </motion.div>
        </motion.div>

        {/* Right Side: Profile Image */}
        <motion.div 
          className={styles.imageContent}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow}></div>
            <img 
              src="/profile.png" 
              alt="subham khandual Profile" 
              className={styles.profileImage}
              loading="eager"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
