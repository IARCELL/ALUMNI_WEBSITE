import { motion } from 'framer-motion'
import "./css.css"
import SACAlumnimeet from '../../assets/SACAlumnimeet.png'

const Event1js = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
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
  };

  return (
    <motion.div
      className='subEvents'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="event-header" variants={itemVariants}>
        <h1>SAC Alumni Meet</h1>
        <p className="event-date">21st June 2024</p>
      </motion.div>
      
      <motion.div className="event-content" variants={containerVariants}>
        <motion.div className="event-description" variants={itemVariants}>
          <h2>About the Event</h2>
          <p>
            We had our first SAC Alumni meet on 21st June 2024. We had SAC members of
            2020, 2021 and 2022 batch as our invitees. It is a general chat session about their
            experiences as SAC members, how holding on to a responsibility helped them in their
            career and the session also had interaction with current SAC members SAC 2024.
            This session helped current 2024 SAC members to engage with previous members and
            their experiences.
          </p>
        </motion.div>

        <motion.div className="event-image" variants={itemVariants}>
          <img 
            src={SACAlumnimeet} 
            alt="SAC Alumni Meet - Video Conference Session" 
            className="event-photo" 
          />
          <p className="image-caption">SAC Alumni Meet - Interactive session with alumni from 2020, 2021, and 2022 batches</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Event1js