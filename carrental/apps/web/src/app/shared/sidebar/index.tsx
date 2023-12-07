import { useLocation } from 'react-router-dom';
import { getUser, removeUserSession } from '../../utils/useToken';

export function SideBar() {
  const location = useLocation();
  const user = getUser();

  const reloadPage = (page: string) => {
    window.location.href = page;
  };

  const isActive = (path: string) =>
    location.pathname === path ? 'active' : '';
  return (
    <div className="card p-4 rounded-5">
      <div className="profile_avatar">
        <div className="profile_img">
          <img src="images/profile/1.jpg" alt="" />
        </div>
        <div className="profile_name">
          <h4>
            {`${user.firstName} ${user.lastName}`}
            <span className="profile_username text-gray">{user.email}</span>
          </h4>
        </div>
      </div>
      <div className="spacer-20"></div>
      <ul className="menu-col">
        <li>
          <button
            className={isActive('/user/dashboard')}
            onClick={() => reloadPage('/user/dashboard')}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-home"></i>Dashboard
          </button>
        </li>
        <li>
          <button
            className={isActive('/user/invoices')}
            onClick={() => reloadPage('/user/invoices')}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-file"></i>My Invoices
          </button>
        </li>
        <li>
          <button
            className={isActive('/user/orders')}
            onClick={() => reloadPage('/user/orders')}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-calendar"></i>My Reservations
          </button>
        </li>
        <li>
          <button
            className={isActive('/user/profile')}
            onClick={() => reloadPage('/user/profile')}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-user"></i>My Profile
          </button>
        </li>
        <li>
          <button onClick={() => {
            removeUserSession()
            reloadPage('/')
            }}>
            <i className="fa fa-sign-out"></i>Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
