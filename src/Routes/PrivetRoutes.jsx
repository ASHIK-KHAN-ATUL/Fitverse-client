import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, replace, useLocation } from "react-router-dom";
import { DNA } from "react-loader-spinner";


const PrivetRoutes = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return  <div className="w-full flex justify-center items-center min-h-screen">
                    <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                        />
                </div>
    }

    if(user){
        return children;
    }

    return <Navigate to={'/login'} state={{from: location} } replace></Navigate>
};

export default PrivetRoutes;