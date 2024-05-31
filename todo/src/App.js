import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import CreateTeam from './component/CreateTeam';
import TeamList from './component/ShowTeam';
import TeamMembers from './component/ShowMember';
import CreateTask from './component/CreateTask';
import TaskList from "./component/Showtask";
import Task from './component/Task';
import Root from './component/Root';
import EmployeeTasks from './component/EmpolyeeTasks';
import EmployeeTask from './component/EmployeeTask';
import Dashboard from './component/Dashboard';
import Profile from './component/Profile';

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Root/>,
      children:[
        {
            path:"/",
            element:<Register/>
        },
        {
            path:"/Login",
            element:<Login/>
        },
        {
            path:'/team',
            element:<CreateTeam/>
        },
        {
            path:'/show-team',
            element:<TeamList/>
        },
        {
            path:"/show-team/:id",
            element:<TeamMembers/>
        },
        {
            path:"/createtask",
            element:<CreateTask/>
        },
        {
            path:"/Showtask",
            element:<TaskList/>
        },
        {
            path:"/Showtask/:id",
            element:<Task/>
        },
        {
          path:"/Task",
          element:<EmployeeTasks/>
        },
        {
          path:"/Task/:id",
          element:<EmployeeTask/>
        },
        {
          path:"/Dashboard",
          element:<Dashboard/>
        },
        {
          path:"/profile",
          element:<Profile/>
        }
      ]
    },
    
  ])
  return(
   <RouterProvider router={router}></RouterProvider>
   
  )
}

export default App;


