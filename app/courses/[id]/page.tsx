import { getSingleCourses } from '@/app/actions/course'
import Footer from '@/components/Footer'
import { Header } from '@/components/header'
import DetailsLeft from '@/components/pages/courseDetails/DetailsLeft'
import DetailsRight from '@/components/pages/courseDetails/DetailsRight'
import DetailsTopCard from '@/components/pages/courseDetails/DetailsTopCard'

export default async function CourseDetailsPage() {

  const result = await getSingleCourses('30001')
  console.log(result)

  // if (!course) {
  //   return (
  //     <>
  //       <Header />
  //       <main className="container mx-auto px-4 py-20 text-center">
  //         <h1 className="text-3xl font-bold">Course not found</h1>
  //         <Link href="/courses" className="mt-4 inline-block">
  //           <Button>Back to Courses</Button>
  //         </Link>
  //       </main>
  //     </>
  //   )
  // }



  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}

        <DetailsTopCard />
        <div className=" max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-3 py-10">
            <DetailsLeft course={result?.data} />
            <DetailsRight course={result?.data} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
