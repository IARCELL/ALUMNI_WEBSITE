import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';
import logo from '../../assets/iar.png';

export default function Preloader() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem("introSeen");
    if (seen) {
      setLoading(false);
      setTimeout(() => navigate("/home"), 500);
      return;
    }

    const timer = setTimeout(() => {
      localStorage.setItem("introSeen", "true");
      setLoading(false);
      setTimeout(() => navigate("/home"), 800);
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="preloader-content">
            {/* Logo with animations */}
            <motion.div
              className="logo-container"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeOut"
              }}
            >
              <motion.img
                src={logo}
                className="logo"
                alt="IAR CELL Logo"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="logo-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Tagline with staggered animation */}
            <motion.div
              className="tagline-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <h1 className="tagline">Global Opportunities,</h1>
              <h1 className="tagline">Lifelong Connections</h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="loading-bar">
                <motion.div
                  className="loading-progress"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 2,
                    delay: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <motion.p
                className="loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Loading...
              </motion.p>
            </motion.div>
          </div>

          {/* Background particles */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0
                }}
                animate={{
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}