import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, BookOpen } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className={styles.mainGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.imageSide}
          >
            <div className={styles.imageContainer}>
              <img src="/profile.png" alt="subham khandual" className={styles.aboutImage} />
              <div className={styles.imageDecoration}></div>
            </div>
          </motion.div>

          <div className={styles.cardsSide}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`${styles.card} glass`}
            >
              <div className={styles.iconWrapper}>
                <User size={24} />
              </div>
              <h3>My Background</h3>
              <p>
                I am a final-year Computer Science student at GIFT Autonomous, Bhubaneswar, with a 
                strong passion for AI and full-stack development. I enjoy building scalable software 
                systems and solving real-world problems through clean, efficient, and innovative code. 
                As a MERN stack developer, I focus on creating impactful digital solutions while 
                continuously learning and exploring modern technologies.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className={`${styles.card} glass`}
            >
              <div className={styles.iconWrapper}>
                <Code size={24} />
              </div>
              <h3>Problem Solving & Tech</h3>
              <p>
                I have a strong foundation in problem-solving and actively enhance my skills by 
                working on real-world projects and coding challenges. I enjoy exploring modern 
                technologies, improving my development expertise, and building efficient, 
                scalable solutions.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
              className={`${styles.card} glass`}
            >
              <div className={styles.iconWrapper}>
                <BookOpen size={24} />
              </div>
              <h3>Professional Drive</h3>
              <p>
                Currently, I am learning AI/ML concepts and working on MERN stack applications to 
                build modern, scalable, and impactful solutions. I am always eager to learn new 
                technologies, enhance my development skills, and contribute to innovative tech 
                projects.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
