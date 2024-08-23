import { Login } from '@mui/icons-material';
import './App.css'
import LoginPage from './elegantee/pages/LoginPage'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import SamplePage from './elegantee/pages/rar';
import AuthProvider from './elegantee/auth/AuthProvider';
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
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
        
      </div>
    )
}

export default App
