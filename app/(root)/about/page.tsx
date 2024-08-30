import React from 'react'

const AboutPage = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">About Us</h3>
      </section>

      <div className="wrapper my-8">
        <h2 className='font-bold'>CM Transportation services Limited</h2>
        <p>Company No: 15895579</p>
        <p>Head Office</p>
        <p>4A Cabot Square</p>
        <p>London</p>
        <p>E14 4QT</p>
        <p>cmarshall@cmtransportrecruitment.co.uk</p>
        <p>07939539108</p>
      </div>

      <div className="wrapper my-8">
        <h2 className='font-bold'>Registered Business Address</h2>
        <p>15A St. Albans Villas</p>
        <p>St Albans Road</p>
        <p>London</p>
        <p>NW5 1QU</p>
      </div>
    </>
  )
}

export default AboutPage