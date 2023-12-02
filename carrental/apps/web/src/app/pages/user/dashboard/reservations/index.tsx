import { Reservation } from '@carrental/constants';
import { requests } from '../../../../utils/api';
import { getToken, getUser } from '../../../../utils/useToken';
import { useEffect, useState } from 'react';

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    timeZone: "EAT",
  };

  return new Date(dateString).toLocaleString("en-US", options);
};

export function Reservations() {
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
    <div className="card p-4 rounded-5 mb25">
      <h4>My Recent Orders</h4>

      <table className="table de-table">
        <thead>
          <tr>
            <th scope="col">
              <span className="text-uppercase fs-12 text-gray">Order ID</span>
            </th>
            <th scope="col">
              <span className="text-uppercase fs-12 text-gray">Car Name</span>
            </th>
            <th scope="col">
              <span className="text-uppercase fs-12 text-gray">
                Pick Up Location
              </span>
            </th>
            <th scope="col">
              <span className="text-uppercase fs-12 text-gray">
                Drop Off Location
              </span>
            </th>
            <th scope="col">
              <span className="text-uppercase fs-12 text-gray">
                Pick Up Date
              </span>
            </th>
            <th scope="col">
              <span className="text-uppercase fs-12 text-gray">
                Return Date
              </span>
            </th>
            <th scope="col">
              <span className="text-uppercase fs-12 text-gray">Status</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations &&
            reservations.map((reservation: Reservation, index: number) => (
              <tr key={index}>
                <td>
                  <span className="d-lg-none d-sm-block">Reservation ID</span>
                  <div className="badge bg-gray-100 text-dark">{`RN00${reservation.id}`}</div>
                </td>
                <td>
                  <span className="d-lg-none d-sm-block">Car Name</span>
                  <span className="bold">{reservation.car.model}</span>
                </td>
                <td>
                  <span className="d-lg-none d-sm-block">Pick Up Location</span>
                  {reservation.pickUpLocation}
                </td>
                <td>
                  <span className="d-lg-none d-sm-block">
                    Drop Off Location
                  </span>
                  {reservation.dropOffLocation}
                </td>
                <td>
                  <span className="d-lg-none d-sm-block">Pick Up Date</span>
                  {formatDate(reservation.startDate)}
                </td>
                <td>
                  <span className="d-lg-none d-sm-block">Expected Return Date</span>
                  {formatDate(reservation.endDate)}
                </td>
                <td>
                  <div className={`badge rounded-pill ${reservation.status === 'PENDING' ? 'bg-primary' : reservation.status === 'REJECTED' ? 'bg-danger': reservation.status === 'COMPLETED' ? 'bg-success' : 'bg-secondary'}`}>{reservation.status}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
