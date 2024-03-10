import React from 'react';
// import { Route, Switch, Router } from "react-routers-dom";
import { message } from "antd";
// import history from './utils/history';
// import AuthRoute from "./hooks/authRoute";
import routes from "./constants/routes";
import './styles/_variables.scss';
import './index.scss';
import Views from "./routes/Views";


function App() {
    message.config({maxCount: 1});

    // return (
    //     <Router history={history}>
    //         <Switch>
    //             {routes.map(route => (
    //                 route.isAdmin ? (
    //                     <AuthRoute
    //                         exact={route.isExact}
    //                         path={route.path}
    //                         component={route.component}
    //                         isAdmin={route.isAdmin}
    //                         key={route.path}
    //                         requiredRoles={[...route.requiredRoles]}
    //                     />
    //                 ) : (
    //                     <Route key={route.path} component={route.component} exact={route.isExact} path={route.path}/>
    //                 )
    //             ))}
    //         </Switch>
    //     </Router>
    // );

    return <Views/>;
}

export default App;


