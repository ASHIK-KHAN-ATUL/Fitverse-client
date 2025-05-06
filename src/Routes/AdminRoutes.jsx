import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import useTrainer from '../Hooks/useTrainer';

const AdminRoutes = ({children}) => {

    const {user, loading, logout} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isTrainer, isTrainerLoading] = useTrainer();
    const location = useLocation();

    if(loading || isAdminLoading  ){
        return <div className='py-32 flex justify-center items-center'>
                    <Bars
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        />
                </div>
    }

    if(user && isAdmin){
        return children;
    }

    if (user && isTrainer) {
        toast.error('Access denied. Admins only.');
        return <Navigate to='/' replace />;
    }

    if(!isAdmin && !isTrainer){
        logout().then(() => {
            toast.warning('Unauthorized access! You have been logged out.');
        })
    }

    return <Navigate to={'/'} state={{from: location}} replace></Navigate>

};

export default AdminRoutes;