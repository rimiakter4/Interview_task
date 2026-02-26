
import './App.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './Login/Login';
import Dashboard from './DashBoard/DashBoard';
import ErrorPage from './ErrorPage';
import { ToastContainer } from 'react-toastify';
const router = createBrowserRouter([
  {
    path: "/",

    element: <Login></Login>,
        errorElement:<ErrorPage></ErrorPage>
  },{
    path:"dashboard",
    element:<Dashboard></Dashboard>
  },{
   
    path: "*",
    element: <ErrorPage />,
  }
]);

function App() {

 
  return (
    <>
 
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
