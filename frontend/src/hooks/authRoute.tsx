// import React, { ReactElement, useEffect } from 'react';
// import { Redirect, Route, RouteComponentProps, useHistory } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from "./redux";
// import { Layout } from "antd";
// import { Content } from "antd/es/layout/layout";
// import { authRefreshAction, authVerifyAction } from "../store/auth/AuthActions";
// import { fetchProfileAction } from "../store/profile/ProfileActions";
// import Sidebar from "../components/Layout/Sidebar/Sidebar";
// import Header from "../components/Layout/Header/Header";
// import MainLoader from "../components/ui/MainLoader/MainLoader";
//
// interface IProps {
//     component: React.FC<RouteComponentProps>,
//     exact: boolean,
//     path: string,
//     isAdmin: boolean,
//     requiredRoles: number[],
// }
//
// const AuthRoute = ({
//                        component: Component,
//                        isAdmin,
//                        path,
//                        exact,
//                        requiredRoles,
//                    }: IProps): ReactElement | null => {
//     const history = useHistory();
//     const dispatch = useAppDispatch();
//
//     const profile = useAppSelector((state) => state.profileReducer);
//
//     useEffect(() => {
//         void getInitialChecking();
//     }, []);
//
//     async function getInitialChecking() {
//         const token = localStorage.getItem('indenim:a:token');
//         const refresh_token = localStorage.getItem('indenim:r:token');
//
//         if (!token && !refresh_token) {
//             history.push('/login');
//         } else {
//             if (token) {
//                 try {
//                     await dispatch(authVerifyAction({token})).unwrap().then(async (isVerified: boolean) => {
//                         if (isVerified) {
//                             await dispatch(fetchProfileAction());
//                         } else {
//                             history.push('/login');
//                         }
//                     });
//                 } catch (e) {
//                     try {
//                         const accessToken = localStorage.getItem('indenim:a:token');
//                         if (refresh_token && accessToken) {
//                             await dispatch(authRefreshAction({refresh: refresh_token}));
//                             await dispatch(authVerifyAction({token: accessToken})).unwrap().then(async (isVerified: boolean) => {
//                                 if (isVerified) {
//                                     await dispatch(fetchProfileAction());
//                                 } else {
//                                     history.push('/login');
//                                 }
//                             });
//                         }
//                     } catch (err) {
//                         try {
//                             const accessToken = localStorage.getItem('indenim:a:token');
//                             if (refresh_token && accessToken) {
//                                 await dispatch(authRefreshAction({refresh: refresh_token}));
//                                 await dispatch(authVerifyAction({token: accessToken}));
//                             }
//                         } catch (err) {
//                             history.push('/login');
//                         }
//                     }
//                 }
//             }
//         }
//     }
//
//     if (!profile.data) {
//         return <MainLoader/>;
//     }
//
//     return (
//         <>
//             <Route
//                 path={path}
//                 exact={exact}
//                 render={(props) =>
//                     requiredRoles?.length === 0 || requiredRoles.includes(profile.data ? profile.data?.type : 0) ? (
//                         <>
//                             {profile?.data?.type && (
//                                 <Layout style={{minHeight: '100vh'}}>
//                                     <Sidebar/>
//                                     <Layout>
//                                         <Header
//                                             profileName={profile?.data?.full_name || ''}
//                                         />
//                                         <Content>
//                                             <div className={'content'}>
//                                                 <Component {...props} />
//                                             </div>
//                                         </Content>
//                                     </Layout>
//                                 </Layout>
//                             )}
//                         </>
//                     ) : (
//                         <Redirect to="/"/>
//                     )
//                 }
//             />
//         </>
//     );
// };
//
// export default AuthRoute;
//
//
//
//
