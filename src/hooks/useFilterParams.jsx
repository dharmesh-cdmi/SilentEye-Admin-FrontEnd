
import { useMemo } from 'react';

const useFilteredParams = (params) => {
  return useMemo(() => {
    return Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(params).filter(([_, value]) => value !== null && value !== undefined)
    );
  }, [params]);
};

export default useFilteredParams;