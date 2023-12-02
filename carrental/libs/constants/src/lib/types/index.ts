export type CarMake = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CarBodyType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Amenity = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CarAmenity = {
  id: number;
  carId: number;
  amenityId: number;
  value: string;
  amenity: Amenity;
};

export type CarMedia = {
  id: number;
  carId: number;
  mediaType: string;
  mediaUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Car = {
  id: number;
  carMakeId: number;
  vehicleType: string;
  transmission: string;
  fuelType: string;
  carBodyTypeId: number;
  seats: number;
  engineCapacity: number;
  model: string;
  year: number;
  dailyRate: number;
  stock: number;
  luggage: number;
  drive: string;
  exteriorColor: string;
  interiorColor: string;
  pickUpLocation: string | null;
  pickUpLatitude: string | null;
  pickUpLongitude: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  carMake: CarMake;
  carBodyType: CarBodyType;
  carMedias: CarMedia[];
  carAmenities: CarAmenity[];
};

export type VehicleType = {
  id: number;
  value: string;
};

export type CarEngine = {
  id: number;
  value: string;
};

export type CarSeat = {
  id: number;
  value: string;
};

export type Location = {
  location: string;
  longitude: string;
  latitude: string;
};

export type Reservation = {
  id: number;
  userId: string;
  carId: number;
  startDate: string;
  endDate: string;
  isPickUp: boolean;
  pickUpLocation: string;
  pickUpLongitude: string;
  pickUpLatitude: string;
  dropOffLocation: string;
  dropOffLongitude: string;
  dropOffLatitude: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  car: Car;
};

export type Invoice = {
  id: number;
  userId: string;
  reservationId: number;
  reservation: Reservation;
  amount: number;
  status: string;
};

export type UserReport = {
  totalReservations: number;
  completeReservations: number;
  pendingReservations: number;
  canceledReservations: number;
  rejectedReservations: number;
};
