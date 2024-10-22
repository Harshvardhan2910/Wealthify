import { NavLink } from "react-router-dom";


const Home = () => {

    return (
        <>
            <section className="section-home">

                <div className="container grid grid-two-cols">

                    <div className="section-content"> 
                        
                        <div className="content">

                            <h1>Wellcome to Wealthify</h1> <br/>
                            <p>We offer a diverse fleet of top-quality Courses, providing the best courses with unbeatable offers. Elevate your journey with learning, planning, and exitement.</p>
                            <br/>
                            <NavLink to="/register">
                                <img className="register-home" src="/images/register-home.png" alt="Contact Image" />
                            </NavLink> 
                            <br/><br/>  

                        </div>

                    </div>

                    <div className="contact-img">
                        <img src="/images/home-image.png" alt="Contact Image" />
                    </div>

                </div>
            </section>
            {/* <About/> */}
            <br/>
            <br/>
            <br/>
            {/* <Contact/> */}
        </>
    );
};

export default Home;
