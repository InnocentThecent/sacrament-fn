import Footer from "../layouts/Footer"
import NavBar from "../layouts/NavBar"


const About = () => {
    return (
        <>
            <NavBar />
            <div className=" min-h-screen flex justify-center flex-col bg-gray-100">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 mt-10 sm:mt-20">
                    <div className="font-light  sm:text-lg text-gray-400">
                        <h2 className="mb-4 text-5xl text-left font-extrabold  text-dark">
                            Our Mission
                            {/* <span className="text-primary"> life easier</span> */}
                        </h2>
                        <p className="mb-4 text-2xl mt-8 font-medium">
                            Pocket Money was founded in 2020 by a team of talented IT and FinTech
                            specialists who wanted to prove that people don’t need to compromise to
                            make transactions on mobile phone
                            — that no having a cell phone , Getting Money everywhere it should be accessible, convenient and more fun.
                        </p>
                        <p className="mb-4 text-2xl mt-8 font-medium">
                            Our Target Market are the students , vulnerable  people who do not have Mobile phones
                            Today, we continue to develop, improve and constantly innovate trading experience. We do believe that trading should be available to anyone in the world.

                        </p>
                    </div>
                </div>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="font-light  sm:text-lg text-gray-400">
                        <h2 className="mb-4 text-5xl text-right font-extrabold  text-dark">
                            Our Vision
                            {/* <span className="text-primary"> life easier</span> */}
                        </h2>
                        <p className="mb-4 text-2xl mt-8 font-medium">
                            At Pocket Money, our vision is to empower every individual,
                            regardless of their circumstances, with the ability to access, manage,
                            and enjoy their finances conveniently and equitably.
                            We envision a world where financial transactions are not constrained by technology
                            barriers, ensuring that every person, including students and vulnerable individuals without mobile phones, can participate in the economy with ease.
                        </p>
                        <p className="mb-4 text-2xl mt-8 font-medium">
                            Our journey began in 2020 with a mission to eliminate the compromises people face when
                            making transactions on mobile phones. We firmly believe that financial inclusion is not just about providing access, but also about ensuring that the experience is accessible,
                            convenient, and even enjoyable. We are driven by the conviction that no one should be left behind in the digital financial revolution.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About