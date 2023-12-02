import React, { useContext } from 'react';
import { CarContext } from './context';

function Filter() {
  const carContext = useContext(CarContext)!;
  const {
    vehicleTypes,
    carBodyTypes,
    carEngines,
    carSeats,
    selectedVehicleTypes,
    setSelectedVehicleTypes,
    selectedCarBodyTypes,
    setSelectedCarBodyTypes,
    selectedCarEngines,
    setSelectedCarEngines,
    selectedCarSeats,
    setSelectedCarSeats,
  } = carContext
  const handleFilterChange = (filterType: string, id: number) => {
    switch (filterType) {
      case 'vehicleTypes':
        toggleFilter(selectedVehicleTypes, setSelectedVehicleTypes, id);
        break;
      case 'carBodyTypes':
        toggleFilter(selectedCarBodyTypes, setSelectedCarBodyTypes, id);
        break;
      case 'carEngines':
        toggleFilter(selectedCarEngines, setSelectedCarEngines, id);
        break;
      case 'carSeats':
        toggleFilter(selectedCarSeats, setSelectedCarSeats, id);
        break;
      default:
        break;
    }
  };

  const toggleFilter = (selectedFilters: number[], setFilters: (ids: number[]) => void, id: number) => {
    if (selectedFilters.includes(id)) {
      setFilters(selectedFilters.filter((filterId) => filterId !== id));
    } else {
      setFilters([...selectedFilters, id]);
    }
  };

  const generateFilterInputs = (filterData: any[], selectedFilters: number[], filterType: string) =>
    filterData.map((filterItem: any, index: number) => (
      <div className="de_checkbox" key={index}>
        <input
          id={`${filterType}_${filterItem.id}`}
          name={`${filterType}_${filterItem.id}`}
          type="checkbox"
          value={`${filterItem.id}`}
          checked={selectedFilters.includes(filterItem.id)}
          onChange={() => handleFilterChange(filterType, filterItem.id)}
        />
        <label htmlFor={`${filterType}_${filterItem.id}`}>
          {filterItem.name || filterItem.value}
        </label>
      </div>
    ));

  return (
    <div className="col-lg-3">
      <div className="item_filter_group">
        <h4>Vehicle Type</h4>
        <div className="de_form">{generateFilterInputs(vehicleTypes, selectedVehicleTypes, 'vehicleTypes')}</div>
      </div>

      <div className="item_filter_group">
        <h4>Car Body Type</h4>
        <div className="de_form">{generateFilterInputs(carBodyTypes, selectedCarBodyTypes, 'carBodyTypes')}</div>
      </div>

      <div className="item_filter_group">
        <h4>Car Seats</h4>
        <div className="de_form">{generateFilterInputs(carSeats, selectedCarSeats, 'carSeats')}</div>
      </div>

      <div className="item_filter_group">
        <h4>Car Engine Capacity (cc)</h4>
        <div className="de_form">{generateFilterInputs(carEngines, selectedCarEngines, 'carEngines')}</div>
      </div>
    </div>
  );
}

export default Filter;
