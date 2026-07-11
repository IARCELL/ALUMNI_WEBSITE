// import React from 'react'

import './NotableAlumni.css';
import Image1 from "../../assets/NotableAlumni/Image1.png"
import Image2 from "../../assets/NotableAlumni/Image2.png"
import Image3 from "../../assets/NotableAlumni/Image3.png"
import InstaIcon from "../../assets/NALinstagram.svg"
import LinkedInIcon from "../../assets/NALlinkedin.svg"

const NotableAlumni = () => {
  return (
      <div className="NALcontainer">
        <div className="NALwrapper">
        <h1 id="NALtitle">Notable Alumni</h1>


        <div className="ImageSectionLink">
        <div className="NALImageSection">
          <img className="NALImage" src={Image1} alt="Gaurav Saharan" />
          <div className="NALText">
            <div className='NALpara'>
              <h3>GAURAV SAHARAN</h3>
              <p>Gaurav Saharan, an IIT Palakkad alumnus, achieved a remarkable milestone by securing the AIR-28 rank in UPSC IFoS 2024. He graduated with a B.Tech in Mechanical Engineering in 2020. The institute congratulates Gaurav Sharan on this significant accomplishment, extending heartfelt wishes for continued success in his professional endeavors.</p>
            </div>
            <div className='NALLink'>
              <a href="https://www.instagram.com/p/C660W57yYYv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer"><img src={InstaIcon} alt="insta" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.linkedin.com/posts/iit-palakkad-alumni-relations-19142a25b_heartiest-congratulations-to-mr-gaurav-saharan-activity-7196387458740039680-SG_5?utm_source=share&utm_medium=member_desktop" target="_blank" rel="noopener noreferrer"><img src={LinkedInIcon} alt="linkedin" /></a>
        
            </div>
          </div>
        </div>
        </div>


        <div className="ImageSectionLink">
        <div className="NALImageSection">
          <img className="NALImage" src={Image2} alt="Sayandip Choudhury" />
          <div className="NALText">
            <div className="NALpara">
              <h3>SAYANDIP CHOUDHURY</h3>
              <p>&ldquo;Celebrating Excellence: Sayandip Choudhury, IIT Palakkad '23, Achieves Remarkable 99.99 Percentile in CAT 2023! 🌟 #IITPalakkadPride #CAT2023 #SuccessStory&rdquo;</p>
            </div>
            <div className='NALLink'>
              <a href="https://www.instagram.com/p/C1JYdy0IzpH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer"><img src={InstaIcon} alt="insta" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.linkedin.com/posts/iit-palakkad-alumni-relations-19142a25b_iitpalakkadpride-cat2023-successstory-activity-7143889607644921857-lvaF?utm_source=share&utm_medium=member_desktop" target="_blank" rel="noopener noreferrer"><img src= {LinkedInIcon} alt="linkedin" /></a>
            </div>
          </div>
        </div>
        </div>


        <div className="ImageSectionLink">
        <div className="NALImageSection">
          <img className="NALImage" src={Image3} alt="Vineet Jain" />
          <div className="NALText">
            <div className='NALpara'>
              <h3>VINEET JAIN</h3>
              <p>Vineet Jain, an IIT Palakkad alumnus, achieved a remarkable milestone by securing the first rank in the Civil Engineering Discipline of the All India Engineering Services Exam on his very first attempt. Having graduated with a B.Tech in Civil Engineering in 2023, Vineet further demonstrated his excellence by attaining the 11th rank in the All India GATE exam of the same year. Currently serving as a Management Trainee at Engineers India Limited, Mr. Vineet's journey exemplifies academic brilliance and dedication. His stellar performance in inter-IIT competitions and consistent high grades showcase the quality of education at IIT Palakkad. The institute congratulates Vineet Jain on this significant accomplishment, extending heartfelt wishes for continued success in his professional endeavors.</p>
            </div>
            <div className='NALLink'>
              <a href="https://www.instagram.com/p/C0CLTpfSd3V/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer"><img src={InstaIcon} alt="insta" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.linkedin.com/posts/alumni-cell-of-iit-palakkad-2015_vineet-jain-an-iit-palakkad-alumnus-achieved-activity-7133851730571661312-AQym?utm_source=share&utm_medium=member_desktop" target="_blank" rel="noopener noreferrer"><img src= {LinkedInIcon} alt="linkedin" /></a>
            </div>          
          </div>
        </div>
        </div>

        
      </div>
      </div>
  );
}

export default NotableAlumni;
