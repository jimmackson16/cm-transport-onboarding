import OnboardEmployeeForm from "@/components/shared/OnboardEmployeeForm"

const OnboardEmployee = () => {

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">New Employee Onboarding</h3>
      </section>

      <div className="wrapper my-8">
        <p className="mb-2">Please provide the below information so we can onboard you as an employee, we also need to 
            check you have the right to work in the UK so please make sure to provide all required information.
        </p>

        <p>
        You can also provide your educational qualifications if the role requires (e.g. being considered for supervisor/senior positions) 
        although this is not mandatory/can be submitted in future
        </p>
      </div>

      <div className="wrapper my-8">
        <OnboardEmployeeForm />
      </div>
    </>
  )
}

export default OnboardEmployee