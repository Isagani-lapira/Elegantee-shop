import { Login } from '@mui/icons-material';
import './App.css'
import LoginPage from './elegantee/pages/LoginPage'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import SamplePage from './elegantee/pages/rar';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage/>
    },
    {
      path:'/rar',
      element: <SamplePage/>
    }
  ])
    return (
      <div className="App h-full">
        <RouterProvider router={router}/>
      </div>
    )
}

export default App
