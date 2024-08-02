import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCard } from '../../services/api';

const Card = ({ data, onDelete }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteCard(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['cards']);
      if (onDelete) onDelete(); 
    },
    onError: (error) => {
      console.error('Failed to delete card:', error);
    },
  });

  return (
    <div className='w-96 border flex flex-col gap-5 p-4 rounded'>
      <p className='font-bold'>{data.id}</p>
      <h1 className='font-bold'>{data.cardName}</h1>
      <h3>{data.cardDesc}</h3>
      <div className='flex gap-4'>
        <button
          onClick={() => mutation.mutate()}
          className='bg-red-600 p-2 rounded'
        >
          {mutation.isLoading ? 'Deleting...' : 'Delete'}
        </button>
        <button className='bg-yellow-500 p-2 rounded'>Update</button>
        <button className='bg-blue-500 p-2 rounded'>View</button>
      </div>
    </div>
  );
}

export default Card;
