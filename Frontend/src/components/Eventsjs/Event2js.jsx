import { motion } from 'framer-motion'
import "./css.css"
import CVWritingMitul from '../../assets/CVWritingMitul.png'
import CVWritingScreenshots from '../../assets/CVWritingScreenshots.png'

const Event2js = () => {
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
        <h1>CV Writing Session</h1>
        <p className="event-date">28th September 2024</p>
        <p className="event-speaker">Speaker: Mitul Kataria, Alumni</p>
      </motion.div>
      
      <motion.div className="event-content" variants={containerVariants}>
        <motion.div className="event-description" variants={itemVariants}>
          <h2>About the Session</h2>
          <p>
            One of our esteemed alumni Mitul Kataria who works in Otsuka Shokal as Machine
            Learning Engineer has hosted the CV writing session event which helped a lot of our
            students to enhance their CV and get a clear understanding about the job seeking
            procedure. The session lasted around 45 min and it has also been uploaded on the IAR
            cell youtube channel.
          </p>
        </motion.div>

        <motion.div className="event-image" variants={itemVariants}>
          <img 
            src={CVWritingMitul} 
            alt="CV Writing Session Poster with Mitul Kataria" 
            className="event-photo" 
          />
          <p className="image-caption">CV Writing Session - 28th September 2024, featuring Mitul Kataria</p>
        </motion.div>

        <motion.div className="speaker-info" variants={itemVariants}>
          <h2>About the Speaker</h2>
          <div className="speaker-details">
            <h3>Mitul Kataria</h3>
            <p><strong>Position:</strong> Machine Learning Engineer</p>
            <p><strong>Company:</strong> Otsuka Shokal</p>
          </div>
        </motion.div>

        <motion.div className="event-image" variants={itemVariants}>
          <img 
            src={CVWritingScreenshots} 
            alt="CV Writing Session Screenshots" 
            className="event-photo" 
          />
          <p className="image-caption">Session highlights showing CV writing tips, templates, and key takeaways</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Event2js