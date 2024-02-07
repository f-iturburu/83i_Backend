import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navbar';
import { Footer } from '../components/Footer';

const RootLayout = () => {
  return ( 
    <div className="root-layout">
      <Navigation />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout;
