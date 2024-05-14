import React, { useState, useEffect } from 'react';
import { DateRange } from "react-date-range";
import { useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../components/common/Spinner';

export default function  PropertySelectionPage ()  {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
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
    const {token}=useSelector((state)=>state.auth);

    const { listingId } = useParams();
    const navigate=useNavigate();

    const handleSubmit = async () => {
        try {
            const bookingForm = {
                propertyId: listingId,
                startDate: dateRange[0].startDate.toDateString(),
                endDate: dateRange[0].endDate.toDateString(),
            };

            const response = await axios.post("https://property-rental-app-1.onrender.com/api/v1/bookings/check-availability", bookingForm, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log(response)
             if(response?.status==200) {
                 toast.success(response?.data?.message);
              navigate(`/confirmBooking/${listingId}`, { state: { bookingForm } });
             }
        } catch (err) {
            console.log(error)
               toast.error("Property is already booked for the specified dates");
        }
    };

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
    
      console.log(listing)

    return (
        <div className='mt-20 flex gap-x-20 items-center justify-center'>
        {loading && <div className=' absolute grid place-content-center h-screen w-screen'><Spinner/></div>}
{error && (
 <p className='text-center my-7 text-2xl'>Something went wrong!</p>
)}
{listing && !loading && !error && (
  <div>
       <h2 className='text-2xl font-semibold text-red-950'>How long do you want to stay?</h2> 
         <div className="mt-10 flex flex-col md:flex md:flex-row md:items-center md:gap-20">
                 <DateRange ranges={dateRange} onChange={handleSelect} /> 
                 <div> 
                     <h2 className='text-slate-600 font-bold'>Total price: ${listing.price}</h2>
                     <p className='text-slate-600'>Start Date: {dateRange[0].startDate.toDateString()}</p>
                     <p className='text-slate-600'>End Date: {dateRange[0].endDate.toDateString()}</p>
                     <button className="bg-red-600 w-full p-2 rounded-lg mt-3 text-white hover:scale-95 transition-all duration-200 
                     hover:font-semibold" type="submit" onClick={handleSubmit}>
                         PROCEED
                     </button>
                 </div>
         </div>           
  </div>
)}
</div>
    );
};


