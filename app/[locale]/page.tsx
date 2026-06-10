import { notFound } from "next/navigation"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Portfolio } from "@/components/sections/portfolio"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { SectionStack } from "@/components/section-stack"
import { AnimatedBackground } from "@/components/animated-background"
import { CustomCursor } from "@/components/custom-cursor"
import { Preloader } from "@/components/preloader"
import { ScrollProgress } from "@/components/scroll-progress"
import { getProjects, getTeam, getStats } from "@/lib/content"
import { isLocale } from "@/lib/i18n/config"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [projects, team, stats] = await Promise.all([
    getProjects(locale),
    getTeam(locale),
    getStats(locale),
  ])
  const hasProjects = projects.length > 0

  return (
    <>
      <Preloader />
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgress />
      <Header hasProjects={hasProjects} />
      <main>
        <SectionStack>
          <Hero hasProjects={hasProjects} />
          <Services />
          {hasProjects && <Portfolio projects={projects} />}
          <Process />
          <About team={team} stats={stats} />
          <Contact />
        </SectionStack>
      </main>
      <Footer />
    </>
  )
}
