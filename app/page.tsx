import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import HeroSection from "@/components/pages/homePage/HeroSection"
import Courses from '@/components/pages/homePage/Courses'
import { Suspense } from 'react'
import AutoStepper from '@/components/pages/homePage/AutoStepper'
import ConsultationSection from '@/components/pages/homePage/ConsultationSection'
import WhyChooseUs from '@/components/pages/homePage/WhyChooseUs'

export default function Home() {

  return (
    <>
      <Header />
      <main className="min-h-screen ">
        <HeroSection />
        <Suspense fallback={<h2>Loading</h2>}>
          <Courses />
        </Suspense>
        <AutoStepper />
        <WhyChooseUs />
        <ConsultationSection />
        <section className="border-t border-border bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Start Learning?</h2>
            <p className="mt-4 text-lg opacity-90">Join thousands of students and transform your future today</p>
            <Link href="/courses" className="mt-8 inline-block">
              <Button size="lg" variant="secondary">
                Browse Courses Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <p className="font-semibold">LearnHub</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Empowering learners worldwide with quality education.
                </p>
              </div>
              <div>
                <p className="font-semibold">Company</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Product</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Legal</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 LearnHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
