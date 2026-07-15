import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"
import "./About.css"
import Contacts from "../components/Contact/contact"
import '../components/Main/Main.css'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const heroRef = useRef(null)
  const isInView = useInView(heroRef, { once: true, margin: "-50px", amount: 0.1 })

  // Animation variants for text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1]
      }
    }
  }

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1]
      }
    }
  }

  return (
      <div className="About">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Main Heading */}
            <motion.h1 className="hero-heading">
              <motion.span className="heading-word" variants={wordVariants}>About</motion.span>
              <motion.span className="heading-word highlight" variants={wordVariants}>Us</motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.h2 className="hero-subheading" variants={fadeInUp}>
              IIT Palakkad
            </motion.h2>

            {/* Event Details / Tagline */}
            <motion.p className="hero-tagline" variants={fadeInUp}>
              Alumni Relations Office
            </motion.p>

            {/* Description */}
            <motion.div className="hero-description" variants={fadeInUp}>
              <p>
                The IIT Palakkad Alumni Relations Office aims to encourage and facilitate 
                engagement of our alumni with each other, with our current students, and 
                with the institute.
                We actively promote alumni achievements, help them build connections, and 
                work to address any concerns. Our alumni are an integral part of our 
                institution, and through this platform, we invite you to stay connected 
                and use the opportunity to network and collaborate.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="content-section">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="content-heading">Our Mission</h2>
            <p className="content-text">
              To foster a lifelong connection between IIT Palakkad and its alumni community, 
              creating a vibrant network that supports professional growth, knowledge sharing, 
              and institutional development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="content-heading">What We Do</h2>
            <p className="content-text">
              We organize events, facilitate mentorship programs, showcase alumni achievements, 
              and provide platforms for networking. Our initiatives include alumni meets, 
              industry interactions, student-alumni connect sessions, and recognition programs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="content-heading">Join Our Community</h2>
            <p className="content-text">
              Whether you are a recent graduate or a seasoned professional, your connection 
              to IIT Palakkad matters. Join our growing community of alumni and be part of 
              a network that spans across industries and continents.
            </p>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            className="social-links-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            <h2 className="content-heading">Connect With Us</h2>
            <div className="social-links-container">
              <div className="linkedin-links-row">
                <a
                  href="https://www.linkedin.com/in/iit-palakkad-alumni-relations-19142a25b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-item"
                >
                  <FaLinkedin className="social-icon linkedin-icon" />
                  <span className="social-link-text">LinkedIn - Alumni Relations</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/international-relations-iit-palakkad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-item"
                >
                  <FaLinkedin className="social-icon linkedin-icon" />
                  <span className="social-link-text">LinkedIn - International Relations</span>
                </a>
              </div>
              <a
                href="https://www.instagram.com/iarcell.iitpkd/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <FaInstagram className="social-icon instagram-icon" />
                <span className="social-link-text">Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Contacts />
      <Footer />
    </div>
  )
}

export default About