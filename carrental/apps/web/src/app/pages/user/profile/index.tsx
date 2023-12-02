import { SideBar } from '../../../shared/sidebar';
import SubHeader from '../../../shared/subheader';

export function Profile() {
  return (
    <div className="no-bottom no-top zebra" id="content">
      <SubHeader title="Profile" />
      <section id="section-settings" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <SideBar />
            </div>

            <div className="col-lg-9">
              <div className="card p-4  rounded-5">
                <div className="row">
                  <div className="col-lg-12">
                    <form
                      id="form-create-item"
                      className="form-border"
                      method="post"
                      action="https://www.madebydesignesia.com/themes/rentaly/email.php"
                    >
                      <div className="de_tab tab_simple">
                        <ul className="de_nav">
                          <li className="active">
                            <span>Profile</span>
                          </li>
                          <li>
                            <span>Notifications</span>
                          </li>
                        </ul>

                        <div className="de_tab_content">
                          <div className="tab-1">
                            <div className="row">
                              <div className="col-lg-6 mb20">
                                <h5>Username</h5>
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  className="form-control"
                                  placeholder="Enter username"
                                />
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>Email Address</h5>
                                <input
                                  type="text"
                                  name="email_address"
                                  id="email_address"
                                  className="form-control"
                                  placeholder="Enter email"
                                />
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>New Password</h5>
                                <input
                                  type="Password"
                                  name="user_password"
                                  id="user_password"
                                  className="form-control"
                                  placeholder="********"
                                />
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>Re-enter Password</h5>
                                <input
                                  type="Password"
                                  name="user_password_re-enter"
                                  id="user_password_re-enter"
                                  className="form-control"
                                  placeholder="********"
                                />
                              </div>
                              <div className="col-md-6 mb20">
                                <h5>Language</h5>
                                <p className="p-info">
                                  Select your prefered language.
                                </p>
                                <div
                                  id="select_lang"
                                  className="dropdown fullwidth"
                                >
                                  <a
                                    href="account-profile.html#"
                                    className="btn-selector"
                                  >
                                    English
                                  </a>
                                  <ul>
                                    <li className="active">
                                      <span>English</span>
                                    </li>
                                    <li>
                                      <span>France</span>
                                    </li>
                                    <li>
                                      <span>German</span>
                                    </li>
                                    <li>
                                      <span>Japan</span>
                                    </li>
                                    <li>
                                      <span>Italy</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-md-6 mb20">
                                <h5>Hour Format</h5>
                                <p className="p-info">
                                  Select your prefered language.
                                </p>
                                <div
                                  id="select_hour_format"
                                  className="dropdown fullwidth"
                                >
                                  <a
                                    href="account-profile.html#"
                                    className="btn-selector"
                                  >
                                    24-hour
                                  </a>
                                  <ul>
                                    <li className="active">
                                      <span>24-hour</span>
                                    </li>
                                    <li>
                                      <span>12-hour</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-2">
                            <div className="row">
                              <div className="col-md-6 mb-sm-20">
                                <div className="switch-with-title s2">
                                  <h5>Discount Notifications</h5>
                                  <div className="de-switch">
                                    <input
                                      type="checkbox"
                                      id="notif-item-sold"
                                      className="checkbox"
                                    />
                                    <label htmlFor="notif-item-sold"></label>
                                  </div>
                                  <div className="clearfix"></div>
                                  <p className="p-info">
                                    You'll get notification while new discount
                                    available.
                                  </p>
                                </div>

                                <div className="spacer-20"></div>

                                <div className="switch-with-title s2">
                                  <h5>New Product Notification</h5>
                                  <div className="de-switch">
                                    <input
                                      type="checkbox"
                                      id="notif-bid-activity"
                                      className="checkbox"
                                    />
                                    <label htmlFor="notif-bid-activity"></label>
                                  </div>
                                  <div className="clearfix"></div>
                                  <p className="p-info">
                                    You'll get notification while new product
                                    available.
                                  </p>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="switch-with-title s2">
                                  <h5>Daily Reports</h5>
                                  <div className="de-switch">
                                    <input
                                      type="checkbox"
                                      id="notif-auction-expiration"
                                      className="checkbox"
                                    />
                                    <label htmlFor="notif-auction-expiration"></label>
                                  </div>
                                  <div className="clearfix"></div>
                                  <p className="p-info">
                                    We will send you a report everyday.
                                  </p>
                                </div>

                                <div className="spacer-20"></div>

                                <div className="switch-with-title s2">
                                  <h5>Monthly Reports</h5>
                                  <div className="de-switch">
                                    <input
                                      type="checkbox"
                                      id="notif-outbid"
                                      className="checkbox"
                                    />
                                    <label htmlFor="notif-outbid"></label>
                                  </div>
                                  <div className="clearfix"></div>
                                  <p className="p-info">
                                    We will send you a report each month.
                                  </p>
                                </div>
                              </div>

                              <div className="spacer-20"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <input
                        type="button"
                        id="submit"
                        className="btn-main"
                        value="Update profile"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
