import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTrainer = () => {

    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: isTrainer, isPending: isTrainerLoading} = useQuery({
        queryKey: [user?.email, 'isTrainer'],
        enabled: !loading,
        queryFn: async()=> {
            const res= await axiosSecure.get(`/user/trainer/${user.email}`);
            return res.data.trainer;
        }
    })
    return [isTrainer, isTrainerLoading]
};

export default useTrainer;