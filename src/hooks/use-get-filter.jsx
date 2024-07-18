import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import adminAPI from "@/api/adminAPI";



// Assuming your API endpoint for fetching bookings:
const API_ENDPOINT = "";

const useGetFilterData = (initialFilters,endpoint) => {
  const [page, setPage] = useState(1); // Start on page 1
  const [pageSize] = useState(10); // Fixed page size
  const [filters, setFilters] = useState(initialFilters ? initialFilters : ""); 
  // console.log({filters})

  const buildUrl = (filters, page, pageSize) => {
    const urlParams = new URLSearchParams({
      Page: page,
      PageSize: pageSize,
      ...filters, // Include all filter parameters
    });
    return `${API_ENDPOINT || endpoint }?${urlParams.toString()}`;
  };


  const fetchApi = async (page, pageSize,filters) => {
    try {
      const response = await adminAPI.get(buildUrl(filters, page, pageSize));
      if (!response) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.data; // Assuming your API response data structure
    } catch (error) {
      console.error("Error fetching booking data:", error);
      throw error; // Re-throw the error for useQuery handling
    }
  };

  const {
    isLoading, 
    isError, 
    error, 
    data: alldata = [],
    isFetching, 
    isPreviousData, 
    refetch, 
  } = useQuery({
    queryKey: ["getData", page, pageSize,filters],
    queryFn: () => fetchApi(page, pageSize,filters),
    //initialData: { data: [] }, // Set initial empty array to avoid empty state issues
    keepPreviousData: true, // Maintain previous data on subsequent page changes
    onError: (error) => {
      // Handle errors here, e.g., display an error message to the user
      console.error("Error fetching booking data:", error);
    },
  });



  // Function to load the next page of data
  const loadNextPage = () => {
    
    if (alldata?.hasNextPage) {
        setPage(page + 1); // Update page state to trigger a new query 
        refetch();
      }
  };

  const loadPreviousPage = () => {
    if (alldata?.hasPreviousPage) {
      setPage(page - 1); // Update page state to trigger a new query
    }
  };

    // Function to update filters and fetch data accordingly
    const updateFilters = (newFilters) => {
      setPage(1); // Reset page to 1 when filters change
      setFilters(newFilters); // Update local filters state
      refetch(newFilters); // Refetch data with updated filters
    };



  return {
    alldata : alldata?.data || [],
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData,
    loadNextPage,
    loadPreviousPage,
    hasNextPage : bookingData?.hasNextPage,
    hasPreviousPage: bookingData?.hasPreviousPage,
    refetch, // Expose refetch function for manual updates (optional)
    updateFilters
  };
};

export default useGetFilterData;
