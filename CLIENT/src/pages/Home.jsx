import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PropertiesEndpoints } from '../services/apis';
import { allProperties } from '../services/operations/PropertiesAPI';
import ListingItem from '../components/core/Home/ListingItem';
import { useDispatch } from 'react-redux';
import Spinner from '../components/common/Spinner';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch=useDispatch()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res =  await dispatch(allProperties());
        console.log(res)
        setListings(res.data); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  console.log(listings)
  return (
    <div className='h-screen '>
      {loading && <div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>}
      <div className='flex flex-col gap-6 justify-center  px-3 max-w-6xl mx-auto '>
        <h1 className='text-slate-700 mt-16 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Real Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
          <h1 className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Let's get started...
          </h1>
         </div>
       <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 mt-0'>
        <div className=''>
          <div className='my-7'>
            <h2 className='text-2xl font-semibold text-slate-600'>Explore These Properties</h2>
          </div>
          <div className='flex flex-wrap gap-4 mb-32'>
            {listings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
