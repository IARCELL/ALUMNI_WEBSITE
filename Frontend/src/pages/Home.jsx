import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"
import Image_swap from "../components/Image_swap/Image_swap"
import ReachUs from "../components/ReachUs/ReachUs"
import Main from "../components/Main/Main"

const Home = () => {
  return (
      <div>
          <Navbar />
          <Image_swap />
          <Main/>
          <ReachUs/>
          <Footer/> 
      </div>
  )
}

export default Home
