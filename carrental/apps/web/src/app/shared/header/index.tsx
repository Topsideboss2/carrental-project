import { useLocation } from 'react-router-dom';
import { getUser, removeUserSession } from '../../utils/useToken';

export function Header() {
  const location = useLocation();

  const user = getUser();

  const reloadPage = (page: string) => {
    window.location.href = page;
  };

  const isActive = (path: string) =>
    location.pathname === path ? 'active' : '';
  return (
    <header className={`transparent ${location.pathname === '/' ? 'header-light': ''} scroll-dark has-topbar`}>
      <div id="topbar" className="topbar-dark text-light">
        <div className="container">
          <div className="topbar-left xs-hide">
            <div className="topbar-widget">
              <div className="topbar-widget">
                <a href="index.html#">
                  <i className="fa fa-phone"></i>+208 333 9296
                </a>
              </div>
              <div className="topbar-widget">
                <a href="index.html#">
                  <i className="fa fa-envelope"></i>contact@rentaly.com
                </a>
              </div>
              <div className="topbar-widget">
                <a href="index.html#">
                  <i className="fa fa-clock-o"></i>Mon - Fri 08.00 - 18.00
                </a>
              </div>
            </div>
          </div>

          <div className="topbar-right">
            <div className="social-icons">
              <a href="index.html#">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="index.html#">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="index.html#">
                <i className="fa fa-youtube fa-lg"></i>
              </a>
              <a href="index.html#">
                <i className="fa fa-pinterest fa-lg"></i>
              </a>
              <a href="index.html#">
                <i className="fa fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  {/* <!-- logo begin --> */}
                  <div id="logo">
                    <a onClick={() => reloadPage('/')} style={{
                      cursor: 'pointer'
                    }}>
                      <img
                        className="logo-1"
                        src="images/logo-light.png"
                        alt=""
                      />
                      <img className="logo-2" src="images/logo.png" alt="" />
                    </a>
                  </div>
                  {/* <!-- logo close --> */}
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                <ul id="mainmenu">
                  <li className={isActive('/')}>
                    <button
                      className="menu-item"
                      onClick={() => reloadPage('/')}
                      style={{ cursor: 'pointer' }}
                    >
                      Home
                    </button>
                  </li>
                  <li className={isActive('/cars')}>
                    <button
                      className="menu-item"
                      onClick={() => reloadPage('/cars')}
                      style={{ cursor: 'pointer' }}
                    >
                      Cars
                    </button>
                  </li>
                  {/* <li className={isActive('/booking')}>
                    <button
                      className="menu-item"
                      onClick={() => reloadPage('/booking')}
                      style={{ cursor: 'pointer' }}
                    >
                      Booking
                    </button>
                  </li> */}
                  <li className={isActive('/about')}>
                    <button
                      className="menu-item"
                      onClick={() => reloadPage('/about')}
                      style={{ cursor: 'pointer' }}
                    >
                      About Us
                    </button>
                  </li>
                  <li className={isActive('/contact')}>
                    <button
                      className="menu-item"
                      onClick={() => reloadPage('/contact')}
                      style={{ cursor: 'pointer' }}
                    >
                      Contact Us
                    </button>
                  </li>
                  {user && (
                    <li>
                      <button
                        className="menu-item"
                        onClick={() => reloadPage('/user/dashboard')}
                      >
                        My Account
                      </button>
                      <ul>
                        <li>
                          <button
                            className="menu-item"
                            onClick={() => reloadPage('/user/dashboard')}
                          >
                            Dashboard
                          </button>
                        </li>
                        <li>
                          <button
                            className="menu-item"
                            onClick={() => reloadPage('/user/orders')}
                          >
                            My Reservations
                          </button>
                        </li>
                        <li>
                          <button
                            className="menu-item"
                            onClick={() => reloadPage('/user/invoices')}
                          >
                            My Invoices
                          </button>
                        </li>
                        <li>
                          <button
                            className="menu-item"
                            onClick={() => reloadPage('/user/profile')}
                          >
                            My Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="menu-item"
                            onClick={() => {
                              removeUserSession()
                              reloadPage('/')
                              }}
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
              {!user && (
                <div className="de-flex-col">
                  <div className="menu_side_area">
                    <button
                      className="btn-main"
                      onClick={() => reloadPage('/signin')}
                      style={{ cursor: 'pointer' }}
                    >
                      Sign In
                    </button>
                    <span id="menu-btn"></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
