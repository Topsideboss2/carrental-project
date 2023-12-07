import { useState } from 'react';
import { requests } from '../../../utils/api';
import Swal from 'sweetalert2'
import { setUserSession } from '../../../utils/useToken';
import { useNavigate } from 'react-router-dom';

async function getMachineId() {
  let machineId = localStorage.getItem('MachineId');

  if (!machineId) {
    machineId = crypto.randomUUID();
    localStorage.setItem('MachineId', machineId);
  }
  return machineId;
}

const reloadPage = (page: string) => {
  window.location.href = page;
};

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await requests
      .post('auth/login', { email, password, deviceId: await getMachineId() })
      .then((response: any) => {
        setLoading(false);
        setUserSession(response.access_token, response.user)
        Swal.fire({
          title: 'Success',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.isConfirmed) {
            reloadPage('/user/dashboard')
          }
        })
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: error.response.data.message
        })
      });

      const reloadPage = (page: string) => {
        window.location.href = page;
      };
  };
  return (
    <div className="no-bottom no-top" id="content">
      <section id="section-hero" aria-label="section" className="jarallax">
        <img src="images/background/2.jpg" className="jarallax-img" alt="" />
        <div className="v-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 offset-lg-4">
                <div
                  className="padding40 rounded-3 shadow-soft"
                  data-bgcolor="#ffffff"
                >
                  <h4>Login</h4>
                  <div className="spacer-10"></div>
                  <form id="form_register" className="form-border">
                    <div className="field-set">
                      <input
                        type="text"
                        name="email"
                        id="name"
                        className="form-control"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="field-set">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                      />
                    </div>

                    {loading ? (
                      <div id="submit">Loading...</div>
                    ) : (
                      <div id="submit">
                        <input
                          type="submit"
                          id="send_message"
                          value="Sign In"
                          className="btn-main btn-fullwidth rounded-3"
                          onClick={() => handleSignIn()}
                        />
                      </div>
                    )}
                  </form>
                  <div className="title-line">
                    Or&nbsp;sign&nbsp;up&nbsp;
                  </div>
                  <div className="row g-2">
                    <div className="col-lg-12 text-center">
                      <button
                        className="btn-sc btn-fullwidth mb10"
                        onClick={() => reloadPage('/signup')}
                      >
                        Create Account
                      </button>
                    </div>
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
