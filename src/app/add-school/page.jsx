// We need to use 'use client' for forms and interactivity
'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
// Import icons from the library we just installed
import { BuildingOffice2Icon, MapPinIcon, EnvelopeIcon, PhoneIcon, PhotoIcon, GlobeAltIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // We'll use an object for the message to handle success/error states
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage({ type: '', text: 'Submitting...' });
    
    try {
      await axios.post('/api/add-school', data);
      setMessage({ type: 'success', text: 'School added successfully!' });
      reset(); // Reset the form fields after successful submission
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to add school. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // A subtle gradient background for a more modern feel
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Add New School</h1>
            <p className="text-gray-500 mt-2">Fill in the details below to add a new school to the directory.</p>
        </div>

        <div className='flex justify-between items-center border-t pt-4'>

             <div className="text-left border-t pt-4">
          <Link href="/" className="inline-block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
            Home
          </Link>
        </div>
        
             <div className="text-right border-t pt-4">
          <Link href="/schools" className="inline-block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
            View All Schools →
          </Link>
        </div>

        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Input field with a prepended icon */}
          <div className="relative">
            <UserCircleIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input 
              id="name"
              placeholder="School Name"
              {...register('name', { required: 'School name is required.' })}
             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-500"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs -mt-3 ml-2">{errors.name.message}</p>}

          <div className="relative">
            <MapPinIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input 
              id="address"
              placeholder="Full Address"
              {...register('address', { required: 'Address is required.' })}
             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-500"
            />
          </div>
          {errors.address && <p className="text-red-500 text-xs -mt-3 ml-2">{errors.address.message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
                <BuildingOffice2Icon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input 
                    id="city"
                    placeholder="City"
                    {...register('city', { required: 'City is required.' })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-500"
                />
            </div>
            <div className="relative">
                <GlobeAltIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input 
                    id="state"
                    placeholder="State"
                    {...register('state', { required: 'State is required.' })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-500"
                />
            </div>
          </div>
          {(errors.city || errors.state) && <div className='grid grid-cols-1 md:grid-cols-2 gap-5 -mt-3 ml-2'><p className="text-red-500 text-xs">{errors.city?.message}</p><p className="text-red-500 text-xs">{errors.state?.message}</p></div>}

          <div className="relative">
            <PhoneIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input 
              id="contact"
              type="text"
              placeholder="Contact Number"
              {...register('contact')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-500"
            />
          </div>

          <div className="relative">
            <EnvelopeIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input 
              id="email_id"
              type="email"
              placeholder="Email ID"
              {...register('email_id', { 
                required: 'Email is required.',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format.' }
              })}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-500"
            />
          </div>
          {errors.email_id && <p className="text-red-500 text-xs -mt-3 ml-2">{errors.email_id.message}</p>}

          <div className="relative">
            <PhotoIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input 
              id="image"
              type="text"
              placeholder="Image URL (e.g., https://example.com/school.jpg)"
              {...register('image')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-500"
            />
          </div>
          
          {/* Improved button with gradient and hover effect */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Add School'}
          </button>
        </form>
        
        {/* Styled success/error message */}
        {message.text && (
          <div className={`mt-4 text-center p-3 rounded-lg text-sm font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : ''
          } ${
            message.type === 'error' ? 'bg-red-100 text-red-800' : ''
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}