function Slider() {
  return (
    <>
      {/* <!-- Slider Area --> */}
      <section className="slider">
        <div className="hero-slider">
          {/* <!-- Start Single Slider --> */}
          <div
            className="single-slider"
            style={{ backgroundImage: "url('img/slider2.jpg')" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="text">
                    <h1>
                      Trustworthy <span>Medical</span> Services You Can Depend
                      
                      <span> On!</span>
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sed nisl pellentesque, faucibus libero eu, gravida
                      quam.
                    </p>
                    <div className="button">
                      <a href="#" className="btn">
                        Get Appointment
                      </a>
                      <a href="#" className="btn primary">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </section>
      {/* <!--/ End Slider Area --> */}
    </>
  );
}

export default Slider;
