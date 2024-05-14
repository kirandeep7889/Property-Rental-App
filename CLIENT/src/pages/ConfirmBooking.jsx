import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const ConfirmBookingPage = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.profile);
    const bookingForm = location.state ? location.state.bookingForm : null;
    const {token}=useSelector((state)=>state.auth);

    console.log(bookingForm)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contact: user.contact || '', 
        }
    });
    const navigate=useNavigate();

    const onSubmit = async(data) => {
        console.log(data);
        const response = await axios.post("https://property-rental-app-1.onrender.com/api/v1/bookings/confirm-booking", bookingForm, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          console.log(response)
          toast.success(response?.data?.message);
          navigate("/");
        }   
    return (
        <div className=' flex gap-x-20 items-center justify-center w-full mb-5'>
            <div className="mt-10 flex flex-col justify-center gap-10">
                <h2 className='text-2xl text-center font-semibold text-red-950'>Confirm Your Personal Details...</h2>
                <form className=' p-2 md:p-5 bg-slate-200 rounded-lg  shadow-lg md:w-[600px]' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <p className="text-[0.875rem] text-slate-900 mb-1 leading-[1.375rem] font-semibold">First Name<sup className="text-red-900">*</sup></p>
                        <input className=" rounded-[0.5rem] bg-slate-50  w-full p-[12px] border-b-[1px] border-slate-800" required type="text" name="firstName" {...register("firstName")} placeholder="Enter Your First Name" data-testid="first-name-input" />
                    </label>
                    <label className='mt-4'>
                        <p className="text-[0.875rem] mt-4 text-slate-900 mb-1 leading-[1.375rem] font-semibold">Last Name<sup className="text-red-900">*</sup></p>
                        <input className="bg-slate-50 rounded-[0.5rem]  w-full p-[12px] border-b-[1px] border-slate-800" required type="text" name="lastName" {...register("lastName")} placeholder="Enter Your Last Name" data-testid="last-name-input" />
                    </label>
                    <label className='mt-4'>
                        <p className="text-[0.875rem] mt-4 text-slate-900 mb-1 leading-[1.375rem] font-semibold">Email<sup className="text-red-900">*</sup></p>
                        <input className="bg-slate-50 rounded-[0.5rem]  w-full p-[12px] border-b-[1px] border-slate-800" required type="email" name="email" {...register("email")} placeholder="Enter Your Email" data-testid="email-input" />
                    </label>
                    <label className='mt-4'>
                        <p className="text-[0.875rem] mt-4 text-slate-900 mb-1 leading-[1.375rem] font-semibold">Contact</p>
                        <input className="bg-slate-50 rounded-[0.5rem]  w-full p-[12px] border-b-[1px] border-slate-800" type="text" name="contact" {...register("contact")} placeholder="Enter Your Contact Number" data-testid="contact-input" />
                    </label>
                    <button className="bg-red-600 w-full p-2 rounded-lg mt-5 text-white hover:scale-95 transition-all duration-200 
                     hover:font-semibold"  type="submit">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmBookingPage;
