import './App.css'
import { useState } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import CreateTask from './components/createTask';
import DeleteTask from './components/deleteTask';
import Navigate from './components/navigation';
import UpdateTask from './components/updateTask';
import ViewAllTask from './components/viewAllTask';
import ViewTask from './components/viewTask';
import Wallet from './components/wallet';


function App() {

    const [state, setState] = useState({web3:null, contract:null, account:null});
    const saveState = ({web3, contract, account}) =>{
      setState({web3: web3, contract:contract, account:account});
    } 

   const router = createBrowserRouter([
      {path:'/',element: <Wallet saveState={saveState}/>},
      {path:'/create-task', element: <CreateTask state={state}/>},
      {path:'/delete-task', element: <DeleteTask state={state}/>},
      {path:'/update-task', element: <UpdateTask state={state}/>},
      {path:'/view-all-task', element: <ViewAllTask/>},
      {path:'/view-task', element:<ViewTask/>}
    ])

  return (
    <>
     <RouterProvider router={router}/>
    
    </>
  )
}

export default App
