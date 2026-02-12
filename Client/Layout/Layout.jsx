import Navbar from '../src/Components/Navbar'
import Footer from '../src/Components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import arenaBg from "../src/assets/arenabg.webp";
import { useIsHome } from '../src/CustomHooks/useIsHome';



const Layout = () => {
  const isHome = useIsHome();
  // if(!isHome) return;
  return (
    <div>
     <div>
     
      <Navbar />
      <Outlet />
    </div>
      <Footer />  
    </div>
  )
}

export default Layout