import adminAPI from "@/api/adminAPI";
import { useMutation } from "@tanstack/react-query";

const useUpdate = ({
  endpoint = "",
  isMultiPart = false,
  onSuccess,
  onError,
  onSettled,
}) => {
  const mutation = useMutation({
    mutationFn: (data) => {
      return adminAPI.put(
        endpoint,
        data,
        {
          headers: {
            "Content-Type": isMultiPart
              ? "multipart/form-data"
              : "application/json",
          },
        },
        {
          onSuccess,
          onError,
          onSettled,
        }
      );
    },
  });

  return mutation;
};

export default useUpdate;