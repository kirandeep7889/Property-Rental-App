import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UploadWidget from '../components/core/AddProperty/UploadWidget';
import toast from 'react-hot-toast';
import axios from 'axios';
import { updateSellerProperty } from '../services/operations/SellerAPI';

export default function EditProperty() {
  const { propertyId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    imageUrls: [],
    property_name: '',
    description: '',
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    price: 50,
    parking: false,
    furnished: false,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await axios.get(`https://property-rental-app-1.onrender.com/api/v1/properties/${propertyId}`);
        console.log(res)
        if (res.status === 200) {
          setFormData(res.data);
        } else {
          setError("Error fetching property data");
        }
      } catch (error) {
        setError("Error fetching property data");
      }
    }
    fetchProperty();
  }, [propertyId, token]);

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    if (id === 'sale' || id === 'rent') {
      setFormData({
        ...formData,
        type: id,
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [id]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      setLoading(true);
      setError(false);
      const res = await dispatch(updateSellerProperty(propertyId, formData, token));
      console.log(res)
      setLoading(false);
      if (!res?.status === 200) {
        setError("Error updating property");
      }
      toast.success(res?.data?.message);
      navigate("/dashboard/seller/Properties");
    } catch (error) {
      setError(error?.message);
      setLoading(false);
      toast.error("Error updating property");
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Edit Property
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Property Name..'
            className='border p-3 rounded-lg'
            id='property_name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.property_name}
          />
          <textarea
            type='text'
            placeholder='Property Description...'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Property Address..'
            className='border p-3 rounded-lg'
            id='location'
            required
            onChange={handleChange}
            value={formData.location}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Bedrooms</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bathrooms</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='price'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.price}
              />
              <div className='flex flex-col items-center'>
                <p>Price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>(Rs.)</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <UploadWidget
              uwConfig={{
                cloudName: 'dpsukw8fy',
                uploadPreset: 'ppvgyinh',
              }}
              setState={(newUrls) => {
                if (typeof newUrls === 'function') {
                  setFormData((prevData) => ({
                    ...prevData,
                    imageUrls: newUrls(prevData.imageUrls),
                  }));
                } else if (Array.isArray(newUrls)) {
                  setFormData({ ...formData, imageUrls: newUrls });
                } else {
                  console.error('Invalid newUrls:', newUrls);
                }
              }}
            />
          </div>
          {formData?.imageUrls && console.log("formData.imageUrls:", formData.imageUrls)}
          {formData?.imageUrls.length > 0 &&
            formData?.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update Property'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>  
    </main>
  );
}
