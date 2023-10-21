// create app routes using react-router-dom
// home is / - dashboard
// login is /login - login
// register is /register - register
// environment is /environment - environment
// sub environment is /environment/:id - sub environment

import { Route, createBrowserRouter, createRoutesFromElements, useRouteError } from 'react-router-dom';
import Dashboard, { tasksLoader } from '../layouts/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Environment from '../pages/Environment';
import SubEnvironment from '../pages/EnvironmentID';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../pages/NotFound';

const ErrorElement = () => {
    let err = useRouteError() as any;
    console.log("ErrorElement", err);
    return (
        <div><div>message:{err}</div>Something went wrong!</div>
    )

}



// define here all the routes of the app
const Routeselements = [
    <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} loader={tasksLoader} errorElement={<ErrorElement />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="environment" element={<Environment />}>
            <Route path=":id" element={<SubEnvironment />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Route>
];

const router = createBrowserRouter(
    createRoutesFromElements(
        Routeselements
    )
);

export default router;