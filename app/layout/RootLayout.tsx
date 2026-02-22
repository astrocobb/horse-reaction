import { useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import { ClientOnly } from '~/components/ClientOnly'
import LightPillar from '~/components/backgrounds/LightPillar'


export default function RootLayout() {

  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="relative">
      <ClientOnly>
        <LightPillar
          topColor="#00b4f0"
          bottomColor="#1f6a96"
          intensity={ 1 }
          rotationSpeed={ 0.3 }
          glowAmount={ 0.002 }
          pillarWidth={ 3 }
          pillarHeight={ 0.4 }
          noiseIntensity={ 0.5 }
          pillarRotation={ 25 }
          mixBlendMode="screen"
          quality="high"
        />
      </ClientOnly>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}