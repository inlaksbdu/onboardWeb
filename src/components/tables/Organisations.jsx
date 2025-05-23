import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetOrganizationsMutation } from '../../features/auth/authApiSlice'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function OrganisationsTable() {
    const [getOrganizations, { isLoading, data }] = useGetOrganizationsMutation()

    const handleGetOrganizations = async () => {
        try {
            await getOrganizations().unwrap();
        } catch (error) {
            console.error('Failed to fetch organizations:', error);
        }
    }

    useEffect(() => {
        handleGetOrganizations()
    }, [])

    // Format date to a more readable format
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    return (
        <div className='w-full flex flex-col'>
            <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-row items-center rounded-md gap-3 border-slate-200 drop-shadow-sm shadow-sm shadow-gray-400 border py-1 px-3 text-[#181818] text-sm text-opacity-70'>
                    <div className='border border-slate-200 font-poppins px-2 py-1 rounded-md drop-shadow-sm shadow-sm shadow-gray-400'>
                        All Organisations{!isLoading && data && (
                        `(${data.total})`
                    
                )}
                    </div>
                    <div className='font-poppins px-2 py-1 rounded-md'>
                        SME
                    </div>
                    <div className='font-poppins px-2 py-1 rounded-md'>
                        Group
                    </div>
                </div>

                <Link 
                    to="/organisation/new" 
                    className='bg-gradient-to-r from-[#8600D9] to-[#470073] py-2 px-4 text-white font-poppins font-medium text-sm rounded-md'
                >
                    Add New
                </Link>
            </div>

            <div className='w-full relative'>
                <div className="w-full mt-5">
                    <div className="relative overflow-x-auto shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="text-sm text-left text-slate-600 bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-3 font-livvic text-center text-nowrap py-3">Name</th>
                                    <th scope="col" className="px-3 font-livvic text-center text-nowrap py-3">Date Created</th>
                                    <th scope="col" className="px-3 font-livvic text-center text-nowrap py-3">Type</th>
                                    <th scope="col" className="px-3 font-livvic text-center text-nowrap py-3">Registration Number</th>
                                    <th scope="col" className="px-3 font-livvic text-center text-nowrap py-3">Country</th>
                                    <th scope="col" className="px-3 font-livvic text-center text-nowrap py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    // Skeleton loading state
                                    Array(5).fill(0).map((_, index) => (
                                        <tr key={`skeleton-${index}`} className='border-b border-border'>
                                            {Array(7).fill(0).map((_, i) => (
                                                <td key={`skeleton-cell-${index}-${i}`} className="px-3 py-4">
                                                    <Skeleton height={20} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    // Data state
                                    data?.items?.length > 0 ? (
                                        data.items.map((org) => (
                                            <tr key={org.id} className='border-b border-border'>
                                                <td className="px-3 text-center text-nowrap py-3">{org.name || '-'}</td>
                                              
                                                <td className="px-3 text-center text-nowrap py-3">{formatDate(org.created_at)}</td>
                                                <td className="px-3 text-center text-nowrap py-3 capitalize">{org.type || '-'}</td>
                                                <td className="px-3 text-center text-nowrap py-3">{org.registration_number || '-'}</td>
                                                <td className="px-3 text-center text-nowrap py-3">{org.country || '-'}</td>
                                                <td className="px-3 text-center text-nowrap py-3">
                                                    <Link 
                                                        to={`/organisation/${org.id}`} 
                                                        className="text-purple-600 hover:text-purple-800 font-medium"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-3 py-4 text-center">
                                                No organizations found
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Total count display */}
                
            </div>
        </div>
    )
}

export default OrganisationsTable