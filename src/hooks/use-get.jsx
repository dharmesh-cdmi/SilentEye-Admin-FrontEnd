import adminAPI from "@/api/adminAPI";
import { useQuery } from "@tanstack/react-query";

const useGet = ({ endpoint,enabled = true, onSuccess = () => {}, onError = () => {}, onSettled = () => {} }) => {
  const query = useQuery({
    queryKey: ["getData", endpoint], // Include the endpoint in the query key
    queryFn: () => adminAPI.get(endpoint), // Fetch data using adminAPI.get
    enabled: enabled,
    onSuccess, // Callback for successful data fetching (optional)
    onError, // Callback for errors during data fetching (optional)
    onSettled, // Callback after data fetching is settled (optional)
  });

  return query;
};

export default useGet;
