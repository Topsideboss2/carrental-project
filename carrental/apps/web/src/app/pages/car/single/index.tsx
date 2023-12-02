import { useEffect, useState } from 'react';
import SubHeader from '../../../shared/subheader';
import { Car, CarAmenity, CarBodyType, CarMake, CarMedia } from '@carrental/constants';
import { requests } from '../../../utils/api';
import Reserve from './reserve';
import { useParams } from 'react-router-dom';
import DataFetching from '../../../../assets/animations/loading.gif'

export function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<Car>({} as Car);
  const [carBody, setCarBody] = useState<CarBodyType>({} as CarBodyType);
  const [carAmenities, setCarAmenities] = useState<CarAmenity[]>([]);
  const [carMake, setCarMake] = useState<CarMake>({} as CarMake);
  const [carMedias, setCarMedias] = useState<CarMedia[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCar = async () => {
    setLoading(true);
    await requests
      .get<any>(`cars/show/${id}`, {})
      .then((response: any) => {
        setLoading(false);
        setCar(response);
        setCarMake(response.carMake);
        setCarBody(response.carBodyType);
        setCarAmenities(response.carAmenities);
        setCarMedias(response.carMedias);
      })
      .catch((error) => {
        setLoading(false);
        console.log('cars list error =>', error as string);
      });
  };

  useEffect(() => {
    fetchCar();
  }, []);

  return (
    <div className="no-bottom no-top zebra" id="content">
      <SubHeader title="Car Details" />
      { loading && (
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* add a gif */}
        <img src={DataFetching} alt="loading" />
        <h6
          style={{
            textAlign: 'center',
          }}
        >
          Fetching car details...
        </h6>
      </div>
      )}
      {!loading && car && (
        <section id="section-car-details">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <div id="slider-carousel" className="owl-carousel">
                  {
                    carMedias.map((media: CarMedia, index: number) => (
                      <div className="item" key={index}>
                    <img src={media.mediaUrl} alt="" />
                  </div>
                    ))
                  }
                </div>
              </div>

              <div className="col-lg-3">
                <h3>{`${carMake?.name} ${car.model} ${car.year}`}</h3>

                <div className="spacer-10"></div>

                <h4>Specifications</h4>
                <div className="de-spec">
                  <div className="d-row">
                    <span className="d-title">Body</span>
                    <span className="d-value">{carBody?.name}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Seat</span>
                    <span className="d-value">{`${car.seats} seats`}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Luggage</span>
                    <span className="d-value">{`${car.luggage} Kgs`}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Fuel Type</span>
                    <span className="d-value">{car.fuelType}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Engine</span>
                    <span className="d-value">{`${car.engineCapacity} cc`}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Year</span>
                    <span className="d-value">{car.year}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Transmission</span>
                    <span className="d-value">{car.transmission}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Drive</span>
                    <span className="d-value">{car.drive}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Exterior Color</span>
                    <span className="d-value">{car.exteriorColor}</span>
                  </div>
                  <div className="d-row">
                    <span className="d-title">Interior Color</span>
                    <span className="d-value">{car.interiorColor}</span>
                  </div>
                </div>

                <div className="spacer-single"></div>

                {carAmenities.length > 0 && (
                  <>
                    <h4>Features</h4>
                    <ul className="ul-style-2">
                      {carAmenities.map((amenity: CarAmenity, index: number) => (
                        <li key={index}>{amenity?.amenity?.name}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="col-lg-3">
                <div className="de-price text-center">
                  Daily rate
                  <h3>{`Ksh ${car.dailyRate}`}</h3>
                </div>
                <div className="spacer-30"></div>

                <Reserve carMake={carMake} car={car}/>

                <div className="de-box">
                  <h4>Share</h4>
                  <div className="de-color-icons">
                    <span>
                      <i className="fa fa-twitter fa-lg"></i>
                    </span>
                    <span>
                      <i className="fa fa-facebook fa-lg"></i>
                    </span>
                    <span>
                      <i className="fa fa-reddit fa-lg"></i>
                    </span>
                    <span>
                      <i className="fa fa-linkedin fa-lg"></i>
                    </span>
                    <span>
                      <i className="fa fa-pinterest fa-lg"></i>
                    </span>
                    <span>
                      <i className="fa fa-stumbleupon fa-lg"></i>
                    </span>
                    <span>
                      <i className="fa fa-delicious fa-lg"></i>
                    </span>
                    <span>
                      <i className="fa fa-envelope fa-lg"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default CarDetails;
