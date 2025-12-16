import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import Loading from '../../../Loading/Loading';
import useAxiosSecure from '../../HooksRole/useAxiosSecure';
import toast from 'react-hot-toast';


const DecoratorRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get('/decorator-requests');
        setRequests(res.data);
      } catch (err) {
        toast.error('Failed to load decorator requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleApprove = async (request) => {
    try {
      const res = await axiosSecure.patch('/update-role', { email: request.email, role: 'decorator' });
      if (res.data.modifiedCount > 0) {
        toast.success(`${request.email} is now a Decorator`);
        setRequests(requests.filter(r => r._id !== request._id));
      }
    } catch {
      toast.error('Failed to approve request');
    }
  };

  const handleReject = async (request) => {
    try {
      const res = await axiosSecure.delete(`/users/reject/:id/${request._id}`);
      if (res.data.deletedCount > 0) {
        toast.info('Request rejected');
        setRequests(requests.filter(r => r._id !== request._id));
      }
    } catch {
      toast.error('Failed to reject request');
    }
  };

  if (loading) return <Loading></Loading>

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-6'>Decorator Role Requests</h2>
      {requests.length === 0 ? (
        <p className='text-gray-500'>No pending decorator requests</p>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {requests.map(request => (
            <motion.div key={request._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className='rounded-2xl shadow-md'>
                <div className='p-5'>
                  <p className='text-sm font-medium'>User Email</p>
                  <p className='text-gray-600 break-all'>{request.email}</p>
                  <div className='flex gap-3 mt-4'>
                    <button onClick={() => handleApprove(request)} className='w-full'>Approve</button>
                    <button variant='destructive' onClick={() => handleReject(request)} className='w-full'>Reject</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecoratorRequest;
