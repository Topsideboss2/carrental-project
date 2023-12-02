import { Reservation } from "@carrental/constants";

function Table({ reservations }: {reservations: Reservation[]}) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "EAT",
    };

    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
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
            <span className="text-uppercase fs-12 text-gray">Pick Up Date</span>
          </th>
          <th scope="col">
            <span className="text-uppercase fs-12 text-gray">Return Date</span>
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
                <span className="bold">{`${reservation.car.carMake.name} ${reservation.car.model}`}</span>
              </td>
              <td>
                <span className="d-lg-none d-sm-block">Pick Up Location</span>
                {reservation.pickUpLocation}
              </td>
              <td>
                <span className="d-lg-none d-sm-block">Drop Off Location</span>
                {reservation.dropOffLocation}
              </td>
              <td>
                <span className="d-lg-none d-sm-block">Pick Up Date</span>
                {formatDate(reservation.startDate)}
              </td>
              <td>
                <span className="d-lg-none d-sm-block">
                  Expected Return Date
                </span>
                {formatDate(reservation.endDate)}
              </td>
              <td>
                <div
                  className={`badge rounded-pill ${
                    reservation.status === 'PENDING'
                      ? 'bg-primary'
                      : reservation.status === 'REJECTED'
                      ? 'bg-danger'
                      : reservation.status === 'COMPLETED'
                      ? 'bg-success'
                      : 'bg-secondary'
                  }`}
                >
                  {reservation.status}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table
