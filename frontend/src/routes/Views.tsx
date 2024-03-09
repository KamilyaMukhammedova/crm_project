import { Routes, Route } from 'react-router-dom';
import routes from "./routes";

const Views = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                route.children ? (
                    <Route key={index} path={route.path} element={<route.element />}>
                        {route.children.map((child, childIndex) => (
                            <Route path={child.path} key={childIndex} index={child.index} element={<child.element />} />
                        ))}
                    </Route>
                ) : (
                    <Route key={index} path={route.path} element={<route.element />} />
                )
            ))}
        </Routes>
    );
};

export default Views;
