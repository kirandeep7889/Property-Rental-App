import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../components/common/ConfirmationModal';
import toast from 'react-hot-toast';

const SellerProperties = () => {
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const handleShowListings = async () => {
            try {
                setShowListingsError(false);
                const res = await axios.get(`https://property-rental-app-1.onrender.com/api/v1/seller/sellerProperties`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res)
                if (res.status !== 200) {
                    setShowListingsError(true);
                    return;
                }
                setUserListings(res.data);
            } catch (error) {
            }
        };
        handleShowListings();
    }, [token]);

    const handleListingDelete = async (listingId) => {
        try {
            await axios.delete(`https://property-rental-app-1.onrender.com/api/v1/seller/deleteProperty/${listingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
            toast.success("Deleted Property Successfully");
        } catch (error) {
            toast.error("Error deleting Property");
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <p className='text-red-700 mt-5'>
                {showListingsError ? 'Error showing listings' : ''}
            </p>

            {userListings.length === 0 ? (
                <div className='flex flex-col items-center  mt-48 justify-center'>
                    <p className='text-red-700 text-3xl font-semibold'>No Properties Added Yet....</p>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center mt-7 text-2xl font-semibold'>
                        Your Properties
                    </h1>
                    {userListings.map((listing) => (
                        <div
                            key={listing._id}
                            className='border rounded-lg p-3 flex justify-between items-center gap-4'
                        >
                            <Link to={`/listing/${listing._id}`}>
                                <img
                                    src={listing.imageUrls[0]}
                                    alt='listing cover'
                                    className='h-16 w-16 object-contain'
                                />
                            </Link>
                            <Link
                                className='text-slate-700 font-semibold hover:underline truncate flex-1'
                                to={`/listing/${listing._id}`}
                            >
                                <p>{listing.property_name}</p>
                            </Link>

                            <div className='flex flex-col item-center'>
                                <button
                                    onClick={() => setConfirmationModal({
                                        text1: "Are You Sure?",
                                        text2: "You want to Delete this Property. Deleting this property will delete all the associated bookings with it.",
                                        btn1Text: "Delete Property",
                                        btn2Text: "Cancel",
                                        btn1Handler: async () => {
                                            await handleListingDelete(listing._id);
                                            setConfirmationModal(null);
                                        },
                                        btn2Handler: () => setConfirmationModal(null),
                                    })}
                                    className='text-red-700 uppercase'
                                >
                                    Delete
                                </button>
                                <Link to={`/update-listing/${listing._id}`}>
                                    <button className='text-green-700 uppercase'>Edit</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default SellerProperties;
