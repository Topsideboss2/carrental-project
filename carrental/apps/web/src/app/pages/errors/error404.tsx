export function Error404() {
  const reloadPage = (page: string) => {
    window.location.href = page;
  };
  return (
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="section-hero"
          className="jarallax text-light pt50 pb50 vertical-center"
          aria-label="section"
        >
          <img src="images/background/11.jpg" className="jarallax-img" alt="" />
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1>Something's missing.</h1>
                <p>
                  Looks like this page is missing. Don't worry though, our best
                  team is on the case.
                </p>
                <button onClick={() => reloadPage('/')} className="btn-main">
                  Go Back
                </button>
                <div className="spacer-10"></div>
              </div>
              <div className="col-lg-6 text-center">
                <h1 className="s2">
                  <span className="c1">404</span>
                  <span className="spacer-single"></span>
                  <span className="c3">Not Found</span>
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Error404;
