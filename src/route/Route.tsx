import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "../pages/Login.tsx";
import Home from "../pages/Home.tsx";
import SpareParts from "../pages/SpareParts.tsx";
import Calculator from "../pages/Calculator.tsx";
import Settings from "../pages/Settings.tsx";

const route = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <>Ошибка 404</>
    }, {
        path: '/admin',
        element: <Home />
    }, {
        path: '/admin/spare-parts',
        element: <SpareParts />
    }, {
        path: '/admin/calculators',
        element: <Calculator />
    }, {
        path: '/admin/update',
        element: <Settings />
    }
])

const Route = () => {
    return (
        <RouterProvider router={route}/>
    );
};

export default Route;