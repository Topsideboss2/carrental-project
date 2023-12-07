import { useState } from 'react';
import { requests } from '../../../utils/api';
import Swal from 'sweetalert2'
import { getUser } from '../../../utils/useToken';

export function Verify() {
  const user = getUser();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const reloadPage = (page: string) => {
    window.location.href = page;
  };

  const handleVerify = async() => {
    setLoading(true);
    await requests.post('users/verify', { code, userId: user.id }).then((response) => {
        setLoading(false);
        reloadPage('/user/dashboard')
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: error as string,
        })
      });
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
                  <h4>Verify</h4>
                  <div className="spacer-10"></div>
                  <form id="form_register" className="form-border">
                    <div className="field-set">
                      <input
                        type="text"
                        name="email"
                        id="name"
                        className="form-control"
                        placeholder="Code"
                        onChange={(event) => setCode(event.target.value)}
                        value={code}
                      />
                    </div>

                    {loading ? (
                      <div id="submit">Loading...</div>
                    ) : (
                      <div id="submit">
                        <input
                          type="submit"
                          id="send_message"
                          value="Verify Email"
                          className="btn-main btn-fullwidth rounded-3"
                          onClick={() => handleVerify()}
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Verify
