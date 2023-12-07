import { useContext } from 'react';
import { CarContext } from './context';


function Cars() {
  const carContext = useContext(CarContext);
  const { cars, filteredCars } = carContext ?? {
    cars: [],
    filteredCars: [],
  };

  const carsToDisplay = filteredCars ?? cars;

  const reloadPage = (page: string) => {
    window.location.href = page;
  };
  return (
    <div className="row">
      {carsToDisplay.map((car, index) => (
        <div className="col-lg-12" key={index}>
          <div className="de-item-list mb30">
            <div className="d-img">
              <img
                src={car?.carMedias[0]?.mediaUrl}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="d-info">
              <div className="d-text">
                <h4>{`${car?.carMake?.name} ${car.model}`}</h4>
                <div className="d-atr-group">
                  <ul className="d-atr">
                    <li>
                      <span>Seats:</span>
                      {car.seats}
                    </li>
                    <li>
                      <span>Luggage:</span>
                      {`${car.luggage} Kgs`}
                    </li>
                    <li>
                      <span>Fuel:</span>
                      {car.fuelType}
                    </li>
                    <li>
                      <span>Engine:</span>
                      {car.engineCapacity}
                    </li>
                    <li>
                      <span>Drive:</span>
                      {car.drive}
                    </li>
                    <li>
                      <span>Type:</span>
                      {car?.carBodyType?.name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-price">
              Daily rate from <span>{`Ksh ${car.dailyRate}`}</span>
              <button
                className="btn-main"
                onClick={() => reloadPage(`cars/${car.id}`)}
              >
                Rent Now
              </button>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cars;
