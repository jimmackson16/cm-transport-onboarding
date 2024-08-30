
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {



  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 md:items-center">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">CM transportation services new employee onboarding portal</h1>
            <p className="p-regular-20 md:p-regular-24">Making your journey into your new role seamless - 
            Streamlining the onboarding process for new employees.</p>
          </div>

          <Image 
            src="/assets/images/job-search.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 

    </>
  )
}
