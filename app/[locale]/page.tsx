import { notFound } from "next/navigation"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Work } from "@/components/sections/work"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { SectionStack } from "@/components/section-stack"
import { TransitionFlash } from "@/components/transition-flash"
import { Preloader } from "@/components/preloader"
import { HomeHashScroll } from "@/components/home-hash-scroll"
import { getProjects } from "@/lib/content"
import { isLocale } from "@/lib/i18n/config"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const projects = await getProjects(locale)
  const hasProjects = projects.length > 0

  return (
    <>
      <Preloader />
      <HomeHashScroll />
      <Header hasProjects={hasProjects} />
      <main>
        <SectionStack spans={[1, 2, 7.5]}>
          <Hero hasProjects={hasProjects} />
          <Services />
          <Work projects={projects} />
        </SectionStack>
        <Contact />
      </main>
      <Footer />
      <TransitionFlash />
    </>
  )
}
