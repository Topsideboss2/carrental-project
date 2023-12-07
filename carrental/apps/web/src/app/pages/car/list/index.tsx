import { Car, CarBodyType } from '@carrental/constants';
import SubHeader from '../../../shared/subheader';
import { useEffect, useState } from 'react';
import { requests } from '../../../utils/api';
import Filter from './filter';
import { CarContext } from './context';
import Cars from './cars';
import NoData from '../../../../assets/animations/no-data.gif';
import DataFetching from '../../../../assets/animations/loading.gif';
import './index.module.css';

const vTypes = [
  {
    id: 1,
    name: 'Car',
    value: 'CAR',
  },
  {
    id: 2,
    name: 'Van',
    value: 'VAN',
  },
  {
    id: 3,
    name: 'Minibus',
    value: 'MINIBUS',
  },
  {
    id: 4,
    name: 'Prestige',
    value: 'PRESTIGE',
  },
];

const cEngines = [
  {
    id: 1,
    value: '1000 - 2000',
  },
  {
    id: 2,
    value: '2000 - 4000',
  },
  {
    id: 3,
    value: '4000 - 6000',
  },
  {
    id: 4,
    value: '6000 - 8000',
  },
];

const cSeats = [
  {
    id: 1,
    value: '2',
  },
  {
    id: 2,
    value: '4',
  },
  {
    id: 3,
    value: '6',
  },
  {
    id: 4,
    value: '6+',
  },
];

export function CarList() {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [carBodyTypes, setCarBodyTypes] = useState<CarBodyType[]>([]);
  const [selectedCarBodyTypes, setSelectedCarBodyTypes] = useState<number[]>(
    []
  );
  const [vehicleTypes] = useState(vTypes);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<number[]>(
    []
  );
  const [carEngines] = useState(cEngines);
  const [selectedCarEngines, setSelectedCarEngines] = useState<number[]>([]);
  const [carSeats] = useState(cSeats);
  const [selectedCarSeats, setSelectedCarSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCars = async () => {
    setLoading(true);
    await requests
      .get<any>(`cars/all`, {})
      .then((response: any) => {
        setLoading(false);
        setCars(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log('cars list error =>', error as string);
      });
  };

  const fetchCarBodyTypes = async () => {
    setLoading(true);
    await requests
      .get<any>(`car-bodies/all`, {})
      .then((response: any) => {
        setLoading(false);
        setCarBodyTypes(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log('cars list error =>', error as string);
      });
  };
  useEffect(() => {
    fetchCarBodyTypes();
    fetchCars();
  }, []);

  useEffect(() => {
    const filteredCars = cars.filter((car) => {
      // Map selected vehicle type IDs to values
      const selectedVehicleTypesValues = selectedVehicleTypes.map((id) => {
        return vehicleTypes.find((type) => type.id === id)?.value;
      });

      // Map selected seats IDs to values
      const selectedSeatsValues = selectedCarSeats.map((id) => {
        return carSeats.find((seat) => seat.id === id)?.value;
      });

      // Handle seats logic
      const carSeatsStr = car.seats.toString();

      // Map engine capacity to range
      const carEngineRange = carEngines.find((engine) => {
        const [engineMin, engineMax] = engine.value
          .split('-')
          .map((num) => Number(num.trim()));
        return (
          car.engineCapacity >= engineMin && car.engineCapacity <= engineMax
        );
      })?.id;

      // Check filters
      const matchesVehicleType =
        selectedVehicleTypesValues.length === 0 ||
        selectedVehicleTypesValues.includes(car.vehicleType);

      const matchesCarBodyType =
        selectedCarBodyTypes.length === 0 ||
        selectedCarBodyTypes.includes(car.carBodyTypeId);

      const matchesCarEngine =
        selectedCarEngines.length === 0 ||
        (carEngineRange !== undefined &&
          selectedCarEngines.includes(carEngineRange));

      const matchesCarSeat =
        selectedSeatsValues.length === 0 ||
        selectedSeatsValues.includes(carSeatsStr) ||
        (Number(carSeatsStr) > 6 && selectedSeatsValues.includes('6+'));

      return (
        matchesVehicleType &&
        matchesCarBodyType &&
        matchesCarEngine &&
        matchesCarSeat
      );
    });

    setFilteredCars(filteredCars);
  }, [
    selectedVehicleTypes,
    selectedCarBodyTypes,
    selectedCarEngines,
    selectedCarSeats,
    cars,
    carEngines,
    vehicleTypes,
    carSeats,
  ]);
  return (
    <CarContext.Provider
      value={{
        filteredCars,
        setFilteredCars,
        cars,
        setCars,
        carBodyTypes,
        selectedCarBodyTypes,
        setSelectedCarBodyTypes,
        vehicleTypes,
        selectedVehicleTypes,
        setSelectedVehicleTypes,
        carEngines,
        selectedCarEngines,
        setSelectedCarEngines,
        carSeats,
        selectedCarSeats,
        setSelectedCarSeats,
      }}
    >
      <div className="no-bottom no-top zebra" id="content">
        <SubHeader title="Cars" />
        {loading ? (
          <div
            className="loading-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img src={DataFetching} alt="loading" />
            <h6 className="loading-text">Fetching cars...</h6>
          </div>
        ) : cars.length === 0 ? (
          <div
            className="loading-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img src={NoData} alt="loading" height={400} width={300} />
            <h6 className="loading-text">
              No cars have been added into the system yet
            </h6>
          </div>
        ) : (
          <section id="section-cars">
            <div className="container">
              <div className="row">
                <Filter />
                <div className="col-lg-9">{!loading && <Cars />}</div>
              </div>
            </div>
          </section>
        )}
      </div>
    </CarContext.Provider>
  );
}

export default CarList;
