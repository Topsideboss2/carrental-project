import { useEffect, useState } from 'react';
import { SideBar } from '../../../shared/sidebar';
import SubHeader from '../../../shared/subheader';
import { getToken, getUser } from '../../../utils/useToken';
import { requests } from '../../../utils/api';
import Table from './table';
import { Reservation } from '@carrental/constants';

export function Order() {
  const user = getUser();
  const token = getToken();

  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchUserReservations = async () => {
    await requests
      .get<any>(`reservations/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setReservations(response);
      })
      .catch((error) => {
        console.log('user dashboard error =>', error as string);
      });
  };
  useEffect(() => {
    fetchUserReservations();
  }, []);
  return (
    <div className="no-bottom no-top zebra" id="content">
      <SubHeader title="Reservation History" />
      <section id="section-settings" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <SideBar />
            </div>

            <div className="col-lg-9">
              <div className="tab-default">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-pending-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-pending"
                      type="button"
                      role="tab"
                      aria-controls="nav-pending"
                      aria-selected="true"
                    >
                      Pending
                    </button>
                    <button
                      className="nav-link"
                      id="nav-approved-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-approved"
                      type="button"
                      role="tab"
                      aria-controls="nav-approved"
                      aria-selected="false"
                    >
                      Approved
                    </button>
                    <button
                      className="nav-link"
                      id="nav-completed-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-completed"
                      type="button"
                      role="tab"
                      aria-controls="nav-completed"
                      aria-selected="false"
                    >
                      Completed
                    </button>
                    <button
                      className="nav-link"
                      id="nav-rejected-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-rejected"
                      type="button"
                      role="tab"
                      aria-controls="nav-rejected"
                      aria-selected="false"
                    >
                      Rejected
                    </button>
                  </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-pending"
                    role="tabpanel"
                    aria-labelledby="nav-pending-tab"
                  >
                    <div className="card p-4 rounded-5 mb25">
                      <h4>Pending Reservations</h4>

                      <Table
                        reservations={reservations.filter(
                          (item) => item.status === 'PENDING'
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-approved"
                    role="tabpanel"
                    aria-labelledby="nav-approved-tab"
                  >
                    <div className="card p-4 rounded-5 mb25">
                      <h4>Approved Reservations</h4>

                      <Table
                        reservations={reservations.filter((item) => {
                          return (
                            item.status === 'APPROVED' ||
                            item.status === 'DELIVERING' ||
                            item.status === 'PAID'
                          );
                        })}
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-completed"
                    role="tabpanel"
                    aria-labelledby="nav-completed-tab"
                  >
                    <div className="card p-4 rounded-5 mb25">
                      <h4>Completed Reservations</h4>

                      <Table
                        reservations={reservations.filter(
                          (item) =>
                            item.status === 'COMPLETED' ||
                            item.status === 'RETURNED'
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-rejected"
                    role="tabpanel"
                    aria-labelledby="nav-rejected-tab"
                  >
                    <div className="card p-4 rounded-5 mb25">
                      <h4>Rejected Reservations</h4>

                      <Table
                        reservations={reservations.filter(
                          (item) => item.status === 'REJECTED'
                        )}
                      />
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

export default Order;
