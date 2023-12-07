import { Car } from '@carrental/constants';
import { useEffect, useState } from 'react';
import { requests } from '../../../utils/api';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function CarFleet() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const reloadPage = (page: string) => {
    window.location.href = page;
  };

  const fetchCars = async () => {
    setLoading(true);
    await requests
      .get<any>(`cars/all`, {})
      .then((response) => {
        setLoading(false);
        setCars(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log('cars list error =>', error as string);
      });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section id="section-cars" className="no-top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 offset-lg-3 text-center">
            <h2>Our Vehicle Fleet</h2>
            <p>
              Driving your dreams to reality with an exquisite fleet of
              versatile vehicles for unforgettable journeys.
            </p>
            <div className="spacer-20"></div>
          </div>

          <div className="clearfix"></div>

          {loading ? (
            'Fetching data...'
          ) : (
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {cars.map((car: Car, index: number) => (
                <div key={index} className='owl-carousel'>
                  <SwiperSlide>
                    <div className="col-lg-12">
                      <div className="de-item mb30">
                        <div className="d-img">
                          <img
                            src={`${car?.carMedias[0]?.mediaUrl}`}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="d-info">
                          <div className="d-text">
                            <h4>{`${car.carMake.name} ${car.model}`}</h4>
                            <div className="d-atr-group">
                              <span className="d-atr">
                                <img src="images/icons/2.svg" alt="" />
                                {`${car.luggage} Kgs`}
                              </span>
                              <span className="d-atr">
                                <img src="images/icons/3.svg" alt="" />
                                {`${car.seats} seats`}
                              </span>
                              <span className="d-atr">
                                <img src="images/icons/4.svg" alt="" />
                                {car.carBodyType.name}
                              </span>
                            </div>
                            <div className="d-price">
                              Daily rate from{' '}
                              <span>{`Ksh ${car.dailyRate}`}</span>
                              <button
                                className="btn-main"
                                onClick={() => reloadPage(`/cars/${car.id}`)}
                              >
                                Rent Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}

export default CarFleet;
