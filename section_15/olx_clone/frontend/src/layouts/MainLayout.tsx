import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import FlashMessage from "../components/FlashMessage";

const MainLayout = ({ fullscreen = false }: { fullscreen?: boolean }) => {
  return (
    <>
      {!fullscreen && <Navbar />}

      <FlashMessage />
      
      <section id="main">
        <Outlet />
      </section>

      <Footer />
    </>
  )
}

export default MainLayout;