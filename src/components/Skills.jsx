import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Code, Globe, Layout, Server, Cpu } from 'lucide-react';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "Backend & Core",
    icon: <Terminal size={24} />,
    skills: ["Node.js", "Express.js", "React.js", "Java"]
  },
  {
    title: "Data Structures & Algos",
    icon: <Code size={24} />,
    skills: ["Problem Solving", "Data Structures & Algorithms", "Arrays & Strings"]
  },
  {
    title: "Database & Tools",
    icon: <Database size={24} />,
    skills: ["MySQL", "MongoDB", "Git / GitHub"]
  },
  {
    title: "Frontend & Web",
    icon: <Globe size={24} />,
    skills: ["HTML/CSS", "JavaScript", "Tailwind CSS", "Vite"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 }
};

const Skills = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <h2 className="section-title">
            My <span className="text-gradient">Skill Arsenal</span>
          </h2>
          <p className={styles.subtitle}>
            A comprehensive overview of my technical expertise, from building robust backend architectures to mastering algorithmic problem-solving.
          </p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className={`${styles.card} glass`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>
              <div className={styles.skillsList}>
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className={styles.skillPill}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
