export function SubHeader({ title = "" }) {
  return (
    <>
      <div id="top"></div>
      <section id="subheader" className="jarallax text-light">
        <img
          src="images/background/subheader.jpg"
          className="jarallax-img"
          alt=""
        />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>{title}</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SubHeader;
