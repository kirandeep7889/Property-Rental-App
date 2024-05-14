import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import ListingItem from '../components/core/Home/ListingItem';
import axios from 'axios';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    location: '',
    parking: false,
    furnished: false,
    minBeds: 0,
    maxBeds: 5,
    minPrice: '', 
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const locationFromUrl = urlParams.get('location');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const minBedsFromUrl = urlParams.get('minBeds');
    const maxBedsFromUrl = urlParams.get('maxBeds');
    const minPriceFromUrl = urlParams.get('minPrice'); 
    const maxPriceFromUrl = urlParams.get('maxPrice');

    if (
      searchTermFromUrl ||
      locationFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      minBedsFromUrl ||
      maxBedsFromUrl ||
      minPriceFromUrl || 
      maxPriceFromUrl 
    ) 
    {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        location: locationFromUrl || '',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        minBeds: parseInt(minBedsFromUrl) || 0,
        maxBeds: parseInt(maxBedsFromUrl) || 5,
        minPrice: minPriceFromUrl || '', 
        maxPrice: maxPriceFromUrl || ''
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await axios.get(`https://property-rental-app-1.onrender.com/api/v1/properties/filter?${searchQuery}`);
      console.log(res)
      if (res?.data?.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(res?.data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSidebardata({
        ...sidebardata,
        [id]: checked,
      });
    } else {
      setSidebardata({
        ...sidebardata,
        [id]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(sidebardata).forEach(([key, value]) => {
      if (value !== '') {
        urlParams.set(key, value);
      }
    });
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Location:</label>
            <input
              type='text'
              id='location'
              placeholder='Enter location...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.location}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Number of Beds:</label>
            <input
              type='number'
              id='minBeds'
              min='0'
              max='5'
              className='border rounded-lg p-3 w-20'
              value={sidebardata.minBeds}
              onChange={handleChange}
            />
            <span>-</span>
            <input
              type='number'
              id='maxBeds'
              min='0'
              max='5'
              className='border rounded-lg p-3 w-20'
              value={sidebardata.maxBeds}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col  gap-2'>
            <label className='font-semibold'>Price Range:</label>
            <div>
                <input
                  type='number'
                  id='minPrice'
                  placeholder='Min Price'
                  className='border rounded-lg p-3  w-20 md:w-40'
                  value={sidebardata.minPrice}
                  onChange={handleChange}
                />
                <span>-</span>
                <input
                  type='number'
                  id='maxPrice'
                  placeholder='Max Price'
                  className='border rounded-lg p-3 w-20 md:w-40'
                  value={sidebardata.maxPrice}
                  onChange={handleChange}
                />
            </div>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <div className='absolute grid place-content-center h-[60%] w-[70%]'>
              <Spinner />
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
