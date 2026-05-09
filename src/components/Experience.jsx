import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Trophy, Rocket, CheckCircle2 } from 'lucide-react';
import styles from './Experience.module.css';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <h2 className="section-title">
            Journey & <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional internship, major achievements, and early exposure to tech.
          </p>
        </motion.div>

        <div className={styles.timeline}>
          
          {/* Experience Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.timelineItem}
          >
            <div className={styles.iconCircle}>
              <Briefcase size={20} />
            </div>
            <div className={`glass ${styles.itemContent}`}>
              <span className={styles.dateBadge}>July 2024</span>
              <h3 className={styles.itemTitle}>Core Java Intern – CTTC</h3>
              
              <ul className={styles.list}>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Worked on Core Java concepts and application development fundamentals.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Improved problem-solving, debugging, and object-oriented programming skills.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Gaining hands-on experience in real-world development practices and project workflows.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Collaborated on practical assignments and technical learning activities.</li>
              </ul>
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.timelineItem}
          >
            <div className={styles.iconCircle}>
              <Trophy size={20} />
            </div>
            <div className={`glass ${styles.itemContent}`}>
              <span className={styles.categoryBadge}>Certifications</span>
              
              <ul className={styles.list}>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Achieved NPTEL certification in <a href="https://drive.google.com/file/d/1bHwePdthZxv-TLBczLNetwMqFLSoQJQx/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-secondary)', textDecoration: 'underline'}}>Programming in Java 55% (2024)</a></li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Achieved NPTEL certification in <a href="https://drive.google.com/file/d/1_0UBUT9-EZlX2F_JgBuF-_eSvMaS0uOQ/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-secondary)', textDecoration: 'underline'}}>Introduction to Industry 4.0 And Industrial Internet of Things 67% (2025)</a></li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Achieved NPTEL certification in <a href="https://drive.google.com/file/d/1h5TgH-huiZN7Hr_x95uaiidFim28wSgz/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-secondary)', textDecoration: 'underline'}}>Privacy and Security in Online Social Media 54% (2025)</a></li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.timelineItem}
          >
            <div className={styles.iconCircle}>
              <Rocket size={20} />
            </div>
            <div className={`glass ${styles.itemContent}`}>
              <span className={styles.dateBadge}>May 2025 – July 2025</span>
              <h3 className={styles.itemTitle}>AI/ML Intern – CTTC, Bhubaneswar</h3>
              
              <ul className={styles.list}>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Worked on AI and Machine Learning concepts with hands-on project development.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Gained practical experience in data processing, model building, and problem-solving techniques.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Explored real-world applications of AI/ML while improving analytical and technical skills.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon}/> Collaborated on innovative projects and learned industry-level development workflows.</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
