// import { Navigate } from 'react-routers-dom';
// import { useAppSelector } from "../../hooks/redux";
// import Login from "../../pages/Login/Login";
//
// const UnauthenticatedRoute = () => {
//     const {verified} = useAppSelector(state => state.authReducer);
//     const accessToken = localStorage.getItem('indenim:a:token');
//
//     return accessToken && verified ? <Navigate to='/' /> : <Login />;
// };
//
// export default UnauthenticatedRoute;

import { Navigate } from 'react-router-dom';
import Login from "../../pages/Login/Login";

const UnauthenticatedRoute = () => {
    const accessToken = localStorage.getItem('indenim:a:token');

    return accessToken ? <Navigate to='/' /> : <Login />;
};

export default UnauthenticatedRoute;