// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../../hooks/redux";
// import LayoutView from "../../components/LayoutView/LayoutView";
//
// const AuthenticatedRoute = () => {
//     const {verified} = useAppSelector(state => state.authReducer);
//     const accessToken = localStorage.getItem('indenim:a:token');
//     console.log('verified ', verified)
//     console.log('token ', accessToken)
//
//     return accessToken && verified ? <LayoutView /> : <Navigate to='/login' />
// };
//
// export default AuthenticatedRoute;

import { Navigate } from "react-router-dom";
import LayoutView from "../../components/LayoutView/LayoutView";

const AuthenticatedRoute = () => {
    const accessToken = localStorage.getItem('indenim:a:token');
    console.log('token ', accessToken)

    return accessToken ? <LayoutView /> : <Navigate to='/login' />
};

export default AuthenticatedRoute;