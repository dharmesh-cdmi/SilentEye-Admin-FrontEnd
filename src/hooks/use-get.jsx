import adminAPI from '@/api/adminAPI';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useGet = ({ endpoint,key, enabled = true, onSuccess = () => {}, onSettled = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery({
    queryKey: [key, endpoint],
    queryFn: () => adminAPI.get(endpoint),
    enabled: enabled,
    onSuccess,
    onSettled,
    onQueryStart: () => setIsLoading(true),
    onQuerySuccess: () => setIsLoading(false),
    onError: () => setIsLoading(false),
  });

  return { ...query, isLoading };
};

export default useGet;