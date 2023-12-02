import SubHeader from '../../shared/subheader';

export function Contact() {
  return (
    <div className="no-bottom no-top" id="content">
      <SubHeader title="Contact Us"/>
      <section aria-label="section">
        <div className="container">
          <div className="row g-custom-x">
            <div className="col-lg-8 mb-sm-30">
              <h3>Do you have any question?</h3>

              <form
                name="contactForm"
                id="contact_form"
                className="form-border"
                method="post"
                action="contact.html#"
              >
                <div className="row">
                  <div className="col-md-4 mb10">
                    <div className="field-set">
                      <input
                        type="text"
                        name="Name"
                        id="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb10">
                    <div className="field-set">
                      <input
                        type="text"
                        name="Email"
                        id="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb10">
                    <div className="field-set">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        placeholder="Your Phone"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="field-set mb20">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <div
                  className="g-recaptcha"
                  data-sitekey="6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6"
                ></div>
                <div id="submit" className="mt20">
                  <input
                    type="submit"
                    id="send_message"
                    value="Send Message"
                    className="btn-main"
                  />
                </div>

                <div id="success_message" className="success">
                  Your message has been sent successfully. Refresh this page if
                  you want to send more messages.
                </div>
                <div id="error_message" className="error">
                  Sorry there was an error sending your form.
                </div>
              </form>
            </div>

            <div className="col-lg-4">
              <div className="de-box mb30">
                <h4>US Office</h4>
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
                    <a href="contact.html#">Download Brochure</a>
                  </span>
                </address>
              </div>

              <div className="de-box mb30">
                <h4>AU Office</h4>
                <address className="s1">
                  <span>
                    <i className="fa fa-map-marker fa-lg"></i>100 Mainstreet
                    Center, Sydney
                  </span>
                  <span>
                    <i className="fa fa-phone fa-lg"></i>+61 333 9296
                  </span>
                  <span>
                    <i className="fa fa-envelope-o fa-lg"></i>
                    <a href="mailto:contact@example.com">contact@example.com</a>
                  </span>
                  <span>
                    <i className="fa fa-file-pdf-o fa-lg"></i>
                    <a href="contact.html#">Download Brochure</a>
                  </span>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
