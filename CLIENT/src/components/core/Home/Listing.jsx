import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import toast from "react-hot-toast";

import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../../common/Spinner';

export default function Listing() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const { listingId } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`https://property-rental-app-1.onrender.com/api/v1/properties/${params.listingId}`)
        console.log(res)
        if (res.status !== 200 ) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(res?.data);
        setLoading(false)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

  const handleBookProperty = () => {
    if (user?.role === "buyer") {
      navigate(`/ProperySelection/${listingId}`);
    } else {
      toast.error("You need to be a buyer to book this property.");
    }
  };

  return (
    <div>
      {loading && <div className='absolute grid place-content-center h-screen w-screen'><Spinner/></div>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className='flex flex-col md:flex md:flex-row'>
          <div className='p-10 md:w-1/2'>
            <Swiper className='rounded-lg' navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className='h-[550px]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>  
          <div className='flex flex-col max-w-4xl mx-auto p-3 mt-10 gap-4'>
            <p className='text-slate-800 w-screen p-2 md:w-2/3'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <p className='flex items-center p- md:flex md:items-center gap-2 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.location}
            </p>
            <h2 className='text-2xl font-semibold'>What this place offers?</h2>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center  p-2 gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            <div className='mt-5 flex gap-x-20 items-center'>
              <div>
                <button
                  className="bg-red-600 w-full p-2 rounded-lg mt-3 text-white hover:scale-95 transition-all duration-200 hover:font-semibold"
                  type="submit"
                  onClick={handleBookProperty}
                >
                  BOOK PROPERTY
                </button>
              </div> 
            </div> 
          </div>  
        </div>
      )}
    </div>
  );
}
