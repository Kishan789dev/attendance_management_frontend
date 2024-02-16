import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,Link,RouterProvider} from 'react-router-dom'
import { AuthProvider } from './Context/AuthProvider';
import Principle from './Components/Assets/Principle/Principle';
import Students from './Components/Assets/Students/Students'
import Teachers from './Components/Assets/Teachers/Teachers'


const router = createBrowserRouter([
  {
    path:"/login",
    element:<App/>,},
    {
    path:"/principle",
    element:<Principle/>},
    {
      path:"/students",
      element:<Students/>},
      {
        path:"/teachers",
        element:<Teachers/>},
       



    // errorElement: <div className='flex flex-col gap-5'>
    //       <Link to="/login"  >
    //         <button className='bg-green-600'> go to login</button>
    //          </Link>
             
            
    
    // </div>
    
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
