import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Portfolio } from "@/components/sections/portfolio"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { SectionStack } from "@/components/section-stack"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SectionStack>
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <About />
          <Contact />
        </SectionStack>
      </main>
      <Footer />
    </>
  )
}
