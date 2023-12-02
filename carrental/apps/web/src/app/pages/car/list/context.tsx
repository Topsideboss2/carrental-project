import React, { createContext } from 'react';
import { Car, CarBodyType, VehicleType, CarEngine, CarSeat } from '@carrental/constants'

interface CarContextProps {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  filteredCars: Car[];
  setFilteredCars: React.Dispatch<React.SetStateAction<Car[]>>;
  carBodyTypes: CarBodyType[];
  selectedCarBodyTypes: number[];
  setSelectedCarBodyTypes: React.Dispatch<React.SetStateAction<number[]>>;
  vehicleTypes: VehicleType[];
  selectedVehicleTypes: number[];
  setSelectedVehicleTypes: React.Dispatch<React.SetStateAction<number[]>>;
  carEngines: CarEngine[];
  selectedCarEngines: number[];
  setSelectedCarEngines: React.Dispatch<React.SetStateAction<number[]>>;
  carSeats: CarSeat[];
  selectedCarSeats: number[];
  setSelectedCarSeats: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CarContext = createContext<CarContextProps | undefined>(undefined);
