import { Outlet } from 'react-router'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import { ClientOnly } from '~/components/ClientOnly'
import LightPillar from '~/components/backgrounds/LightPillar'


export default function RootLayout() {
  return (
    <>
      {/* Fixed behind the page: shows through the paper sections, hidden under the hero photo */ }
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
        <ClientOnly>
          <LightPillar
            topColor="#00b4f0"
            bottomColor="#1f6a96"
            intensity={ 0.55 }
            rotationSpeed={ 0.3 }
            glowAmount={ 0.002 }
            pillarWidth={ 3 }
            pillarHeight={ 0.4 }
            noiseIntensity={ 0.25 }
            pillarRotation={ 25 }
            mixBlendMode="normal"
            quality="high"
            transparent
          />
        </ClientOnly>
      </div>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}
