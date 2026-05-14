import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const InstagramIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (data = formData) => {
    let newErrors = {};
    
    // Name Validation
    const nameRegex = /^[A-Za-z ]{3,}$/;
    if (!data.name.trim()) {
      newErrors.name = 'This field is required';
    } else if (!nameRegex.test(data.name)) {
      newErrors.name = 'Invalid Name';
    }
    
    // Email Validation (Gmail Mandatory)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!data.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid Gmail address (e.g., user@gmail.com)';
    }
    
    // Message Validation
    if (!data.message.trim()) {
      newErrors.message = 'This field is required';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message is too short';
    }
    
    return newErrors;
  };

  const isFormValid = () => {
    const currentErrors = validate();
    return Object.keys(currentErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedData = { ...formData, [id]: value };
    setFormData(updatedData);
    
    // Validate on the fly to show/hide errors
    const currentErrors = validate(updatedData);
    setErrors(currentErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = validate();
    if (Object.keys(currentErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitting(false);
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ submit: 'Something went wrong. Please try again later.' });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.header}
        >
          <h2 className="section-title">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className={styles.subtitle}>
            Currently looking for new opportunities and open to discussing full-time roles, internships, or exciting projects.
          </p>
        </motion.div>

        <div className={styles.content}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.contactInfo}
          >
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Mail />
              </div>
              <div>
                <h3>Email Me</h3>
                <p>subhamkhandual215@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <MapPin />
              </div>
              <div>
                <h3>Location</h3>
                <p>Bhubaneswar, India</p>
              </div>
            </div>

            <a 
              href="https://www.linkedin.com/in/subham-khandual/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.infoCard} ${styles.linkCard}`}
            >
              <div className={styles.iconWrapper}>
                <LinkedinIcon />
              </div>
              <div>
                <h3>LinkedIn</h3>
                <p>Connect with me</p>
              </div>
            </a>

            <a 
              href="https://github.com/SubhamKhandual007" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.infoCard} ${styles.linkCard}`}
            >
              <div className={styles.iconWrapper}>
                <GithubIcon />
              </div>
              <div>
                <h3>GitHub</h3>
                <p>View my projects</p>
              </div>
            </a>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`${styles.form} glass`}
            onSubmit={handleSubmit}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Subham Khandual" 
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="subham@example.com" 
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                rows="5" 
                placeholder="Let's build something..."
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? styles.inputError : ''}
              ></textarea>
              {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={isSubmitting || !isFormValid()}
            >
              {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
              {!isSubmitting && !submitted && <Send size={18} />}
            </button>

            {errors.submit && <p className={styles.errorMessage} style={{textAlign: 'center', marginTop: '1rem'}}>{errors.submit}</p>}
            {submitted && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={styles.successMessage}
              >
                Thank you! I will get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <div className={styles.socialLinks}>
          <a 
            href="https://www.linkedin.com/in/subham-khandual/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={styles.socialIcon}
          >
            <LinkedinIcon size={20} />
          </a>
          <a 
            href="https://github.com/SubhamKhandual007" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={styles.socialIcon}
          >
            <GithubIcon size={20} />
          </a>
          <a 
            href="https://www.instagram.com/mr_subham7.0?igsh=MTFud3JibGhqbGw4bQ==" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={styles.socialIcon}
          >
            <InstagramIcon size={20} />
          </a>
          <a 
            href="https://www.facebook.com/share/1LuEB32wPV/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={styles.socialIcon}
          >
            <FacebookIcon size={20} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Subham Khandual. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;
