import CarBody from './car-body';
import CarFleet from './cars';
import Hero from './hero';

export function Home() {
  return (
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <Hero />
      <CarFleet />

      <section id="section-img-with-tab" data-bgcolor="#f8f8f8">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 offset-lg-7">
              <h2>Only Quality For Clients</h2>
              <div className="spacer-20"></div>

              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Luxury
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Comfort
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Prestige
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <p>
                    We offer a meticulously curated collection of the most
                    sought-after luxury vehicles on the market. Whether you
                    prefer the sporty allure of a high-performance sports car,
                    the sophistication of a sleek and luxurious sedan, or the
                    versatility of a premium SUV, we have the perfect car to
                    match your discerning taste.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <p>
                    We prioritize your comfort and convenience throughout your
                    journey. We understand that a comfortable ride can make a
                    world of difference, whether you're embarking on a business
                    trip or enjoying a leisurely vacation. That's why we offer a
                    wide range of well-maintained, comfortable cars that cater
                    to your specific needs.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <p>
                    We understand that prestige goes beyond luxury. It's about
                    making a statement, embracing sophistication, and indulging
                    in the finer things in life. That's why we offer an
                    exclusive selection of prestigious cars that exude elegance,
                    style, and status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="image-container col-md-6 pull-right"
          data-bgimage="url(images/background/5.jpg) center"
        ></div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h2>Explore the world with comfortable car</h2>
              <div className="spacer-20"></div>
            </div>
            <div className="col-md-3">
              <i className="fa fa-trophy de-icon mb20"></i>
              <h4>First Class Services</h4>
              <p>
                Where luxury meets exceptional care, creating unforgettable
                moments and exceeding your every expectation.
              </p>
            </div>
            <div className="col-md-3">
              <i className="fa fa-road de-icon mb20"></i>
              <h4>24/7 road assistance</h4>
              <p>
                Reliable support when you need it most, keeping you on the move
                with confidence and peace of mind.
              </p>
            </div>
            <div className="col-md-3">
              <i className="fa fa-map-pin de-icon mb20"></i>
              <h4>Free Pick-Up & Drop-Off</h4>
              <p>
                Enjoy free pickup and drop-off services, adding an extra layer
                of ease to your car rental experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="section-testimonials" className="no-top no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="de-image-text">
                <div className="d-text">
                  <div className="d-quote id-color">
                    <i className="fa fa-quote-right"></i>
                  </div>
                  <h4>Excellent Service! Car Rent Service!</h4>
                  <blockquote>
                    I have been using Rentaly for my Car Rental needs for over 5
                    years now. I have never had any problems with their service.
                    Their customer support is always responsive and helpful. I
                    would recommend Rentaly to anyone looking for a reliable Car
                    Rental provider.
                    <span className="by">Stepanie Hutchkiss</span>
                  </blockquote>
                </div>
                <img
                  src="images/testimonial/1.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="de-image-text">
                <div className="d-text">
                  <div className="d-quote id-color">
                    <i className="fa fa-quote-right"></i>
                  </div>
                  <h4>Excellent Service! Car Rent Service!</h4>
                  <blockquote>
                    We have been using Rentaly for our trips needs for several
                    years now and have always been happy with their service.
                    Their customer support is Excellent Service! and they are
                    always available to help with any issues we have. Their
                    prices are also very competitive.
                    <span className="by">Jovan Reels</span>
                  </blockquote>
                </div>
                <img
                  src="images/testimonial/2.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="de-image-text">
                <div className="d-text">
                  <div className="d-quote id-color">
                    <i className="fa fa-quote-right"></i>
                  </div>
                  <h4>Excellent Service! Car Rent Service!</h4>
                  <blockquote>
                    Endorsed by industry experts, Rentaly is the Car Rental
                    solution you can trust. With years of experience in the
                    field, we provide fast, reliable and secure Car Rental
                    services.
                    <span className="by">Kanesha Keyton</span>
                  </blockquote>
                </div>
                <img
                  src="images/testimonial/3.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-fun-facts" className="bg-color text-light">
        <div className="container">
          <div className="row g-custom-x force-text-center">
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp">
                <h3 className="timer" data-to="15425" data-speed="3000">
                  0
                </h3>
                Trips Powered
                <p className="d-small">
                  Lorem ipsum adipisicing officia in adipisicing do velit sit
                  tempor ea consectetur.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp">
                <h3 className="timer" data-to="8745" data-speed="3000">
                  0
                </h3>
                Happy Customers
                <p className="d-small">
                  Lorem ipsum adipisicing officia in adipisicing do velit sit
                  tempor ea consectetur.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp">
                <h3 className="timer" data-to="235" data-speed="3000">
                  0
                </h3>
                Fleets Vehicle
                <p className="d-small">
                  Lorem ipsum adipisicing officia in adipisicing do velit sit
                  tempor ea consectetur.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp">
                <h3 className="timer" data-to="15" data-speed="3000">
                  0
                </h3>
                Years Experience
                <p className="d-small">
                  Lorem ipsum adipisicing officia in adipisicing do velit sit
                  tempor ea consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CarBody />
    </div>
  );
}

export default Home;
