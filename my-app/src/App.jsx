import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router , Routes , Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import ProtectRoute from './Component/ProtectRoute/ProtectRoute'
import { ListComponent } from './Component/Home/ListComponent'
import { Register } from './Component/Register/Register'
import Login from './Component/Login/Login'
import EmployeeComponent from './Component/Home/EmployeeComponent'


function App() {


  const routers = createBrowserRouter([
    {path:'' , element:<Layout/> , children:[
      {path:'/', element: (<ProtectRoute><ListComponent/></ProtectRoute>)},
      {path:'/employees', element: (<ProtectRoute><ListComponent/></ProtectRoute>)},
      {path:'/add-employee', element: (<ProtectRoute><EmployeeComponent/></ProtectRoute>)},
      {path:'/edit-employee/:id', element: (<ProtectRoute><EmployeeComponent/></ProtectRoute>)},
      {path:'login' ,element: <Login/>},
      {path: 'register' , element: <Register/>}
    ]}
  ])

  return (
    <>
      <RouterProvider router={routers} />
  </>
  )
}

export default App
