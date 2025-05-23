import React, { useState } from 'react';
import { useCreateOrganizationMutation } from '../../features/auth/authApiSlice';
function NewOrganistion() {
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        registration_number: '',
        country: '',
        state: '',
        address: ''
    });

    const [createOrganization, { isLoading }] = useCreateOrganizationMutation();

    const generateRandomString = (length = 8) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Organization name is required';
        if (!formData.type) newErrors.type = 'Organization type is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCreateOrganization = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            // Generate random registration number
            const registrationNumber = `ORG-${generateRandomString()}`;
            
            const response = await createOrganization({
                ...formData,
                registration_number: registrationNumber
            }).unwrap();
            
            setSuccess('Organization created successfully!');
            setErrors({});
            // Reset form
            setFormData({
                name: '',
                type: '',
                registration_number: '',
                country: '',
                state: '',
                address: ''
            });
            
        } catch (error) {
            console.error('Error:', error);
            setErrors(prev => ({
                ...prev,
                server: error.data?.message || 'Failed to create organization'
            }));
        }
    };

    return (
        <div className="w-full h-full pt-24 flex flex-col items-center px-3 bg-white">
            <div className='w-full text-slate-700 text-start mb-5 font-livvic font-semibold'>
                Organisations
            </div>

            <div className='mt-5 w-full flex justify-center'>
                <div className='max-w-lg w-full shadow-sm drop-shadow-sm bg-[#FBFBFB] shadow-gray-200 p-5 rounded-md'>
                    <p className='font-[#212121] font-aeonik font-semibold mt-5'>Create new Organisation</p>

                    {/* Error Message */}
                    {errors.server && (
                        <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50" role="alert">
                            <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {errors.server}
                            </div>
                            <button onClick={() => setErrors(prev => ({ ...prev, server: '' }))} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-border-2" aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50" role="alert">
                            <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {success}
                            </div>
                            <button onClick={() => setSuccess('')} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-border-3" aria-label="Close">
                                <span className="sr-only">Dismiss</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleCreateOrganization} className='flex flex-col w-full pb-7 gap-5 font-poppins mt-14'>
                        <div className='w-full text-start'>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className='border w-full placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8600D9] border-slate-200 py-2.5 px-3 rounded-md text-sm'
                                placeholder='Enter Organisation Name'
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
 
                        <div className='w-full text-start'>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className='border w-full placeholder:text-gray-700 font-poppins focus:outline-none focus:ring-1 focus:ring-[#8600D9] border-slate-200 py-2.5 px-3 rounded-md text-sm'
                            >
                                <option value="">Select Type</option>
                                <option value="sme">SME</option>
                                <option value="group">Group</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                        </div>
                        
                        <div className='w-full text-start'>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className='border w-full placeholder:text-gray-700 font-poppins focus:outline-none focus:ring-1 focus:ring-[#8600D9] border-slate-200 py-2.5 px-3 rounded-md text-sm'
                            >
                                <option value="">Select Country</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Nigeria">Nigeria</option>
                            </select>
                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>

                        <div className='w-full text-start'>
                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className='border w-full placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8600D9] border-slate-200 py-2.5 px-3 rounded-md text-sm'
                                placeholder='State'
                            />
                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                        </div>

                        <div className='w-full text-start '>
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className='border w-full placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8600D9] border-slate-200 py-2.5 px-3 rounded-md text-sm'
                                placeholder='Address'
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className='bg-[#8600D9] text-white py-2.5 px-4 rounded-md text-sm hover:bg-[#7600C0] transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Creating...' : 'Create Organization'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewOrganistion;