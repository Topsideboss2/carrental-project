import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { getToken, getUser } from '../../../utils/useToken';
import { useParams } from 'react-router-dom';
import { requests } from '../../../utils/api';
import Swal from 'sweetalert2';
import { Car, CarMake, Location } from '@carrental/constants';
import Select from 'react-select';

const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

function Reserve({ carMake = {} as CarMake, car = {} as Car }) {
  const user = getUser();
  const token = getToken();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDelivery, setIsDelivery] = useState('no');
  const [pickUpLocation, setPickUpLocation] = useState<Location>({
    location: '',
    longitude: '',
    latitude: '',
  });
  const [dropOffLocation, setDropOffLocation] = useState<Location>({
    location: '',
    longitude: '',
    latitude: '',
  });

  const reloadPage = (page: string) => {
    window.location.href = page;
  };

  const handleLocationChange = (params: any, type: string) => {
    const { value } = params;
    if (type === 'pickUp') {
      setPickUpLocation({
        ...pickUpLocation,
        location: value.description,
      });
      geocodeByPlaceId(value.place_id)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          setPickUpLocation({
            ...pickUpLocation,
            latitude: lat.toString(),
            longitude: lng.toString(),
          })
        )
        .catch((error) => console.error(error));
    } else if (type === 'dropOff') {
      setDropOffLocation({
        ...dropOffLocation,
        location: value.description,
      });
      geocodeByPlaceId(value.place_id)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          setDropOffLocation({
            ...pickUpLocation,
            latitude: lat.toString(),
            longitude: lng.toString(),
          })
        )
        .catch((error) => console.error(error));
    }
  };
  const confirmReservation = (event: any) => {
    event.preventDefault();
    // check if user is logged in
    if (!user && !token) {
      reloadPage('/signin');
    }
    Swal.fire({
      title: 'Confirm Car Reservation',
      html: `
        Are you sure you want to reserve this ${carMake.name} ${car.model}? <br><br>
        By clicking Confirm, you agree to our <a href="/terms" target="_blank">terms and conditions</a>.
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        reserveCar();
      }
    });
  };
  const reserveCar = async () => {
    const data = {
      userId: user.id,
      carId: Number(id),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      pickUpLocation:
        isDelivery === 'yes' ? pickUpLocation.location : car.pickUpLatitude,
      pickUpLongitude:
        isDelivery === 'yes' ? pickUpLocation.longitude : car.pickUpLongitude,
      pickUpLatitude:
        isDelivery === 'yes' ? pickUpLocation.latitude : car.pickUpLongitude,
      dropOffLocation: dropOffLocation.location,
      dropOffLongitude: dropOffLocation.latitude,
      dropOffLatitude: dropOffLocation.longitude,
    };
    setLoading(true);
    await requests
      .post<any>(`reservations/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setLoading(false);
        Swal.fire({
          title: `${carMake.name} ${car.model} reservation`,
          text: `Vehicle has been reserved successfully. Kindly wait for the approval from us`,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            reloadPage('/user/orders');
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log('cars list error =>', error as string);
      });
  };

  const handleColor = (time: any) => {
    console.log('time =>', time);
    return time.getHours() > 12 ? 'text-success' : 'text-error';
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toISOString();
  };

  const days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const estimatedTotal = days * car.dailyRate;
  return (
    <div className="de-box mb25">
      <form name="contactForm" id="contact_form" method="post">
        <h4>Booking this car</h4>

        <div className="spacer-20"></div>

        <div className="row">
          <div className="col-lg-12 mb20">
            <h5>Will car be delivered?</h5>
            <Select
              options={options}
              placeholder="Will car be delivered?"
              onChange={(value) => {
                if (value) {
                  setIsDelivery(value.value);
                }
              }}
            />
          </div>
          {isDelivery === 'no' ? (
            <p>
              The pickup location is: <b>{car.pickUpLocation}</b>
            </p>
          ) : (
            <div className="col-lg-12 mb20">
              <h5>Delivery Location</h5>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyBGRZ2UaedCg8Q3dRrKCizmnYQFeHdQAj0"
                selectProps={{
                  placeholder: 'Enter pickup location',
                  onChange: (value) => handleLocationChange(value, 'pickUp'),
                }}
              />
            </div>
          )}

          <div className="col-lg-12 mb20">
            <h5>Drop Off Location</h5>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyBGRZ2UaedCg8Q3dRrKCizmnYQFeHdQAj0"
              selectProps={{
                placeholder: 'Enter dropoff location',
                onChange: (value) => handleLocationChange(value, 'dropOff'),
              }}
            />
          </div>

          <div className="col-lg-12 mb20">
            <h5>Pick Up Date & Time</h5>
            <div className="date-time-field">
              <DatePicker
                showTimeSelect
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date || new Date());
                }}
                timeClassName={handleColor}
              />
            </div>
          </div>

          <div className="col-lg-12 mb20">
            <h5>Return Date & Time</h5>
            <div className="date-time-field">
              <DatePicker
                showTimeSelect
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date || new Date());
                }}
                timeClassName={handleColor}
              />
            </div>
          </div>
          <div className="col-lg-12 mb20">
            <h5>Estimated Payable Amount</h5>
            <div className="">{estimatedTotal}</div>
          </div>
        </div>

        {loading ? (
          <div id="submit">Loading...</div>
        ) : (
          <input
            type="submit"
            value="Book Now"
            className="btn-main btn-fullwidth"
            onClick={(event) => confirmReservation(event)}
          />
        )}

        <div className="clearfix"></div>
      </form>
    </div>
  );
}

export default Reserve;
