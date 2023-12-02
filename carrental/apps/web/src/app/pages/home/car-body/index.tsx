import { CarBodyType } from '@carrental/constants';
import React, { useEffect, useState } from 'react';
import { requests } from '../../../utils/api';

function CarBody() {
  const [carBodies, setCarBodies] = useState<CarBodyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCars = async () => {
    setLoading(true);
    await requests
      .get<any>(`car-bodies/all`, {})
      .then((response) => {
        setLoading(false);
        setCarBodies(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log('car bodies list error =>', error as string);
      });
  };

  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <section
      aria-label="section"
      className="pt40 pb40 text-light"
      data-bgcolor="#181818"
    >
      <div className="wow fadeInRight d-flex">
        <div className="de-marquee-list">
          <div className="d-item">
            {!loading &&
              carBodies.map((carBody: CarBodyType, index: number) => (
                <React.Fragment key={index}>
                  <span className="d-item-txt">{carBody.name}</span>
                  <span className="d-item-display">
                    <i className="d-item-dot"></i>
                  </span>
                </React.Fragment>
              ))}
          </div>
          <div className="d-item">
            {!loading &&
              carBodies.map((carBody: CarBodyType, index: number) => (
                <React.Fragment key={index}>
                  <span className="d-item-txt">{carBody.name}</span>
                  <span className="d-item-display">
                    <i className="d-item-dot"></i>
                  </span>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarBody;
