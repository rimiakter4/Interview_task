
import './App.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './Login/Login';
import Dashboard from './DashBoard/DashBoard';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
    element: <Login></Login>
  },{
    path:"dashboard",
    element:<Dashboard></Dashboard>
  }
]);

function App() {

 
  return (
    <>
 
      <RouterProvider router={router} />
    </>
  )
}

export default App
