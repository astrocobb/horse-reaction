import { useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'


export default function RootLayout() {

  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}