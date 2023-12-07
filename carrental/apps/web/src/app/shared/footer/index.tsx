export function Footer() {
  return (
    <footer className="text-light">
      <div className="container">
        <div className="row g-custom-x">
          <div className="col-lg-3">
            <div className="widget">
              <h5>About Rentaly</h5>
              <p>
                Where quality meets affordability. We understand the importance
                of a smooth and enjoyable journey without the burden of
                excessive costs. That's why we have meticulously crafted our
                offerings to provide you with top-notch vehicles at minimum
                expense.
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="widget">
              <h5>Contact Info</h5>
              <address className="s1">
                <span>
                  <i className="id-color fa fa-map-marker fa-lg"></i>08 W 36th
                  St, New York, NY 10001
                </span>
                <span>
                  <i className="id-color fa fa-phone fa-lg"></i>+1 333 9296
                </span>
                <span>
                  <i className="id-color fa fa-envelope-o fa-lg"></i>
                  <a href="mailto:contact@example.com">contact@example.com</a>
                </span>
                <span>
                  <i className="id-color fa fa-file-pdf-o fa-lg"></i>
                  <a href="index.html#">Download Brochure</a>
                </span>
              </address>
            </div>
          </div>

          <div className="col-lg-3">
            <h5>Quick Links</h5>
            <div className="row">
              <div className="col-lg-6">
                <div className="widget">
                  <ul>
                    <li>
                      <a href="index.html#">About</a>
                    </li>
                    <li>
                      <a href="index.html#">Blog</a>
                    </li>
                    <li>
                      <a href="index.html#">Careers</a>
                    </li>
                    <li>
                      <a href="index.html#">News</a>
                    </li>
                    <li>
                      <a href="index.html#">Partners</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="widget">
              <h5>Social Network</h5>
              <div className="social-icons">
                <a href="index.html#">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="index.html#">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="index.html#">
                  <i className="fa fa-linkedin fa-lg"></i>
                </a>
                <a href="index.html#">
                  <i className="fa fa-pinterest fa-lg"></i>
                </a>
                <a href="index.html#">
                  <i className="fa fa-rss fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex">
                <div className="de-flex-col">
                  <a href="index.html">
                    Copyright 2023 - Rentaly by Designesia
                  </a>
                </div>
                <ul className="menu-simple">
                  <li>
                    <a href="index.html#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="index.html#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
