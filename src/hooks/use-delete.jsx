import adminAPI from "@/api/adminAPI";
import { useMutation } from "@tanstack/react-query";

const useDelete = ({
  endpoint = "",
}) => {
  const mutation = useMutation({
    mutationFn: (deleteId) => {
      return adminAPI.delete(
       `${endpoint}/${deleteId}`
      );
    },
  });

  return mutation;
};

export default useDelete;
