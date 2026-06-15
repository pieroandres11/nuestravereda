import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { Header } from '@/components/Header'
import { HeroCarousel } from '@/components/HeroCarousel'
import { PostGrid } from '@/components/PostGrid'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  // Sort posts by date, most recent first
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <Header />
      <HeroCarousel posts={sortedPosts} />
      <PostGrid posts={sortedPosts} />
      <ContactSection />
      <Footer />
    </>
  )
}
