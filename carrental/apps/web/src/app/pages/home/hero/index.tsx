function Hero() {
  const reloadPage = (page: string) => {
    window.location.href = page;
  };
  return (
    <section
      id="section-hero"
      aria-label="section"
      className="full-height vertical-center"
      data-bgimage="url(images/background/7.jpg) bottom"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="spacer-double sm-hide"></div>
          <div className="col-lg-6">
            <h4>
              <span className="id-color">Plan your trip now</span>
            </h4>
            <div className="spacer-10"></div>
            <h1>Explore the world with comfortable car</h1>
            <p className="lead">
              Embark on unforgettable adventures and discover the world in
              unparalleled comfort and style with our fleet of exceptionally
              comfortable cars.
            </p>
            <button className="btn-main" onClick={() => reloadPage('/cars')}>
              Choose a Car
            </button>
            &nbsp;&nbsp;&nbsp;
            <a className="btn-main btn-black" href="#">
              Get the App
            </a>
          </div>

          <div className="col-lg-6">
            <img src="images/misc/car-2.png" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
