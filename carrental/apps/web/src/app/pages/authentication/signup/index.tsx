import { useState } from 'react';
import SubHeader from '../../../shared/subheader';
import { requests } from '../../../utils/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../../../utils/useToken';

export function SignUp() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pwd, setPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);

  async function getMachineId() {
    let machineId = localStorage.getItem('MachineId');

    if (!machineId) {
      machineId = crypto.randomUUID();
      localStorage.setItem('MachineId', machineId);
    }
    return machineId;
  }

  const handleSignUp = async () => {
    setLoading(true);
    await requests
      .post('users/create', { email, password, deviceId: await getMachineId(), gender, phoneNumber, firstName, lastName, pwd })
      .then((response: any) => {
        setLoading(false);
        setUserSession(response.access_token, response.user)
        Swal.fire({
          title: 'Success',
          text: "Successfully created the account",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/email/verify')
          }
        })
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: error as string,
        });
      });
  };
  return (
    <div className="no-bottom no-top" id="content">
      <SubHeader title="Register" />
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3>Don't have an account? Register now.</h3>
              <p>
                Welcome to Rentaly. We're excited to have you on board. By
                creating an account with us, you'll gain access to a range of
                benefits and convenient features that will enhance your car
                rental experience.
              </p>

              <div className="spacer-10"></div>

              <form
                name="contactForm"
                id="contact_form"
                className="form-border"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>First Name:</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Email Address:</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        value={phoneNumber}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Gender:</label>
                      <select
                        className="form-control"
                        onChange={(event) => setGender(event.target.value)}
                        required
                      >
                        <option>Select your gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Person with disability:</label>
                      <select
                        className="form-control"
                        onChange={(event) =>
                          setPwd(event.target.value === 'true')
                        }
                        value={pwd === null ? 'default' : pwd.toString()}
                      >
                        <option value="default">
                          Are you a person with disability?
                        </option>
                        <option value="false">False</option>
                        <option value="true">True</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Password:</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Re-enter Password:</label>
                      <input
                        type="password"
                        name="re-password"
                        id="re-password"
                        className="form-control"
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        value={confirmPassword}
                      />
                      {password !== confirmPassword && (
                        <div className="error-message">
                          Passwords do not match
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    {loading ? (
                      <div id="submit">Loading...</div>
                    ) : (
                      <div id="submit">
                        <input
                          type="submit"
                          id="send_message"
                          value="Sign In"
                          className="btn-main btn-fullwidth rounded-3"
                          onClick={() => handleSignUp()}
                        />
                      </div>
                    )}
                    <div className="clearfix"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
